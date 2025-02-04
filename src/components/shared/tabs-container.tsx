import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { ReactNode } from "react";

type TabItem = {
  tab: string;
  panel: ReactNode;
};

type TabsContainerProps = {
  tabs: TabItem[];
  hasPadding?: boolean;
  activeTab: string | number | null;
  setActiveTab: (value: string | number | null) => void;
};

export const TabsContainer = ({ tabs, hasPadding, activeTab, setActiveTab }: TabsContainerProps) => {
  return (
    <Tabs value={activeTab} onChange={(_e, value) => setActiveTab?.(value)}>
      <TabList sx={{ justifyContent: { xs: "center", lg: "start" }, pl: hasPadding ? { xs: 0, lg: 3 } : 0, gap: 3 }}>
        {tabs.map((obj, index) => (
          <Tab
            key={index}
            value={index}
            slotProps={{
              root: {
                sx: {
                  p: 0,
                  fontSize: { xs: 14, sm: 16 }
                }
              }
            }}
          >
            {obj.tab}
          </Tab>
        ))}
      </TabList>
      {tabs.map((obj, index) => (
        <TabPanel key={index} value={index} sx={{ p: hasPadding ? { xs: 2, lg: 3 } : 0 }}>
          {obj.panel}
        </TabPanel>
      ))}
    </Tabs>
  );
};
