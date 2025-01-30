import { StrengthModel } from "./strength.model";
import { UserModel } from "./user.model";

export type GoalProgress = "To do" | "Doing" | "Done";

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
