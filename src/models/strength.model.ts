import { STRENGTH_CATEGORIES } from "../lib/constants";

export type StrengthModel = {
  id: number;
  label: string;
  description: string;
  category: (typeof STRENGTH_CATEGORIES)[number];
  details: {
    bring: string;
    need: string;
    motivate: string;
  };
};
