import { useContext } from "react";
import { useGetUsers } from "../../api/use-user.api";
import { AuthContext } from "../../contexts/auth.context";
import { TeamSearch } from "../layout/team-search";
import { TabContainer } from "../shared/tabs-container";

export const TeamOverviewTab = () => {
  const { user } = useContext(AuthContext);
  const { data: users } = useGetUsers();

  return (
    <TabContainer>
      <TeamSearch currentUser={user} users={users || []} />
    </TabContainer>
  );
};
