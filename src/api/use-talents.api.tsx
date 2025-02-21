import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { TalentModel } from "../models/talent.model";

export const useGetTalents = () => {
  return useQuery({
    queryKey: ["useGetTalents"],
    queryFn: async () => {
      const { data } = await supabase.from("talents").select("*");
      return data as TalentModel[];
    }
  });
};
