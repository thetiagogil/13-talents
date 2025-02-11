import { Stack } from "@mui/joy";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { UserModel } from "../../models/user.model";
import { userTopStrengths } from "../../utils/get-user-top-strengths";
import { StrengthsCard } from "../shared/strengths-card";
import { TabContainer } from "../shared/tabs-container";
import { UserAvatar } from "../shared/user-avatar";
import { UserProfileInfo } from "../shared/user-info";

type SharedProfileTabProps = {
  user?: UserModel;
  isTeamView?: boolean;
};

export const SharedProfileTab = ({ user, isTeamView }: SharedProfileTabProps) => {
  const { user: currentUser, strengths } = useContext(AuthContext);
  const displayUser = user || currentUser;
  const { userTopStrengthsArray, userTopStrengthsPercentages } = userTopStrengths(displayUser?.strengths, strengths);

  return (
    <TabContainer>
      {!isTeamView && <UserProfileInfo user={currentUser} />}

      <Stack width="100%" direction={{ xs: "column", lg: "row" }} alignItems={{ xs: "center", lg: "start" }} gap={10}>
        <Stack width={{ xs: "100%", md: 600 }} alignItems="center">
          <UserAvatar avatar={displayUser.avatar} />
        </Stack>

        <Stack>
          <StrengthsCard
            userTopStrengthsArray={userTopStrengthsArray}
            userTopStrengthsPercentages={userTopStrengthsPercentages}
          />
        </Stack>
      </Stack>
    </TabContainer>
  );
};
