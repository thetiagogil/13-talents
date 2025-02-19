import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { SnackbarContext } from "../contexts/snackbar.context";
import { supabase } from "../lib/supabase";
import { UserModel } from "../models/user.model";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["useGetUsers"],
    queryFn: async () => {
      const { data } = await supabase.from("users").select("*");
      return data as UserModel[];
    }
  });
};

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

export const useUpdateUserProfileAfterFirstLogin = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  const queryClient = useQueryClient();
  type MutationProps = {
    userId: UserModel["id"];
    avatar: UserModel["avatar"];
    role: UserModel["role"];
  };
  return useMutation({
    mutationFn: async ({ userId, avatar, role }: MutationProps) => {
      await supabase.from("users").update({ avatar, role }).eq("id", userId).single();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetUserById"] });
    },
    onError: () => {
      showSnackbar("danger", "Failed creating profile.");
    }
  });
};

export const useUpdateUserManual = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  const queryClient = useQueryClient();
  type MutationProps = {
    userId: UserModel["id"];
    manual: UserModel["manual"];
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
