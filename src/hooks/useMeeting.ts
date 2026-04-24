import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Meeting } from "./useMeetings";

export interface TranscriptSegment {
  start: number;
  end: number;
  text: string;
}

export interface MeetingNotes {
  id: string;
  meeting_id: string;
  user_id: string;
  transcript: string | null;
  segments: TranscriptSegment[] | null;
  language: string | null;
  summary: string | null;
  key_points: string[];
  action_items: string[];
  decisions: string[];
  created_at: string;
  updated_at: string;
}

export const useMeeting = (id: string | undefined) => {
  return useQuery({
    queryKey: ["meeting", id],
    enabled: !!id,
    refetchInterval: (query) => {
      const data = query.state.data as
        | { meeting: Meeting; notes: MeetingNotes | null }
        | undefined;
      if (!data?.meeting) return false;
      const s = data.meeting.status;
      return s === "pending" || s === "transcribing" || s === "generating_notes"
        ? 3000
        : false;
    },
    queryFn: async () => {
      const { data: meeting, error: mErr } = await supabase
        .from("meetings")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (mErr) throw mErr;
      if (!meeting) throw new Error("Meeting not found");

      const { data: notes, error: nErr } = await supabase
        .from("meeting_notes")
        .select("*")
        .eq("meeting_id", id!)
        .maybeSingle();
      if (nErr) throw nErr;

      let audioUrl: string | null = null;
      if (meeting.audio_path) {
        const { data: signed } = await supabase.storage
          .from("meeting-recordings")
          .createSignedUrl(meeting.audio_path, 3600);
        audioUrl = signed?.signedUrl ?? null;
      }

      return {
        meeting: meeting as Meeting,
        notes: (notes ?? null) as unknown as MeetingNotes | null,
        audioUrl,
      };
    },
  });
};
