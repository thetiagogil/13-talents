import { useState } from "react";
import { MainContainer } from "../components/shared/main-container";
import { TabsContainer } from "../components/shared/tabs-container";
import { TeamActivityTab } from "../components/tabs/team-activity.tab";
import { TeamOverviewTab } from "../components/tabs/team-overview.tab";

export const TeamPage = () => {
  const [activeTab, setActiveTab] = useState<string | number | null>(0);
  return (
    <MainContainer hasSideBar>
      <TabsContainer
        hasPadding
        tabs={[
          { tab: "Team overview", panel: <TeamOverviewTab /> },
          { tab: "Activity", panel: <TeamActivityTab />, disabled: true }
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </MainContainer>
  );
};
