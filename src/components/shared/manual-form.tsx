import { Box, Button, Link, Stack, Textarea, Typography } from "@mui/joy";
import { FormEvent, useContext, useState } from "react";
import { useUpdateUserManual } from "../../api/use-user.api";
import { AuthContext } from "../../contexts/auth.context";
import { ManualModel } from "../../models/manual.model";

type EditableFormProps = {
  field: keyof ManualModel;
  title: string;
};

export const ManualForm = ({ field, title }: EditableFormProps) => {
  const { user, refetchUser } = useContext(AuthContext);
  const value = user?.manual?.[field] || "";
  const [tempValue, setTempValue] = useState<string>(value);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { mutateAsync: updateUserManual, isPending: isLoading } = useUpdateUserManual();

  const handleUpdateUserManual = async (e: FormEvent) => {
    e.preventDefault();
    if (!tempValue.trim() || tempValue === value) return;

    try {
      const updatedManual = { ...user?.manual, [field]: tempValue };
      await updateUserManual({ userId: user.id, manual: updatedManual });
      await refetchUser();
    } catch (error) {
      console.error("Failed to update manual:", error);
    } finally {
      setIsEditing(false);
    }
  };

  const isButtonDisabled = isLoading || !tempValue.trim() || tempValue === value;

  return (
    <Stack key={field} component="form" onSubmit={handleUpdateUserManual} gap={2.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="start" gap={1}>
        <Typography level="body-md" textColor="neutral.dark" fontWeight={700}>
          {title}
        </Typography>

        {value && value.length > 0 && (
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
  );
};
