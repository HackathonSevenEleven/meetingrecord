import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useUpdateProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (displayName: string) => {
      if (!user) throw new Error("Not authenticated");

      const trimmed = displayName.trim();
      if (!trimmed) throw new Error("Display name is required");
      if (trimmed.length > 50)
        throw new Error("Display name must be 50 characters or less");

      const { error } = await supabase
        .from("profiles")
        .update({ display_name: trimmed })
        .eq("id", user.id);

      if (error) throw error;
      return trimmed;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      toast.success("Profile updated");
    },
    onError: (err: Error) => {
      console.error("Update profile failed", err);
      // Surface validation messages we threw ourselves; hide raw backend errors.
      const safeMessages = new Set([
        "Not authenticated",
        "Display name is required",
        "Display name must be 50 characters or less",
      ]);
      const message = safeMessages.has(err.message)
        ? err.message
        : "Failed to update profile";
      toast.error(message);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
