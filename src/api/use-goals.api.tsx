import { useQuery } from "@tanstack/react-query";
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
