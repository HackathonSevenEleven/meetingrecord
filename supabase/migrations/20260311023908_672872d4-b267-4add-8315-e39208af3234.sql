
CREATE TABLE public.retros (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status public.retro_status NOT NULL DEFAULT 'open',
  timeline_start date,
  timeline_end date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_retros_project_id ON public.retros(project_id);
CREATE INDEX idx_retros_team_id ON public.retros(team_id);
CREATE INDEX idx_retros_created_by ON public.retros(created_by);
CREATE INDEX idx_retros_status ON public.retros(status);

ALTER TABLE public.retros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can select retros"
  ON public.retros FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can insert retros"
  ON public.retros FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Creator can update retros"
  ON public.retros FOR UPDATE TO authenticated
  USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());

CREATE TRIGGER on_retros_updated
  BEFORE UPDATE ON public.retros
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
