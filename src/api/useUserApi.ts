import { supabase } from "../lib/supabase";
import { UserModel } from "../models/user.model";
import { showToast } from "../utils/toast";

export const getUserByEmail = async (email: string) => {
  const { data, error } = await supabase.from("users").select().eq("email", email).single();
  if (error) {
    showToast("error", "Invalid credential.");
  }
  return data as UserModel;
};

export const getUserById = async (userId: string | null) => {
  const { data, error } = await supabase.from("users").select().eq("id", userId).single();
  if (error) {
    showToast("error", "Failed to get user.");
  }
  return data as UserModel;
};

export const createUserAvatar = async (userId: string | null) => {
  const { error } = await supabase.from("users").update({ hasAvatar: true }).eq("id", userId).single();
  if (error) {
    showToast("error", "Failed to create avatar.");
  }
};
