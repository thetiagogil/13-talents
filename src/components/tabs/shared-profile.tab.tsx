import { Stack } from "@mui/joy";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import { UserModel } from "../../models/user.model";
import { userTopTalents } from "../../utils/get-user-top-talents";
import { TabContainer } from "../shared/tabs-container";
import { TalentsCard } from "../shared/talents-card";
import { UserAvatar } from "../shared/user-avatar";
import { UserProfileInfo } from "../shared/user-info";

type SharedProfileTabProps = {
  user?: UserModel;
  isTeamView?: boolean;
};

export const SharedProfileTab = ({ user, isTeamView }: SharedProfileTabProps) => {
  const { user: currentUser, talents } = useContext(AuthContext);
  const displayUser = user || currentUser;
  const { userTopTalentsArray, userTopTalentsPercentages } = userTopTalents(displayUser?.talents, talents);

  return (
    <TabContainer>
      {!isTeamView && <UserProfileInfo user={currentUser} />}

      <Stack width="100%" direction={{ xs: "column", lg: "row" }} alignItems={{ xs: "center", lg: "start" }} gap={10}>
        <Stack width={{ xs: "100%", md: 600 }} alignItems="center">
          <UserAvatar avatar={displayUser.avatar} />
        </Stack>

        <Stack>
          <TalentsCard
            userTopTalentsArray={userTopTalentsArray}
            userTopTalentsPercentages={userTopTalentsPercentages}
          />
        </Stack>
      </Stack>
    </TabContainer>
  );
};
