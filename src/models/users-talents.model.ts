import { TalentModel } from "./talent.model";
import { UserModel } from "./user.model";

export type UsersTalentsModel = {
  user_id: UserModel["id"];
  talent_id: TalentModel["id"];
  rank: number;
};
