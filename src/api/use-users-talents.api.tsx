import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { UsersTalentsModel } from "../models/users-talents.model";

export const useGetUsersTalents = () => {
  return useQuery({
    queryKey: ["useGetUsersTalents"],
    queryFn: async () => {
      const { data } = await supabase.from("users_talents").select("*");
      return data as UsersTalentsModel[];
    }
  });
};
