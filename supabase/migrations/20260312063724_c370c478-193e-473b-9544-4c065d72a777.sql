ALTER TABLE public.retros ADD COLUMN format text NOT NULL DEFAULT 'simple';

CREATE OR REPLACE FUNCTION public.validate_retro_format()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.format NOT IN ('simple', 'detailed') THEN
    RAISE EXCEPTION 'format must be simple or detailed';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_retro_format
BEFORE INSERT OR UPDATE ON public.retros
FOR EACH ROW EXECUTE FUNCTION public.validate_retro_format();