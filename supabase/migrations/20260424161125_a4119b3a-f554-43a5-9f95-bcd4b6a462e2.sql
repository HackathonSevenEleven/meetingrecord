-- Replace the broad UPDATE policy with one that blocks changes to free_trial_count
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (
  id = auth.uid()
  AND free_trial_count = (SELECT free_trial_count FROM public.profiles WHERE id = auth.uid())
);