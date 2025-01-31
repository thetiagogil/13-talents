import { StrengthModel } from "./strength.model";
import { UserModel } from "./user.model";

export type UsersStrengthsModel = {
  user_id: UserModel["id"];
  strength_id: StrengthModel["id"];
};
