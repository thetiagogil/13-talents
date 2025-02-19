import { USER_ROLES } from "../lib/constants";
import { StrengthModel } from "./strength.model";

export type UserModel = {
  id: string;
  name: string;
  email: string;
  role: (typeof USER_ROLES)[number] | null;
  avatar: string | null;
  strengths: StrengthModel["id"][];
  manual: {
    about?: string;
    needs?: string;
    feedback?: string;
    happiness?: string;
    passions?: string;
  };
};
