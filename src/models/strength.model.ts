export type StrengthCategories = "Executing" | "Influencing" | "Relationship Building" | "Strategic Thinking";

export type StrengthModel = {
  id: number;
  label: string;
  details: string;
  category: StrengthCategories;
};
