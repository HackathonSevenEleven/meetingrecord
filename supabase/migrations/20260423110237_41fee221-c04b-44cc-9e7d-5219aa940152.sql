-- Attach the free-tier enforcement function as a BEFORE INSERT trigger.
-- Without this, the limit is only enforced client-side and can be bypassed via direct API calls.
DROP TRIGGER IF EXISTS enforce_free_tier_meetings_trigger ON public.meetings;

CREATE TRIGGER enforce_free_tier_meetings_trigger
BEFORE INSERT ON public.meetings
FOR EACH ROW
EXECUTE FUNCTION public.enforce_free_tier_meetings();