import { Stack } from "@mui/joy";
import { MockAvatar } from "../../api/mock-avatar";
import { StrengthsCard } from "../shared/strengths-card";
import { TabContainer } from "../shared/tabs-container";
import { UserInfo } from "../shared/user-info";

export const PersonalProfileTab = () => {
  return (
    <TabContainer>
      <UserInfo />

      <Stack width="100%" direction={{ xs: "column", lg: "row" }} alignItems={{ xs: "center", lg: "start" }} gap={10}>
        <Stack width={{ xs: "100%", md: 600 }} alignItems="center">
          <MockAvatar sx={{ fontSize: 280 }} />
        </Stack>

        <Stack>
          <StrengthsCard />
        </Stack>
      </Stack>
    </TabContainer>
  );
};
