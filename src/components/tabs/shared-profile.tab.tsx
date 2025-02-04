import { Stack } from "@mui/joy";
import { useContext } from "react";
import { MockAvatar } from "../../api/mock-avatar";
import { useGetStrengths } from "../../api/use-strengths.api";
import { useGetUserById } from "../../api/use-user.api";
import { AuthContext } from "../../contexts/auth.context";
import { UserModel } from "../../models/user.model";
import { userTopStrengths } from "../../utils/get-user-top-strengths";
import { StrengthsCard } from "../shared/strengths-card";
import { TabContainer } from "../shared/tabs-container";
import { UserProfileInfo } from "../shared/user-info";

type SharedProfileTabProps = {
  user?: UserModel;
  isTeamView?: boolean;
};

export const SharedProfileTab = ({ user, isTeamView }: SharedProfileTabProps) => {
  const { userId } = useContext(AuthContext);
  const { data: currentUser } = useGetUserById(userId);
  const { data: strengths } = useGetStrengths();
  const displayUser = user || currentUser;
  const { userTopStrengthsArray, userTopStrengthsPercentages } = userTopStrengths(
    displayUser.strengths,
    strengths || []
  );

  return (
    <TabContainer>
      {!isTeamView && <UserProfileInfo user={currentUser} />}

      <Stack width="100%" direction={{ xs: "column", lg: "row" }} alignItems={{ xs: "center", lg: "start" }} gap={10}>
        <Stack width={{ xs: "100%", md: 600 }} alignItems="center">
          <MockAvatar sx={{ fontSize: 280 }} />
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
