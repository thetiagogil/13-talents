import { USER_ROLES } from "../lib/constants";
import { TalentModel } from "./talent.model";

export type UserModel = {
  id: string;
  name: string;
  email: string;
  role: (typeof USER_ROLES)[number] | null;
  avatar: string | null;
  manual: {
    about?: string;
    needs?: string;
    feedback?: string;
    happiness?: string;
    passions?: string;
  };
  talents: TalentModel["id"][];
};
