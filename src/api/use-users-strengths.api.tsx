import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { UsersStrengthsModel } from "../models/users-strengths.model";

export const useGetUsersStrengths = () => {
  return useQuery({
    queryKey: ["useGetUsersStrengths"],
    queryFn: async () => {
      const { data } = await supabase.from("users_strengths").select("*");
      return data as UsersStrengthsModel[];
    }
  });
};
