import { Stack } from "@mui/joy";
import { useContext, useState } from "react";
import { useGetUsers } from "../../api/use-user.api";
import { useGetUsersStrengths } from "../../api/use-users-strengths.api";
import { AuthContext } from "../../contexts/auth.context";
import { UserModel } from "../../models/user.model";
import { TeamComparison } from "../layout/team-comparison";
import { TeamDomains } from "../layout/team-domains";
import { TeamSearch } from "../layout/team-search";
import { TeamStrengths } from "../layout/team-strengths";
import { TabContainer, TabsContainer } from "../shared/tabs-container";
import { UserProfileInfo } from "../shared/user-info";
import { SharedManualTab } from "./shared-manual.tab";
import { SharedProfileTab } from "./shared-profile.tab";

export const TeamOverviewTab = () => {
  const { user, strengths } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<string | number | null>(0);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [selectedUsersArray, setSelectedUsersArray] = useState<UserModel[]>([]);
  const { data: users = [], isPending: isPendingUsers } = useGetUsers();
  const { data: usersStrengths = [], isPending: isPendingUsersStrengths } = useGetUsersStrengths();
  const isLoading = isPendingUsers || isPendingUsersStrengths;

  return (
    <TabContainer>
      <Stack direction={{ xs: "column", lg: "row" }} width="100%" alignItems="flex-start" gap={{ xs: 4, lg: 8 }}>
        <TeamSearch
          currentUser={user}
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          isComparing={isComparing}
          setIsComparing={setIsComparing}
          selectedUsersArray={selectedUsersArray}
          setSelectedUsersArray={setSelectedUsersArray}
          setActiveTab={setActiveTab}
          isLoading={isLoading}
        />

        {isComparing ? (
          <Stack width="100%" gap={{ xs: 4, lg: 8 }}>
            <TeamComparison
              strengths={strengths}
              selectedUsersArray={selectedUsersArray}
              setSelectedUsersArray={setSelectedUsersArray}
            />
          </Stack>
        ) : selectedUser ? (
          <Stack width="100%" gap={4}>
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
          <Stack width="100%" gap={{ xs: 4, lg: 8 }}>
            <TeamDomains strengths={strengths} usersStrengths={usersStrengths} isLoading={isLoading} />
            <TeamStrengths users={users} strengths={strengths} usersStrengths={usersStrengths} isLoading={isLoading} />
          </Stack>
        )}
      </Stack>
    </TabContainer>
  );
};
