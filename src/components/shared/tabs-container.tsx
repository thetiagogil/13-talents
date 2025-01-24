import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { ReactNode } from "react";

type TabItem = {
  tab: string;
  panel: ReactNode;
};

type TabsContainerProps = {
  tabs: TabItem[];
  hasPadding?: boolean;
};

export const TabsContainer = ({ tabs, hasPadding }: TabsContainerProps) => {
  return (
    <Tabs defaultValue={0}>
      <TabList sx={{ pl: hasPadding ? 3 : 0, gap: 3 }}>
        {tabs.map((obj, index) => (
          <Tab
            key={index}
            value={index}
            slotProps={{
              root: {
                sx: {
                  p: 0
                }
              }
            }}
          >
            {obj.tab}
          </Tab>
        ))}
      </TabList>
      {tabs.map((obj, index) => (
        <TabPanel key={index} value={index} sx={{ px: hasPadding ? 3 : 0 }}>
          {obj.panel}
        </TabPanel>
      ))}
    </Tabs>
  );
};
