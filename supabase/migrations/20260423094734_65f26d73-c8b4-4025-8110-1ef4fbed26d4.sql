-- Add free tier usage tracking to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS free_trial_count integer NOT NULL DEFAULT 0;

-- Server-side enforcement: block inserts beyond 3 meetings or >30s
CREATE OR REPLACE FUNCTION public.enforce_free_tier_meetings()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count integer;
BEGIN
  -- Enforce duration cap (allow small overshoot tolerance)
  IF NEW.duration_seconds > 32 THEN
    RAISE EXCEPTION 'Free tier: recordings are limited to 30 seconds.'
      USING ERRCODE = 'check_violation';
  END IF;

  -- Enforce per-user lifetime quota of 3
  SELECT COALESCE(free_trial_count, 0) INTO current_count
  FROM public.profiles
  WHERE id = NEW.user_id;

  IF current_count >= 3 THEN
    RAISE EXCEPTION 'Free tier: you have used all 3 free recordings.'
      USING ERRCODE = 'check_violation';
  END IF;

  -- Increment usage atomically
  UPDATE public.profiles
  SET free_trial_count = COALESCE(free_trial_count, 0) + 1
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_free_tier_meetings_trigger ON public.meetings;
CREATE TRIGGER enforce_free_tier_meetings_trigger
BEFORE INSERT ON public.meetings
FOR EACH ROW
EXECUTE FUNCTION public.enforce_free_tier_meetings();