import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert meeting assistant. You receive a raw meeting transcript and produce concise, structured notes.

Rules:
- Be faithful to what was actually said. Do not invent facts.
- Write in clear, neutral business English.
- Summary: 2-4 sentences capturing the meeting's purpose and outcome.
- Key points: 3-7 short bullets of the most important discussion points.
- Action items: concrete tasks. Include the owner if mentioned (e.g. "Alice: send draft proposal by Friday"). Empty array if none.
- Decisions: explicit decisions made during the meeting. Empty array if none.
- Each bullet item should be a single short sentence, no leading dashes or numbering.
- If the transcript is empty or too short to summarize, return empty arrays and a brief note in summary.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Missing Authorization header" }, 401);

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      return json({ error: "LOVABLE_API_KEY is not configured" }, 500);
    }

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const {
      data: { user },
      error: userErr,
    } = await userClient.auth.getUser();
    if (userErr || !user) return json({ error: "Invalid auth token" }, 401);

    const { meeting_id } = await req.json().catch(() => ({}));
    if (!meeting_id || typeof meeting_id !== "string") {
      return json({ error: "meeting_id is required" }, 400);
    }

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: meeting, error: mErr } = await admin
      .from("meetings")
      .select("*")
      .eq("id", meeting_id)
      .maybeSingle();
    if (mErr || !meeting) return json({ error: "Meeting not found" }, 404);
    if (meeting.user_id !== user.id) return json({ error: "Forbidden" }, 403);

    const { data: notesRow, error: nErr } = await admin
      .from("meeting_notes")
      .select("*")
      .eq("meeting_id", meeting_id)
      .maybeSingle();
    if (nErr || !notesRow) return json({ error: "Transcript not found" }, 404);

    const transcript = (notesRow.transcript ?? "").trim();
    if (!transcript) {
      await admin
        .from("meeting_notes")
        .update({
          summary: "The recording did not contain enough audio to summarize.",
          key_points: [],
          action_items: [],
          decisions: [],
        })
        .eq("meeting_id", meeting_id);
      await admin
        .from("meetings")
        .update({ status: "completed" })
        .eq("id", meeting_id);
      return json({ success: true, empty: true });
    }

    // --- Call Lovable AI Gateway with tool-calling for structured output ---
    const aiRes = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `Meeting title: ${meeting.title}\n\nTranscript:\n${transcript}`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "save_meeting_notes",
                description: "Save the structured meeting notes.",
                parameters: {
                  type: "object",
                  properties: {
                    summary: { type: "string" },
                    key_points: {
                      type: "array",
                      items: { type: "string" },
                    },
                    action_items: {
                      type: "array",
                      items: { type: "string" },
                    },
                    decisions: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                  required: [
                    "summary",
                    "key_points",
                    "action_items",
                    "decisions",
                  ],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "save_meeting_notes" },
          },
        }),
      },
    );

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("Lovable AI error:", aiRes.status, errText);
      let userMsg = `AI note generation failed (${aiRes.status})`;
      if (aiRes.status === 429) {
        userMsg = "AI rate limit reached. Please try again in a moment.";
      } else if (aiRes.status === 402) {
        userMsg = "AI credits exhausted. Add funds in your workspace settings.";
      }
      await admin
        .from("meetings")
        .update({ status: "failed", error_message: userMsg })
        .eq("id", meeting_id);
      return json({ error: userMsg }, aiRes.status);
    }

    const aiJson = await aiRes.json();
    const toolCall =
      aiJson.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;

    if (!toolCall) {
      await admin
        .from("meetings")
        .update({
          status: "failed",
          error_message: "AI did not return structured notes.",
        })
        .eq("id", meeting_id);
      return json({ error: "AI returned no structured output" }, 500);
    }

    let parsed: {
      summary: string;
      key_points: string[];
      action_items: string[];
      decisions: string[];
    };
    try {
      parsed = JSON.parse(toolCall);
    } catch {
      await admin
        .from("meetings")
        .update({
          status: "failed",
          error_message: "AI returned malformed JSON.",
        })
        .eq("id", meeting_id);
      return json({ error: "Malformed AI output" }, 500);
    }

    const { error: updErr } = await admin
      .from("meeting_notes")
      .update({
        summary: parsed.summary ?? "",
        key_points: parsed.key_points ?? [],
        action_items: parsed.action_items ?? [],
        decisions: parsed.decisions ?? [],
      })
      .eq("meeting_id", meeting_id);

    if (updErr) {
      await admin
        .from("meetings")
        .update({
          status: "failed",
          error_message: `Could not save notes: ${updErr.message}`,
        })
        .eq("id", meeting_id);
      return json({ error: "Could not save notes" }, 500);
    }

    await admin
      .from("meetings")
      .update({ status: "completed" })
      .eq("id", meeting_id);

    return json({ success: true });
  } catch (e) {
    console.error("generate-notes unexpected error", e);
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
