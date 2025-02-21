import { TALENT_CATEGORIES } from "../lib/constants";

export type TalentModel = {
  id: number;
  label: string;
  description: string;
  category: (typeof TALENT_CATEGORIES)[number];
  details: {
    bring: string;
    need: string;
    motivate: string;
  };
};
