import { Stack } from "@mui/joy";
import { useContext } from "react";
import { MockAvatar } from "../../api/mock-avatar";
import { AuthContext } from "../../contexts/auth.context";
import { userTopStrengths } from "../../utils/get-user-top-strengths";
import { StrengthsCard } from "../shared/strengths-card";
import { TabContainer } from "../shared/tabs-container";
import { UserInfo } from "../shared/user-info";

export const PersonalProfileTab = () => {
  const { user, strengths } = useContext(AuthContext);
  const { userTopStrengthsArray, userTopStrengthsPercentages } = userTopStrengths(user?.strengths, strengths);
  return (
    <TabContainer>
      <UserInfo user={user} fontSize={20} />

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
