import { Button, Modal, ModalClose, ModalDialog, Option, Select, Stack, Textarea, Typography } from "@mui/joy";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useCreateGoal, useDeleteGoal, useUpdateGoal } from "../../api/use-goals.api";
import { AuthContext } from "../../contexts/auth.context";
import { SnackbarContext } from "../../contexts/snackbar.context";
import { GOALS_PROGRESS } from "../../lib/constants";
import { GoalModel, GoalProgress } from "../../models/goal.model";

type CreateEditGoalModalProps = {
  currentGoal: GoalModel | null;
  open: boolean;
  onClose: () => void;
  progress: GoalProgress;
};

export const CreateEditGoalModal = ({ currentGoal, open, onClose, progress }: CreateEditGoalModalProps) => {
  const { user, strengths } = useContext(AuthContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const [goal, setGoal] = useState<{ strength_id: number; details: string; progress: GoalProgress }>(() => ({
    strength_id: currentGoal?.strength_id || 0,
    details: currentGoal?.details || "",
    progress: currentGoal?.progress || progress
  }));
  const { mutate: createGoal, isPending: isCreating } = useCreateGoal();
  const { mutate: updateGoal, isPending: isUpdating } = useUpdateGoal();
  const { mutate: deleteGoal, isPending: isDeleting } = useDeleteGoal();

  useEffect(() => {
    if (open) {
      setGoal({
        strength_id: currentGoal?.strength_id || 0,
        details: currentGoal?.details || "",
        progress: currentGoal?.progress || progress
      });
    }
  }, [open, currentGoal, progress]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!goal.strength_id || !goal.details) {
      showSnackbar("danger", "Fields cannot be empty!");
      return;
    }

    if (currentGoal) {
      if (
        goal.strength_id === currentGoal.strength_id &&
        goal.details === currentGoal.details &&
        goal.progress === currentGoal.progress
      ) {
        showSnackbar("danger", "No changes detected!");
        return;
      }

      updateGoal(
        { ...goal, id: currentGoal.id, user_id: user.id },
        {
          onSuccess: () => {
            showSnackbar("success", "Goal updated.");
            onClose();
          },
          onError: () => {
            showSnackbar("danger", "Failed to update goal.");
          }
        }
      );
    } else {
      createGoal(
        {
          ...goal,
          user_id: user.id,
          approved: false
        },
        {
          onSuccess: () => {
            showSnackbar("success", "Goal created.");
            onClose();
          },
          onError: () => {
            showSnackbar("danger", "Failed to create goal.");
          }
        }
      );
    }
  };

  const handleDelete = () => {
    if (!currentGoal) return;
    if (window.confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(currentGoal.id, {
        onSuccess: () => {
          showSnackbar("success", "Goal deleted.");
          onClose();
        },
        onError: () => {
          showSnackbar("danger", "Failed to delete goal.");
        }
      });
    }
  };

  return (
    <Modal component="form" open={open} onClose={onClose} onSubmit={handleSave}>
      <ModalDialog>
        <Stack width={450} gap={2.5}>
          <ModalClose variant="plain" sx={{ m: 1 }} onClick={onClose} />

          <Typography level="title-lg" fontWeight={700} textColor="neutral.dark">
            {currentGoal ? "Edit Goal" : "Create Goal"}
          </Typography>

          <Stack direction="row" width="100%" gap={1}>
            <Select
              name="category"
              value={goal.strength_id}
              onChange={(_, newValue) => setGoal(prev => ({ ...prev, strength_id: newValue as number }))}
              placeholder="Select a strength"
              sx={{ width: "100%" }}
            >
              {strengths.map(strength => (
                <Option key={strength.id} value={strength.id}>
                  {strength.label}
                </Option>
              ))}
            </Select>

            <Select
              name="progress"
              value={goal.progress}
              onChange={(_, newValue) => setGoal(prev => ({ ...prev, progress: newValue as GoalProgress }))}
              disabled={currentGoal ? false : true}
              sx={{ width: "100%" }}
            >
              {GOALS_PROGRESS.map(progress => (
                <Option key={progress} value={progress}>
                  {progress}
                </Option>
              ))}
            </Select>
          </Stack>

          <Textarea
            name="details"
            value={goal.details}
            onChange={e => setGoal(prev => ({ ...prev, details: e.target.value }))}
            placeholder="Enter goal details..."
            minRows={2}
          />

          <Stack direction="row" justifyContent="end" gap={1}>
            {currentGoal && (
              <Button onClick={handleDelete} color="danger" loading={isDeleting} disabled={isCreating || isUpdating}>
                Delete goal
              </Button>
            )}
            <Button type="submit" loading={isCreating || isUpdating} disabled={isDeleting}>
              {currentGoal ? "Save Changes" : "Create"}
            </Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};
