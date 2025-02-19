export const ENV_VARS = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_KEY: import.meta.env.VITE_SUPABASE_KEY
};

export const STRENGTH_CATEGORIES = ["Executing", "Influencing", "Relationship Building", "Strategic Thinking"] as const;
export const GOAL_PROGRESS = ["To do", "Doing", "Done"] as const;
export const USER_ROLES = ["Developer", "Designer", "Operations", "Product"] as const;
