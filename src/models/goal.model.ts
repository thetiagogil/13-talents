import { GOAL_PROGRESS } from "../lib/constants";
import { StrengthModel } from "./strength.model";
import { UserModel } from "./user.model";

export type GoalModel = {
  id?: number;
  user_id: UserModel["id"];
  strength_id: StrengthModel["id"];
  description: string;
  progress: (typeof GOAL_PROGRESS)[number];
  approved?: boolean;
  created_at?: Date;
  updated_at?: Date;
};
