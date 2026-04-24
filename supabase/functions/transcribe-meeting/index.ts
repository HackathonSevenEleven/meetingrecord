import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ScribeWord {
  text: string;
  start: number;
  end: number;
  speaker_id?: string;
  type?: string;
}

interface Segment {
  start: number;
  end: number;
  text: string;
  speaker?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // --- Auth: require a valid user JWT ---
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return json({ error: "Missing Authorization header" }, 401);
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

    if (!ELEVENLABS_API_KEY) {
      return json(
        {
          error:
            "ELEVENLABS_API_KEY is not configured. Add it in your Lovable Cloud secrets.",
        },
        500,
      );
    }

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userErr,
    } = await userClient.auth.getUser();
    if (userErr || !user) {
      return json({ error: "Invalid auth token" }, 401);
    }

    // --- Parse body ---
    const { meeting_id } = await req.json().catch(() => ({}));
    if (!meeting_id || typeof meeting_id !== "string") {
      return json({ error: "meeting_id is required" }, 400);
    }

    // --- Service-role client for state updates / storage download ---
    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch meeting and verify ownership.
    // Retry briefly to absorb read-after-write replication lag — the client
    // invokes this function immediately after inserting the meeting row.
    let meeting: any = null;
    let mErr: any = null;
    for (let attempt = 0; attempt < 5; attempt++) {
      const res = await admin
        .from("meetings")
        .select("*")
        .eq("id", meeting_id)
        .maybeSingle();
      mErr = res.error;
      meeting = res.data;
      if (meeting || mErr) break;
      await new Promise((r) => setTimeout(r, 300));
    }

    if (mErr) {
      console.error("meetings lookup error", mErr);
      return json({ error: "Meeting lookup failed" }, 500);
    }
    if (!meeting) {
      console.error("meeting not found after retries", { meeting_id });
      return json({ error: "Meeting not found" }, 404);
    }
    if (meeting.user_id !== user.id) {
      return json({ error: "Forbidden" }, 403);
    }
    if (!meeting.audio_path) {
      return json({ error: "Meeting has no audio file" }, 400);
    }

    // Mark as transcribing
    await admin
      .from("meetings")
      .update({ status: "transcribing", error_message: null })
      .eq("id", meeting_id);

    // --- Download audio from storage ---
    const { data: audioBlob, error: dlErr } = await admin.storage
      .from("meeting-recordings")
      .download(meeting.audio_path);

    if (dlErr || !audioBlob) {
      console.error("Audio download failed", dlErr);
      await admin
        .from("meetings")
        .update({
          status: "failed",
          error_message: "We couldn't read your audio file.",
        })
        .eq("id", meeting_id);
      return json({ error: "Could not download audio" }, 500);
    }

    // --- Send to ElevenLabs Scribe v2 ---
    const ext =
      meeting.audio_path.split(".").pop()?.toLowerCase() || "webm";
    const filename = `audio.${ext}`;
    const fd = new FormData();
    fd.append("file", audioBlob, filename);
    fd.append("model_id", "scribe_v2");
    fd.append("tag_audio_events", "true");
    fd.append("diarize", "true");

    const sttRes = await fetch(
      "https://api.elevenlabs.io/v1/speech-to-text",
      {
        method: "POST",
        headers: { "xi-api-key": ELEVENLABS_API_KEY },
        body: fd,
      },
    );

    if (!sttRes.ok) {
      const errText = await sttRes.text();
      console.error("ElevenLabs Scribe error:", sttRes.status, errText);
      await admin
        .from("meetings")
        .update({
          status: "failed",
          error_message: "Transcription failed. Please try again later.",
        })
        .eq("id", meeting_id);
      return json({ error: "Transcription failed" }, 500);
    }

    const sttData = await sttRes.json();
    const transcript: string = sttData.text ?? "";
    const language: string | null = sttData.language_code ?? null;

    // Group words into segments by speaker / sentence-ish boundaries
    const words: ScribeWord[] = (sttData.words ?? []).filter(
      (w: ScribeWord) => w.type !== "audio_event",
    );
    const segments: Segment[] = [];
    let current: Segment | null = null;
    for (const w of words) {
      const speaker = w.speaker_id ?? "speaker_0";
      if (
        !current ||
        current.speaker !== speaker ||
        w.start - current.end > 1.5
      ) {
        if (current) segments.push(current);
        current = { start: w.start, end: w.end, text: w.text, speaker };
      } else {
        current.end = w.end;
        current.text += w.text;
      }
    }
    if (current) segments.push(current);

    // --- Persist notes row (transcript first, AI summary second) ---
    const { error: upsertErr } = await admin
      .from("meeting_notes")
      .upsert(
        {
          meeting_id,
          user_id: user.id,
          transcript,
          segments,
          language,
        },
        { onConflict: "meeting_id" },
      );

    if (upsertErr) {
      console.error("Transcript upsert failed", upsertErr);
      await admin
        .from("meetings")
        .update({
          status: "failed",
          error_message: "We couldn't save the transcript.",
        })
        .eq("id", meeting_id);
      return json({ error: "Could not save transcript" }, 500);
    }

    // Move to next stage
    await admin
      .from("meetings")
      .update({ status: "generating_notes" })
      .eq("id", meeting_id);

    // --- Kick off note generation (don't block the response on it) ---
    const notesUrl = `${SUPABASE_URL}/functions/v1/generate-notes`;
    fetch(notesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({ meeting_id }),
    }).catch((e) => console.error("generate-notes invoke failed", e));

    return json({ success: true, meeting_id, language });
  } catch (e) {
    console.error("transcribe-meeting unexpected error", e);
    return json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      500,
    );
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
