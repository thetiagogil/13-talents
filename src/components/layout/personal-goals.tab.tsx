import { Divider, Stack, Typography } from "@mui/joy";
import { useContext } from "react";
import { useGetGoalsByUserId } from "../../api/use-goals.api";
import { AuthContext } from "../../contexts/auth.context";
import { GOALS_PROGRESS } from "../../lib/constants";
import { GoalModel, GoalProgress } from "../../models/goal.model";
import { KanbanSection } from "../shared/kanban-section";
import { UserInfo } from "../shared/user-info";

export const PersonalGoalsTab = () => {
  const { user } = useContext(AuthContext);
  const { data: userGoals = [], isLoading } = useGetGoalsByUserId(user.id);

  const userGoalsBasedOnProgress = (progress: GoalProgress): GoalModel[] => {
    return userGoals?.filter((goal: GoalModel) => goal?.progress === progress);
  };

  return (
    <Stack alignItems={{ xs: "center", lg: "start" }} gap={4}>
      <UserInfo />

      <Stack width="100%" gap={4}>
        <Stack gap={1.5}>
          <Typography level="body-md" textColor="neutral.baseDarker">
            Connect your <strong>actionable goals</strong> with the <strong>strengths</strong> you want to reinforce,
            and track your progress as you grow.
          </Typography>
          <Typography level="body-md" textColor="neutral.baseDarker">
            This is your space to focus on what you're great at and make it even greater.
          </Typography>
        </Stack>

        <Divider />

        <Stack direction="row" gap={2.5}>
          {GOALS_PROGRESS.map((progress, index) => (
            <KanbanSection
              key={index}
              progress={progress as GoalProgress}
              goals={userGoalsBasedOnProgress(progress as GoalProgress)}
              isLoading={isLoading}
            />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
