import { Stack } from "@mui/joy";
import { useContext, useState } from "react";
import { useGetStrengths } from "../../api/use-strengths.api";
import { useGetUserById, useGetUsers } from "../../api/use-user.api";
import { useGetUsersStrengths } from "../../api/use-users-strengths.api";
import { AuthContext } from "../../contexts/auth.context";
import { UserModel } from "../../models/user.model";
import { TeamDomains } from "../layout/team-domains";
import { TeamSearch } from "../layout/team-search";
import { TeamStrengths } from "../layout/team-strengths";
import { TabContainer, TabsContainer } from "../shared/tabs-container";
import { UserProfileInfo } from "../shared/user-info";
import { SharedManualTab } from "./shared-manual.tab";
import { SharedProfileTab } from "./shared-profile.tab";

export const TeamOverviewTab = () => {
  const { userId } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [activeTab, setActiveTab] = useState<string | number | null>(0);
  const { data: user } = useGetUserById(userId);
  const { data: strengths } = useGetStrengths();
  const { data: users, isPending: isPendingUsers } = useGetUsers();
  const { data: usersStrengths, isPending: isPendingUsersStrengths } = useGetUsersStrengths();
  const isLoading = isPendingUsers || isPendingUsersStrengths;

  return (
    <TabContainer>
      <Stack direction="row" gap={8} width="100%" alignItems="flex-start">
        <TeamSearch
          currentUser={user || {}}
          users={users || []}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          isloading={isLoading}
        />

        {selectedUser ? (
          <Stack gap={4}>
            <UserProfileInfo user={selectedUser} />
            <TabsContainer
              tabs={[
                { tab: "Profile", panel: <SharedProfileTab user={selectedUser} isTeamView /> },
                {
                  tab: "Manual of me",
                  panel: <SharedManualTab user={selectedUser} isTeamView />,
                  disabled: selectedUser?.manual ? false : true
                }
              ]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </Stack>
        ) : (
          <Stack width="100%" gap={8}>
            <TeamDomains strengths={strengths || []} usersStrengths={usersStrengths || []} isLoading={isLoading} />
            <TeamStrengths
              users={users || []}
              strengths={strengths || []}
              usersStrengths={usersStrengths || []}
              isLoading={isLoading}
            />
          </Stack>
        )}
      </Stack>
    </TabContainer>
  );
};
