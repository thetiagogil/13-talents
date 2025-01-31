import { Stack } from "@mui/joy";
import { useContext } from "react";
import { useGetUsers } from "../../api/use-user.api";
import { useGetUsersStrengths } from "../../api/use-users-strengths.api";
import { AuthContext } from "../../contexts/auth.context";
import { TeamDomains } from "../layout/team-domains";
import { TeamSearch } from "../layout/team-search";
import { TeamStrengths } from "../layout/team-strengths";
import { TabContainer } from "../shared/tabs-container";

export const TeamOverviewTab = () => {
  const { user, strengths } = useContext(AuthContext);
  const { data: users, isFetching: isFetchingUsers } = useGetUsers();
  const { data: usersStrengths, isFetching: isFetchingUsersStrengths } = useGetUsersStrengths();
  const isLoading = isFetchingUsers || isFetchingUsersStrengths;

  return (
    <TabContainer>
      <Stack direction="row" gap={8} width="100%" alignItems="flex-start">
        <TeamSearch currentUser={user || {}} users={users || []} isloading={isLoading} />
        <Stack width="100%" gap={8}>
          <TeamDomains strengths={strengths || []} usersStrengths={usersStrengths || []} isLoading={isLoading} />
          <TeamStrengths
            users={users || []}
            strengths={strengths || []}
            usersStrengths={usersStrengths || []}
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
    </TabContainer>
  );
};
