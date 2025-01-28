import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { ManualModel } from "../models/manual.model";
import { UserModel } from "../models/user.model";

export const useGetUserByEmail = (email?: string) => {
  return useQuery({
    queryKey: ["getUserByEmail", email],
    queryFn: async () => {
      const { data } = await supabase.from("users").select().eq("email", email).single();
      return data as UserModel;
    },
    enabled: false
  });
};

export const useGetUserById = (userId?: string) => {
  return useQuery({
    queryKey: ["getUserById", userId],
    queryFn: async () => {
      const { data } = await supabase.from("users").select().eq("id", userId).single();
      return data;
    },
    enabled: !!userId
  });
};

export const useUpdateUserAvatarState = () => {
  return useMutation({
    mutationFn: async (userId: string) => {
      await supabase.from("users").update({ hasAvatar: true }).eq("id", userId).single();
    }
  });
};

export const useUpdateUserManual = () => {
  type MutationProps = {
    userId?: string;
    manual?: ManualModel;
  };
  return useMutation({
    mutationFn: async ({ userId, manual }: MutationProps) => {
      const { data } = await supabase.from("users").update({ manual }).eq("id", userId).select().single();
      return data;
    }
  });
};
