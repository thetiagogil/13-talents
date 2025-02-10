import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { SnackbarContext } from "../contexts/snackbar.context";
import { supabase } from "../lib/supabase";
import { ManualModel } from "../models/manual.model";
import { UserModel } from "../models/user.model";

export const useGetUserByEmail = (email?: string) => {
  return useQuery({
    queryKey: ["useGetUserByEmail", email],
    queryFn: async () => {
      const { data } = await supabase.from("users").select().eq("email", email).single();
      return data as UserModel;
    },
    enabled: false
  });
};

export const useGetUserById = (userId?: string) => {
  return useQuery({
    queryKey: ["useGetUserById", userId],
    queryFn: async () => {
      const { data } = await supabase.from("users").select().eq("id", userId).single();
      return data;
    },
    enabled: !!userId
  });
};

export const useUpdateUserAvatarState = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      await supabase.from("users").update({ hasAvatar: true }).eq("id", userId).single();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetUserById"] });
    },
    onError: () => {
      showSnackbar("danger", "Failed creating avatar.");
    }
  });
};

export const useUpdateUserManual = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  const queryClient = useQueryClient();
  type MutationProps = {
    userId?: string;
    manual?: ManualModel;
  };
  return useMutation({
    mutationFn: async ({ userId, manual }: MutationProps) => {
      const { data } = await supabase.from("users").update({ manual }).eq("id", userId).select().single();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetUserById"] });
      showSnackbar("success", "Field was updated with success.");
    },
    onError: () => {
      showSnackbar("danger", "Field was not updated.");
    }
  });
};
