import { STRENGTH_CATEGORIES } from "../lib/constants";

export type StrengthCategories = (typeof STRENGTH_CATEGORIES)[number];

export type StrengthModel = {
  id: number;
  label: string;
  details: string;
  category: StrengthCategories;
};
