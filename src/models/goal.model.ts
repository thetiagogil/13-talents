import { StrengthModel } from "./strength.model";
import { UserModel } from "./user.model";

export type GoalProgress = "To do" | "Doing" | "Done";

export type GoalModel = {
  id: string;
  user_id: UserModel["id"];
  strength_id: StrengthModel["id"];
  title: string;
  details: string;
  progress: GoalProgress;
  approved: boolean;
};
