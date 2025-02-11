import { GOAL_PROGRESS } from "../lib/constants";
import { StrengthModel } from "./strength.model";
import { UserModel } from "./user.model";

export type GoalProgress = (typeof GOAL_PROGRESS)[number];

export type GoalModel = {
  id?: number;
  user_id: UserModel["id"];
  strength_id: StrengthModel["id"];
  details: string;
  progress: GoalProgress;
  approved?: boolean;
  created_at?: Date;
  updated_at?: Date;
};
