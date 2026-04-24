
-- Tighten INSERT policies to ensure created_by matches the current user
DROP POLICY "Authenticated can insert projects" ON public.projects;
CREATE POLICY "Authenticated can insert projects"
  ON public.projects FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

DROP POLICY "Authenticated can insert teams" ON public.teams;
CREATE POLICY "Authenticated can insert teams"
  ON public.teams FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());
