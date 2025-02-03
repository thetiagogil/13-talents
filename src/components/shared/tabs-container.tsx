import { Stack, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { ReactNode } from "react";

type TabItem = {
  tab: string;
  panel: ReactNode;
  disabled?: boolean;
};

type TabsContainerProps = {
  tabs: TabItem[];
  hasPadding?: boolean;
  activeTab: string | number | null;
  setActiveTab: (value: string | number | null) => void;
};

type TabContainerProps = {
  children: ReactNode;
  sx?: SxProps;
};

export const TabsContainer = ({ tabs, hasPadding, activeTab, setActiveTab }: TabsContainerProps) => (
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
          disabled={obj.disabled}
        >
          {obj.tab}
        </Tab>
      ))}
    </TabList>
    {tabs.map((obj, index) => (
      <TabPanel key={index} value={index} sx={{ p: hasPadding ? { xs: 2, lg: 3 } : 0, pt: 2 }}>
        {obj.panel}
      </TabPanel>
    ))}
  </Tabs>
);

export const TabContainer = ({ children, sx }: TabContainerProps) => (
  <Stack width={{ xs: "100%", xl: 1200 }} alignItems={{ xs: "center", lg: "start" }} gap={4} sx={{ ...sx }}>
    {children}
  </Stack>
);
