import { Stack } from "@mui/joy";
import { useContext } from "react";
import { useGetUsers } from "../../api/use-user.api";
import { useGetUsersStrengths } from "../../api/use-users-strengths.api";
import { AuthContext } from "../../contexts/auth.context";
import { TeamDomains } from "../layout/team-domains";
import { TeamSearch } from "../layout/team-search";
import { TabContainer } from "../shared/tabs-container";

export const TeamOverviewTab = () => {
  const { user, strengths } = useContext(AuthContext);
  const { data: users } = useGetUsers();
  const { data: usersStrengths } = useGetUsersStrengths();

  return (
    <TabContainer>
      <Stack direction="row" gap={8} width="100%">
        <TeamSearch currentUser={user || {}} users={users || []} />
        <Stack width="100%">
          <TeamDomains strengths={strengths || []} usersStrengths={usersStrengths || []} />
        </Stack>
      </Stack>
    </TabContainer>
  );
};
