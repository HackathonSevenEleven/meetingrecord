
-- responses table (US-03-006)
-- Using a validation trigger instead of CHECK constraint for sentiment
CREATE TABLE public.responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  retro_id uuid NOT NULL REFERENCES public.retros(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES public.retro_questions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  text text NOT NULL,
  sentiment integer,
  is_action_item boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Validation trigger for sentiment range
CREATE OR REPLACE FUNCTION public.validate_sentiment()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.sentiment IS NOT NULL AND (NEW.sentiment < 1 OR NEW.sentiment > 5) THEN
    RAISE EXCEPTION 'sentiment must be between 1 and 5';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_response_sentiment
  BEFORE INSERT OR UPDATE ON public.responses
  FOR EACH ROW EXECUTE FUNCTION public.validate_sentiment();

CREATE INDEX idx_responses_retro_id ON public.responses(retro_id);
CREATE INDEX idx_responses_question_id ON public.responses(question_id);
CREATE INDEX idx_responses_user_id ON public.responses(user_id);

ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can select responses"
  ON public.responses FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can insert responses"
  ON public.responses FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own responses"
  ON public.responses FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own responses"
  ON public.responses FOR DELETE TO authenticated
  USING (user_id = auth.uid());
