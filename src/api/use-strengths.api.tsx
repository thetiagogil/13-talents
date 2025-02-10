import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { StrengthModel } from "../models/strength.model";

export const useGetStrengths = () => {
  return useQuery({
    queryKey: ["useGetStrengths"],
    queryFn: async () => {
      const { data } = await supabase.from("strengths").select("*");
      return data as StrengthModel[];
    }
  });
};
