
-- retro_questions table
CREATE TABLE public.retro_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  retro_id uuid NOT NULL REFERENCES public.retros(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  sort_order integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_retro_questions_retro_id ON public.retro_questions(retro_id);

ALTER TABLE public.retro_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can select retro_questions"
  ON public.retro_questions FOR SELECT TO authenticated USING (true);

CREATE POLICY "Retro creator can insert questions"
  ON public.retro_questions FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.retros WHERE id = retro_id AND created_by = auth.uid()));

CREATE POLICY "Retro creator can update questions"
  ON public.retro_questions FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.retros WHERE id = retro_id AND created_by = auth.uid()));

CREATE POLICY "Retro creator can delete questions"
  ON public.retro_questions FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.retros WHERE id = retro_id AND created_by = auth.uid()));

-- top3_entries table
CREATE TABLE public.top3_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  retro_id uuid NOT NULL REFERENCES public.retros(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('do_again', 'do_differently')),
  rank integer NOT NULL CHECK (rank >= 1 AND rank <= 3),
  text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(retro_id, user_id, type, rank)
);

CREATE INDEX idx_top3_entries_retro_id ON public.top3_entries(retro_id);

ALTER TABLE public.top3_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can select top3_entries"
  ON public.top3_entries FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can insert top3_entries"
  ON public.top3_entries FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own top3_entries"
  ON public.top3_entries FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own top3_entries"
  ON public.top3_entries FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- timeline_entries table
CREATE TABLE public.timeline_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  retro_id uuid NOT NULL REFERENCES public.retros(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_date date NOT NULL,
  description text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_timeline_entries_retro_id ON public.timeline_entries(retro_id);
CREATE INDEX idx_timeline_entries_entry_date ON public.timeline_entries(entry_date);

ALTER TABLE public.timeline_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can select timeline_entries"
  ON public.timeline_entries FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can insert timeline_entries"
  ON public.timeline_entries FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own timeline_entries"
  ON public.timeline_entries FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own timeline_entries"
  ON public.timeline_entries FOR DELETE TO authenticated
  USING (user_id = auth.uid());
