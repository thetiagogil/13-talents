import { useState } from "react";
import { TeamActivityTab } from "../components/layout/team-activity.tab";
import { TeamOverviewTab } from "../components/layout/team-overview.tab";
import { MainContainer } from "../components/shared/main-container";
import { TabsContainer } from "../components/shared/tabs-container";

export const TeamPage = () => {
  const [activeTab, setActiveTab] = useState<string | number | null>(0);
  return (
    <MainContainer hasSideBar>
      <TabsContainer
        hasPadding
        tabs={[
          { tab: "Team overview", panel: <TeamOverviewTab /> },
          { tab: "Activity", panel: <TeamActivityTab /> }
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </MainContainer>
  );
};
