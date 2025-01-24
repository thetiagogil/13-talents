import { STRENGTH_CATEGORIES } from "../lib/constants";

export type StrengthModel = {
  id: number;
  label: string;
  details: string;
  category: (typeof STRENGTH_CATEGORIES)[number];
};
