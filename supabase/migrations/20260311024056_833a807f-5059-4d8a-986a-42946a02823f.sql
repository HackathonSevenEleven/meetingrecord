
-- Fix search_path on validate_sentiment
CREATE OR REPLACE FUNCTION public.validate_sentiment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.sentiment IS NOT NULL AND (NEW.sentiment < 1 OR NEW.sentiment > 5) THEN
    RAISE EXCEPTION 'sentiment must be between 1 and 5';
  END IF;
  RETURN NEW;
END;
$$;

-- response_upvotes table (US-03-007)
CREATE TABLE public.response_upvotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id uuid NOT NULL REFERENCES public.responses(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(response_id, user_id)
);

CREATE INDEX idx_response_upvotes_response_id ON public.response_upvotes(response_id);

ALTER TABLE public.response_upvotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can select upvotes"
  ON public.response_upvotes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can insert upvotes"
  ON public.response_upvotes FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own upvotes"
  ON public.response_upvotes FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- action_items table (US-03-010)
CREATE TABLE public.action_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  retro_id uuid NOT NULL REFERENCES public.retros(id) ON DELETE CASCADE,
  response_id uuid REFERENCES public.responses(id) ON DELETE SET NULL,
  description text NOT NULL,
  owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  due_date date,
  status public.action_item_status NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_action_items_retro_id ON public.action_items(retro_id);
CREATE INDEX idx_action_items_owner_id ON public.action_items(owner_id);
CREATE INDEX idx_action_items_status ON public.action_items(status);

ALTER TABLE public.action_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can select action_items"
  ON public.action_items FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can insert action_items"
  ON public.action_items FOR INSERT TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Authenticated can update action_items"
  ON public.action_items FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Creator can delete action_items"
  ON public.action_items FOR DELETE TO authenticated
  USING (created_by = auth.uid());

CREATE TRIGGER on_action_items_updated
  BEFORE UPDATE ON public.action_items
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
