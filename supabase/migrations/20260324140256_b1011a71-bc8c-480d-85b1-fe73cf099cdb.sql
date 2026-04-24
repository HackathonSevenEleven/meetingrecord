-- Drop overly permissive policies on response_groups
DROP POLICY IF EXISTS "Authenticated can insert response_groups" ON public.response_groups;
DROP POLICY IF EXISTS "Authenticated can update response_groups" ON public.response_groups;
DROP POLICY IF EXISTS "Authenticated can delete response_groups" ON public.response_groups;

-- Recreate with retro-creator scoping
CREATE POLICY "Retro creator can insert response_groups"
ON public.response_groups
FOR INSERT
TO authenticated
WITH CHECK (
  (SELECT created_by FROM public.retros WHERE retros.id = response_groups.retro_id) = auth.uid()
);

CREATE POLICY "Retro creator can update response_groups"
ON public.response_groups
FOR UPDATE
TO authenticated
USING (
  (SELECT created_by FROM public.retros WHERE retros.id = response_groups.retro_id) = auth.uid()
)
WITH CHECK (
  (SELECT created_by FROM public.retros WHERE retros.id = response_groups.retro_id) = auth.uid()
);

CREATE POLICY "Retro creator can delete response_groups"
ON public.response_groups
FOR DELETE
TO authenticated
USING (
  (SELECT created_by FROM public.retros WHERE retros.id = response_groups.retro_id) = auth.uid()
);