import { Divider, Stack, Typography } from "@mui/joy";
import { useContext } from "react";
import { useUpdateUserManual } from "../../api/use-user.api";
import { AuthContext } from "../../contexts/auth.context";
import { ManualForm } from "../layout/manual-form";
import { TabContainer } from "../shared/tabs-container";
import { UserProfileInfo } from "../shared/user-info";

const manualInfo = [
  { field: "about", title: "The basics you should know about me are..." },
  { field: "needs", title: "I need..." },
  { field: "feedback", title: "The best way to give me feedback is..." },
  { field: "happiness", title: "My talents will be happy when..." },
  { field: "passions", title: "Beyond work, I’m really passionate about..." }
] as const;

export const PersonalManualTab = () => {
  const { user } = useContext(AuthContext);
  const { mutateAsync: updateUserManual, isPending: isLoading } = useUpdateUserManual();
  return (
    <TabContainer>
      <UserProfileInfo user={user} />

      <Stack gap={4}>
        <Typography level="body-md" textColor="neutral.baseDarker">
          Answer a few quick questions to help build your <strong>Manual of Me</strong>. This will make it easier for
          your teammates to collaborate with you!
        </Typography>

        <Divider />

        {manualInfo.map(({ field, title }) => (
          <ManualForm
            user={user}
            updateUserManual={updateUserManual}
            key={field}
            field={field}
            title={title}
            isLoading={isLoading}
          />
        ))}
      </Stack>
    </TabContainer>
  );
};
