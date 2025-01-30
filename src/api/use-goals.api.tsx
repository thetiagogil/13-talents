import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { SnackbarContext } from "../contexts/snackbar.context";
import { supabase } from "../lib/supabase";
import { GoalModel } from "../models/goal.model";

export const useGetGoalsByUserId = (userId?: string) => {
  return useQuery({
    queryKey: ["useGetGoalsByUserId", userId],
    queryFn: async () => {
      const { data } = await supabase.from("goals").select("*").eq("user_id", userId);
      return data ?? ([] as GoalModel[]);
    },
    enabled: !!userId
  });
};

export const useCreateGoal = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (goal: GoalModel) => {
      return await supabase.from("goals").insert(goal).select().single();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetGoalsByUserId"] });
    },
    onError: () => {
      showSnackbar("danger", "Failed to create the goal.");
    }
  });
};

export const useUpdateGoal = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (goal: GoalModel) => {
      const { id, ...updates } = goal;
      return await supabase.from("goals").update(updates).eq("id", id).select().single();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetGoalsByUserId"] });
    },
    onError: () => {
      showSnackbar("danger", "Failed to update the goal.");
    }
  });
};

export const useDeleteGoal = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (goalId?: number) => {
      return await supabase.from("goals").delete().eq("id", goalId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetGoalsByUserId"] });
    },
    onError: () => {
      showSnackbar("danger", "Failed to delete the goal.");
    }
  });
};
