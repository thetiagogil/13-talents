import { Box, Button, Link, Stack, Textarea, Typography } from "@mui/joy";
import { FormEvent, Fragment, useState } from "react";
import { ManualModel } from "../../models/manual.model";
import { UserModel } from "../../models/user.model";

type EditableForm = {
  user: UserModel;
  updateUserManual: any;
  field: keyof ManualModel;
  title: string;
  isTeamView?: boolean;
  isLoading: boolean;
};

export const ManualForm = ({ user, updateUserManual, field, title, isTeamView, isLoading }: EditableForm) => {
  const value = user?.manual?.[field] || "";
  const [tempValue, setTempValue] = useState<string>(user?.manual?.[field] || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const isButtonDisabled = isLoading || !tempValue.trim() || tempValue === value;

  const handleUpdateUserManual = async (e: FormEvent) => {
    e.preventDefault();
    if (!tempValue.trim() || tempValue === value) return;

    try {
      const updatedManual = { ...user?.manual, [field]: tempValue };
      await updateUserManual({ userId: user.id, manual: updatedManual });
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <Fragment>
      {isTeamView && !value ? null : (
        <Stack component="form" onSubmit={handleUpdateUserManual} gap={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="start" gap={1}>
            <Typography level="body-md" textColor="neutral.dark" fontWeight={700}>
              {title}
            </Typography>

            {!isTeamView && value && value.length > 0 && (
              <Link
                level="body-sm"
                textColor="neutral.dark"
                fontWeight={700}
                underline="always"
                component={Typography}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Close" : "Edit"}
              </Link>
            )}
          </Stack>

          {value && value.length > 0 && !isEditing ? (
            <Typography level="body-md" textColor="neutral.baseDarker">
              {value}
            </Typography>
          ) : (
            <Textarea
              value={tempValue}
              onChange={e => setTempValue(e.target.value)}
              disabled={isLoading}
              endDecorator={
                <Box display="flex" flex={1} justifyContent="end">
                  <Button
                    type="submit"
                    color="neutral"
                    loading={isLoading}
                    disabled={isButtonDisabled}
                    sx={{ bgcolor: "neutral.light", fontWeight: 400 }}
                  >
                    {isEditing ? "Edit" : "Post"}
                  </Button>
                </Box>
              }
            />
          )}
        </Stack>
      )}
    </Fragment>
  );
};
