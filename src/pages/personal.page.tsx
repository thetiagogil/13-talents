import { useState } from "react";
import { MainContainer } from "../components/shared/main-container";
import { TabsContainer } from "../components/shared/tabs-container";
import { PersonalActivityTab } from "../components/tabs/personal-activity.tab";
import { PersonalGoalsTab } from "../components/tabs/personal-goals.tab";
import { PersonalManualTab } from "../components/tabs/personal-manual.tab";
import { PersonalProfileTab } from "../components/tabs/personal-profile.tab";

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
          { tab: "Activity", panel: <PersonalActivityTab />, disabled: true }
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </MainContainer>
  );
};
