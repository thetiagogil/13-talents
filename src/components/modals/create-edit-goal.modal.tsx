import { Button, Modal, ModalClose, ModalDialog, Option, Select, Stack, Textarea, Typography } from "@mui/joy";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useCreateGoal, useDeleteGoal, useUpdateGoal } from "../../api/use-goals.api";
import { SnackbarContext } from "../../contexts/snackbar.context";
import { GOAL_PROGRESS } from "../../lib/constants";
import { GoalModel } from "../../models/goal.model";
import { TalentModel } from "../../models/talent.model";
import { ColoredCircle } from "../shared/colored-circle";
import { TalentsCategorySelect } from "../shared/talents-category-select";

type CreateEditGoalModalProps = {
  userId: string;
  talents: TalentModel[];
  currentGoal: GoalModel | null;
  open: boolean;
  onClose: () => void;
  progress: GoalModel["progress"];
};

export const CreateEditGoalModal = ({
  userId,
  talents,
  currentGoal,
  open,
  onClose,
  progress
}: CreateEditGoalModalProps) => {
  const { showSnackbar } = useContext(SnackbarContext);
  const [goal, setGoal] = useState<{ talent_id: number; description: string; progress: GoalModel["progress"] }>({
    talent_id: currentGoal?.talent_id || 0,
    description: currentGoal?.description || "",
    progress: currentGoal?.progress || progress
  });
  const { mutate: createGoal, isPending: isCreating } = useCreateGoal();
  const { mutate: updateGoal, isPending: isUpdating } = useUpdateGoal();
  const { mutate: deleteGoal, isPending: isDeleting } = useDeleteGoal();

  useEffect(() => {
    if (open) {
      setGoal({
        talent_id: currentGoal?.talent_id || 0,
        description: currentGoal?.description || "",
        progress: currentGoal?.progress || progress
      });
    }
  }, [open, currentGoal, progress]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!goal.talent_id || !goal.description) {
      showSnackbar("danger", "Fields cannot be empty!");
      return;
    }

    if (currentGoal) {
      if (
        goal.talent_id === currentGoal.talent_id &&
        goal.description === currentGoal.description &&
        goal.progress === currentGoal.progress
      ) {
        showSnackbar("danger", "No changes detected!");
        return;
      }

      updateGoal(
        { ...goal, id: currentGoal.id, user_id: userId },
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
          user_id: userId,
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
        <Stack width={{ xs: "100%", sm: 450 }} gap={2.5}>
          <ModalClose variant="plain" sx={{ m: 1 }} onClick={onClose} />

          <Typography level="title-lg" fontWeight={700} textColor="neutral.dark">
            {currentGoal ? "Edit Goal" : "Create Goal"}
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} width="100%" gap={1}>
            <TalentsCategorySelect
              talents={talents}
              value={goal.talent_id}
              onChange={newSelection => setGoal(prev => ({ ...prev, talent_id: newSelection }))}
              sx={{ width: "100%" }}
            />

            <Select
              name="progress"
              value={goal.progress}
              onChange={(_, newValue) => setGoal(prev => ({ ...prev, progress: newValue as GoalModel["progress"] }))}
              disabled={currentGoal ? false : true}
              sx={{ width: "100%" }}
            >
              {GOAL_PROGRESS.map(progress => (
                <Option
                  key={progress}
                  value={progress}
                  label={
                    <Typography startDecorator={<ColoredCircle color={progress} size={12} />}>{progress}</Typography>
                  }
                >
                  <Typography startDecorator={<ColoredCircle color={progress} size={12} />}>{progress}</Typography>
                </Option>
              ))}
            </Select>
          </Stack>

          <Textarea
            name="description"
            value={goal.description}
            onChange={e => setGoal(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter goal description..."
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
