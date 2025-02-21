import { Divider, Stack, Typography } from "@mui/joy";
import { useContext } from "react";
import { useGetGoalsByUserId } from "../../api/use-goals.api";
import { AuthContext } from "../../contexts/auth.context";
import { GOAL_PROGRESS } from "../../lib/constants";
import { GoalModel } from "../../models/goal.model";
import { KanbanSection } from "../sections/kanban-section";
import { TabContainer } from "../shared/tabs-container";
import { UserProfileInfo } from "../shared/user-info";

export const PersonalGoalsTab = () => {
  const { user, talents } = useContext(AuthContext);
  const { data: userGoals = [], isLoading } = useGetGoalsByUserId(user.id);

  const userGoalsBasedOnProgress = (progress: GoalModel["progress"]): GoalModel[] => {
    return userGoals?.filter((goal: GoalModel) => goal?.progress === progress);
  };

  return (
    <TabContainer>
      <UserProfileInfo user={user} />

      <Stack width="100%" gap={4}>
        <Stack gap={1.5}>
          <Typography level="body-md" textColor="neutral.baseDarker">
            Connect your <strong>actionable goals</strong> with the <strong>talents</strong> you want to reinforce, and
            track your progress as you grow.
          </Typography>
          <Typography level="body-md" textColor="neutral.baseDarker">
            This is your space to focus on what you're great at and make it even greater.
          </Typography>
        </Stack>

        <Divider />

        <Stack
          direction={{ xs: "column", lg: "row" }}
          justifyContent={{ xs: "center", lg: "start" }}
          alignItems={{ xs: "center", lg: "flex-start" }}
          gap={{ xs: 6, lg: 3 }}
        >
          {GOAL_PROGRESS.map((progress, index) => (
            <KanbanSection
              key={index}
              userId={user.id}
              talents={talents}
              progress={progress as GoalModel["progress"]}
              goals={userGoalsBasedOnProgress(progress as GoalModel["progress"])}
              isLoading={isLoading}
            />
          ))}
        </Stack>
      </Stack>
    </TabContainer>
  );
};
