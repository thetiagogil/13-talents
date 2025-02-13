import { Box, Button, Link, Stack, Textarea, Typography } from "@mui/joy";
import { FormEvent, useState } from "react";
import { UserModel } from "../../models/user.model";

type EditableForm = {
  user: UserModel;
  updateUserManual: (params: { userId: string; manual: UserModel["manual"] }) => Promise<any>;
  field: keyof UserModel["manual"];
  title: string;
  editingField: string | null;
  submittingField: string | null;
  setEditingField: (fieldOrNull: string | null) => void;
  setSubmittingField: (fieldOrNull: string | null) => void;
  isTeamView?: boolean;
};

export const ManualForm = ({
  user,
  updateUserManual,
  field,
  title,
  editingField,
  submittingField,
  setEditingField,
  setSubmittingField,
  isTeamView
}: EditableForm) => {
  const value = user?.manual?.[field] || "";
  const [tempValue, setTempValue] = useState<string>(value);
  const isEditing = editingField === field;
  const isLoading = submittingField === field;
  const isButtonDisabled = isLoading || !tempValue.trim() || tempValue === value;

  const handleUpdateUserManual = async (e: FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    try {
      setSubmittingField(field);
      const updatedManual = { ...user?.manual, [field]: tempValue };
      await updateUserManual({ userId: user.id, manual: updatedManual });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmittingField(null);
      setEditingField(null);
    }
  };

  return (
    <>
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
                onClick={() => {
                  if (isEditing) {
                    setEditingField(null);
                  } else {
                    setEditingField(field);
                    setTempValue(value);
                  }
                }}
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
                    {value && value.length > 0 ? "Edit" : "Post"}
                  </Button>
                </Box>
              }
              sx={{ width: "100%" }}
            />
          )}
        </Stack>
      )}
    </>
  );
};
