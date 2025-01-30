import { Divider, Stack, Typography } from "@mui/joy";
import { ManualForm } from "../shared/manual-form";
import { TabContainer } from "../shared/tabs-container";
import { UserInfo } from "../shared/user-info";

const manualInfo = [
  { field: "about", title: "The basics you should know about me are..." },
  { field: "needs", title: "I need..." },
  { field: "feedback", title: "The best way to give me feedback is..." },
  { field: "happiness", title: "My talents will be happy when..." },
  { field: "passions", title: "Beyond work, I’m really passionate about..." }
] as const;

export const PersonalManualTab = () => {
  return (
    <TabContainer>
      <UserInfo />

      <Stack gap={4}>
        <Typography level="body-md" textColor="neutral.baseDarker">
          Answer a few quick questions to help build your <strong>Manual of Me</strong>. This will make it easier for
          your teammates to collaborate with you!
        </Typography>

        <Divider />

        {manualInfo.map(({ field, title }) => (
          <ManualForm key={field} field={field} title={title} />
        ))}
      </Stack>
    </TabContainer>
  );
};
