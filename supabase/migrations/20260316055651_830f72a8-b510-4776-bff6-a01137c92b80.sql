ALTER TABLE public.retros
  ALTER COLUMN timeline_start TYPE timestamp without time zone USING timeline_start::timestamp,
  ALTER COLUMN timeline_end TYPE timestamp without time zone USING timeline_end::timestamp;