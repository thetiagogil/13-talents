import { ManualModel } from "./manual.model";
import { StrengthModel } from "./strength.model";

export type UserModel = {
  id: string;
  name: string;
  email: string;
  title: string;
  hasAvatar: boolean;
  strengths: StrengthModel["id"][];
  manual: ManualModel;
};
