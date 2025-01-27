import { supabase } from "../lib/supabase";
import { ManualModel } from "../models/manual.model";
import { UserModel } from "../models/user.model";
import { showToast } from "../utils/toast";

export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase.from("users").select().eq("email", email).single();
  if (error) {
    showToast("error", "Invalid credential.");
  }
  return data as UserModel;
};

export const getUserById = async (userId: string | undefined) => {
  const { data, error } = await supabase.from("users").select().eq("id", userId).single();
  if (error) {
    showToast("error", "Failed to get user.");
  }
  return data as UserModel;
};

export const updateUserAvatarState = async (userId: string | undefined) => {
  const { error: updateError } = await supabase.from("users").update({ hasAvatar: true }).eq("id", userId).single();
  if (updateError) {
    showToast("error", "Failed to create avatar.");
  }

  const { data, error: getError } = await supabase.from("users").select().eq("id", userId).single();
  if (getError) {
    showToast("error", "Failed to get user.");
  }
  return data as UserModel;
};

export const updateUserManual = async (userId: string | undefined, manual: ManualModel) => {
  const { data, error } = await supabase.from("users").update({ manual }).eq("id", userId).select().single();
  if (error) {
    showToast("error", "Failed to update manual.");
  }
  return data;
};
