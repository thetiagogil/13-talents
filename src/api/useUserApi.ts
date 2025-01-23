import { supabase } from "../lib/supabase";
import { UserModel } from "../models/user.model";
import { showToast } from "../utils/toast";

export const getUserByEmail = async (email: string) => {
  try {
    const { data, error } = await supabase.from("users").select().eq("email", email).single();
    if (error) {
      if (error.details === "The result contains 0 rows") {
        showToast("error", "Invalid credential.");
      } else {
        showToast("error", "Failed to get user.");
      }
    }
    return data as UserModel;
  } catch (error) {
    console.error("Failed to get user:", error);
  }
};

export const getUserById = async (userId: string | null) => {
  try {
    const { data, error } = await supabase.from("users").select().eq("id", userId).single();
    if (error) {
      showToast("error", "Failed to get user.");
    }
    return data as UserModel;
  } catch (error) {
    console.error("Failed to get user:", error);
  }
};

export const createUserAvatar = async (userId: string | null) => {
  try {
    const { error } = await supabase.from("users").update({ hasAvatar: true }).eq("id", userId).single();
    if (error) {
      showToast("error", "Failed to create avatar.");
    }
  } catch (error) {
    console.error("Failed to create avatar:", error);
  }
};
