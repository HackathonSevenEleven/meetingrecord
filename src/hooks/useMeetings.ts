import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type MeetingStatus =
  | "pending"
  | "transcribing"
  | "generating_notes"
  | "completed"
  | "failed";

export interface Meeting {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  duration_seconds: number;
  audio_path: string | null;
  status: MeetingStatus;
  error_message: string | null;
  recorded_at: string;
  created_at: string;
  updated_at: string;
}

export const useMeetings = (search?: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["meetings", user?.id, search],
    enabled: !!user,
    refetchInterval: (query) => {
      const data = query.state.data as Meeting[] | undefined;
      const hasProcessing = data?.some(
        (m) =>
          m.status === "pending" ||
          m.status === "transcribing" ||
          m.status === "generating_notes"
      );
      return hasProcessing ? 4000 : false;
    },
    queryFn: async () => {
      let query = supabase
        .from("meetings")
        .select("*")
        .order("recorded_at", { ascending: false });

      if (search && search.trim()) {
        query = query.ilike("title", `%${search.trim()}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as Meeting[];
    },
  });
};
