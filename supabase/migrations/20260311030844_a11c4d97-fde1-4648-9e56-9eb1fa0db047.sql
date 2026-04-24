
CREATE TABLE public.retro_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  retro_id uuid NOT NULL REFERENCES public.retros(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (retro_id, user_id)
);

ALTER TABLE public.retro_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can select retro_participants"
  ON public.retro_participants
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own participation"
  ON public.retro_participants
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());
