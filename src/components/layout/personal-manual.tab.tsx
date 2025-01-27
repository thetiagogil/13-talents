import { Box, Button, Divider, Link, Stack, Textarea, Typography } from "@mui/joy";
import { FormEvent, useContext, useState } from "react";
import { updateUserManual } from "../../api/use-user.api";
import { AuthContext } from "../../contexts/auth.context";
import { ManualModel } from "../../models/manual.model";
import { showToast } from "../../utils/toast";
import { UserInfo } from "../shared/user-info";

const manualInfo = [
  { key: "about", label: "The basics you should know about me are..." },
  { key: "needs", label: "I need..." },
  { key: "feedback", label: "The best way to give me feedback is..." },
  { key: "happiness", label: "My talents will be happy when..." },
  { key: "passions", label: "Beyond work, I’m really passionate about..." }
] as const;

export const PersonalManualTab = () => {
  const { user } = useContext(AuthContext);
  const [manual, setManual] = useState<ManualModel>(user?.manual || {});
  const [tempManual, setTempManual] = useState<ManualModel>({});
  const [setActiveKey, setSetActiveKey] = useState<keyof ManualModel | null>(null);
  const [isUpdating, setIsUpdating] = useState<{ [key in keyof ManualModel]?: boolean }>({});

  const handeSubmit = async (e: FormEvent, key: keyof ManualModel) => {
    e.preventDefault();
    if (isUpdating[key]) return;
    setIsUpdating(prev => ({ ...prev, [key]: true }));
    try {
      const updatedManual = { ...manual, [key]: tempManual[key] };
      const response = await updateUserManual(user?.id, updatedManual);
      if (response) {
        showToast("success", "Profile updated with success.");
        setManual(updatedManual);
        setSetActiveKey(null);
      }
    } catch (error) {
      console.error("Failed to update manual:", error);
    } finally {
      setIsUpdating(prev => ({ ...prev, [key]: false }));
    }
  };

  const toggleEditStateForKey = (key: keyof ManualModel) => {
    if (setActiveKey === key) {
      setSetActiveKey(null);
    } else {
      setTempManual(prev => ({ ...prev, [key]: manual[key] }));
      setSetActiveKey(key);
    }
  };

  return (
    <Stack alignItems={{ xs: "center", lg: "start" }} gap={4}>
      <UserInfo />

      <Stack gap={4}>
        <Typography level="body-md" textColor="neutral.baseDarker">
          Answer a few quick questions to help build your <strong>Manual of Me</strong>. This will make it easier for
          your teammates to collaborate with you!
        </Typography>

        <Divider />

        {manualInfo.map(({ key, label }) => {
          const manualKey = manual[key];
          const isEditing = setActiveKey === key;

          return (
            <Stack key={key} component="form" onSubmit={e => handeSubmit(e, key)} gap={2.5}>
              <Stack direction="row" justifyContent="space-between">
                <Typography level="body-md" textColor="neutral.dark" fontWeight={700}>
                  {label}
                </Typography>

                {manualKey && manualKey.length > 0 && (
                  <Link
                    level="body-sm"
                    textColor="neutral.dark"
                    fontWeight={700}
                    underline="always"
                    component={Typography}
                    onClick={() => toggleEditStateForKey(key)}
                  >
                    {isEditing ? "Close" : "Edit"}
                  </Link>
                )}
              </Stack>

              {manualKey && manualKey.length > 0 && !isEditing ? (
                <Typography level="body-md" textColor="neutral.baseDarker">
                  {manualKey}
                </Typography>
              ) : (
                <Textarea
                  key={key}
                  value={tempManual[key] || ""}
                  onChange={e => setTempManual(prev => ({ ...prev, [key]: e.target.value }))}
                  endDecorator={
                    <Box display="flex" flex={1} justifyContent="end">
                      <Button
                        type="submit"
                        color="neutral"
                        loading={isUpdating[key]}
                        disabled={isUpdating[key] || !tempManual[key]?.trim()}
                        sx={{ bgcolor: "neutral.light", fontWeight: 400 }}
                      >
                        Post
                      </Button>
                    </Box>
                  }
                />
              )}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
