import { useState } from "react";
import { PersonalActivityTab } from "../components/layout/personal-activity.tab";
import { PersonalGoalsTab } from "../components/layout/personal-goals.tab";
import { PersonalManualTab } from "../components/layout/personal-manual.tab";
import { PersonalProfileTab } from "../components/layout/personal-profile.tab";
import { MainContainer } from "../components/shared/main-container";
import { TabsContainer } from "../components/shared/tabs-container";

export const PersonalPage = () => {
  const [activeTab, setActiveTab] = useState<string | number | null>(0);
  return (
    <MainContainer hasSideBar>
      <TabsContainer
        hasPadding
        tabs={[
          { tab: "My profile", panel: <PersonalProfileTab /> },
          { tab: "Manual of me", panel: <PersonalManualTab /> },
          { tab: "Personal goals", panel: <PersonalGoalsTab /> },
          { tab: "Activity", panel: <PersonalActivityTab /> }
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </MainContainer>
  );
};
