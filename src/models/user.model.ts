import { USER_ROLES } from "../lib/constants";
import { ManualModel } from "./manual.model";
import { StrengthModel } from "./strength.model";

export type UserRole = (typeof USER_ROLES)[number];

export type UserModel = {
  id: string;
  name: string;
  email: string;
  role: UserRole | null;
  avatar: string | null;
  strengths: StrengthModel["id"][];
  manual: ManualModel;
};
