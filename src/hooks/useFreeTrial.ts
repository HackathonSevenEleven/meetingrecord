import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const FREE_TRIAL_LIMIT = 3;
export const FREE_TRIAL_MAX_DURATION = 60; // seconds

export const useFreeTrial = () => {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ["free-trial", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("free_trial_count")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data?.free_trial_count ?? 0;
    },
  });

  const used = query.data ?? 0;
  const remaining = Math.max(0, FREE_TRIAL_LIMIT - used);
  const limitReached = remaining === 0;

  return {
    ...query,
    used,
    remaining,
    limitReached,
    limit: FREE_TRIAL_LIMIT,
    maxDuration: FREE_TRIAL_MAX_DURATION,
  };
};
