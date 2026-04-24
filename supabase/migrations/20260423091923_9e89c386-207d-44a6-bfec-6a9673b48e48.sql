-- Drop Retrofly tables (CASCADE handles dependent objects)
DROP TABLE IF EXISTS public.action_items CASCADE;
DROP TABLE IF EXISTS public.response_comments CASCADE;
DROP TABLE IF EXISTS public.response_upvotes CASCADE;
DROP TABLE IF EXISTS public.response_groups CASCADE;
DROP TABLE IF EXISTS public.responses CASCADE;
DROP TABLE IF EXISTS public.retro_questions CASCADE;
DROP TABLE IF EXISTS public.retro_participants CASCADE;
DROP TABLE IF EXISTS public.top3_entries CASCADE;
DROP TABLE IF EXISTS public.timeline_entries CASCADE;
DROP TABLE IF EXISTS public.retros CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.teams CASCADE;

-- Drop Retrofly enums and validation functions
DROP TYPE IF EXISTS public.action_item_status CASCADE;
DROP TYPE IF EXISTS public.retro_status CASCADE;
DROP FUNCTION IF EXISTS public.validate_retro_format() CASCADE;
DROP FUNCTION IF EXISTS public.validate_sentiment() CASCADE;

-- Meeting processing status enum
CREATE TYPE public.meeting_status AS ENUM (
  'pending',
  'transcribing',
  'generating_notes',
  'completed',
  'failed'
);

-- Meetings table
CREATE TABLE public.meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  duration_seconds integer NOT NULL DEFAULT 0,
  audio_path text,
  status public.meeting_status NOT NULL DEFAULT 'pending',
  error_message text,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_meetings_user_recorded ON public.meetings(user_id, recorded_at DESC);

ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own meetings"
  ON public.meetings FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own meetings"
  ON public.meetings FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own meetings"
  ON public.meetings FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own meetings"
  ON public.meetings FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE TRIGGER meetings_updated_at
  BEFORE UPDATE ON public.meetings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Meeting notes table (one-to-one with meetings)
CREATE TABLE public.meeting_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id uuid NOT NULL UNIQUE REFERENCES public.meetings(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  transcript text,
  segments jsonb,
  language text,
  summary text,
  key_points jsonb DEFAULT '[]'::jsonb,
  action_items jsonb DEFAULT '[]'::jsonb,
  decisions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_meeting_notes_meeting ON public.meeting_notes(meeting_id);

ALTER TABLE public.meeting_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own meeting notes"
  ON public.meeting_notes FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own meeting notes"
  ON public.meeting_notes FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own meeting notes"
  ON public.meeting_notes FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own meeting notes"
  ON public.meeting_notes FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE TRIGGER meeting_notes_updated_at
  BEFORE UPDATE ON public.meeting_notes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Private storage bucket for audio recordings
INSERT INTO storage.buckets (id, name, public)
VALUES ('meeting-recordings', 'meeting-recordings', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: users can only access files in their own folder (user_id is first path segment)
CREATE POLICY "Users can upload their own recordings"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'meeting-recordings'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can view their own recordings"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'meeting-recordings'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own recordings"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'meeting-recordings'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );