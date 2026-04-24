
-- Create response_groups table
CREATE TABLE public.response_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  retro_id uuid NOT NULL REFERENCES public.retros(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES public.retro_questions(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.response_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can select response_groups" ON public.response_groups FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert response_groups" ON public.response_groups FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update response_groups" ON public.response_groups FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete response_groups" ON public.response_groups FOR DELETE TO authenticated USING (true);

-- Add group_id column to responses
ALTER TABLE public.responses ADD COLUMN group_id uuid REFERENCES public.response_groups(id) ON DELETE SET NULL;

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.response_groups;
