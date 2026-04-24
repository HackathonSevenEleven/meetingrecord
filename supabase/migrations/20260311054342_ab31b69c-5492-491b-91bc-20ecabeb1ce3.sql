
CREATE TABLE public.response_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id uuid NOT NULL REFERENCES public.responses(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.response_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can select comments"
  ON public.response_comments FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can insert own comments"
  ON public.response_comments FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own comments"
  ON public.response_comments FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own comments"
  ON public.response_comments FOR DELETE TO authenticated
  USING (user_id = auth.uid());

CREATE INDEX idx_response_comments_response_id ON public.response_comments(response_id);
