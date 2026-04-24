-- 1. Restrict profiles SELECT to own row
DROP POLICY IF EXISTS "Authenticated users can read all profiles" ON public.profiles;

CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- 2. Owner-scoped UPDATE policy for meeting-recordings storage bucket
CREATE POLICY "Users can update own recordings"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'meeting-recordings'
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'meeting-recordings'
  AND (storage.foldername(name))[1] = auth.uid()::text
);