import { Box, Card, Chip, IconButton, Skeleton, Stack, Typography } from "@mui/joy";
import { useContext, useState } from "react";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";
import { ThreeDots } from "../../assets/icons/three-dots";
import { AuthContext } from "../../contexts/auth.context";
import { GoalModel, GoalProgress } from "../../models/goal.model";
import { getColorHex } from "../../utils/get-color-hex";
import { getColorTransparency } from "../../utils/get-color-transparency";
import { CreateEditGoalModal } from "../modals/create-edit-goal.modal";

type KanbanSectionProps = {
  progress: GoalProgress;
  goals: GoalModel[];
  isLoading: boolean;
};

export type ModalAction = "Create" | "Edit";

export const KanbanSection = ({ progress, goals, isLoading }: KanbanSectionProps) => {
  const { strengths } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentGoal, setCurrentGoal] = useState<GoalModel | null>(null);

  return (
    <Card
      variant="soft"
      sx={{
        bgcolor: "neutral.lightest",
        width: 320,
        boxShadow: `0px 4px 4px 0px ${getColorTransparency(getColorHex("black"), "10%")}`
      }}
    >
      {isModalOpen && (
        <CreateEditGoalModal
          currentGoal={currentGoal}
          open={isModalOpen}
          onClose={() => {
            setCurrentGoal(null);
            setIsModalOpen(false);
          }}
          progress={progress}
        />
      )}

      <Stack gap={1.5}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center" gap={1}>
            <Chip
              variant="outlined"
              startDecorator={<Box bgcolor={getColorHex(progress)} height={12} width={12} borderRadius="50%" />}
              sx={{
                bgcolor: getColorTransparency(getColorHex(progress), "20%"),
                color: getColorHex(progress),
                borderColor: getColorHex(progress)
              }}
            >
              {progress}
            </Chip>
            <Typography level="body-md" textColor="neutral.baseLighter">
              {isLoading ? <Skeleton variant="text" level="body-md" width={16} /> : goals.length}
            </Typography>
          </Stack>
          <IconButton>
            <ThreeDots sx={{ fontSize: 20 }} />
          </IconButton>
        </Stack>

        <Card
          variant="soft"
          onClick={() => {
            setCurrentGoal(null);
            setIsModalOpen(true);
          }}
          sx={{
            cursor: "pointer",
            bgcolor: "neutral.white",
            border: "1px solid",
            borderColor: "neutral.white",
            alignItems: "center",
            "&:hover": {
              border: "1px solid",
              borderColor: "subvisual.primary"
            }
          }}
        >
          <Typography
            level="body-md"
            textColor="subvisual.primary"
            startDecorator={<PlusSignOutlined sx={{ color: "subvisual.primary", fontSize: 16 }} />}
          >
            Add New Task
          </Typography>
        </Card>

        {isLoading
          ? [1, 2, 3].map(index => (
              <Card key={index} variant="soft" sx={{ bgcolor: "neutral.white" }}>
                <Stack gap={2}>
                  <Skeleton variant="text" level="body-md" />
                  <Skeleton variant="rectangular" height={24} width="50%" sx={{ borderRadius: 8 }} />
                </Stack>
              </Card>
            ))
          : goals.map(goal => {
              const strength = strengths.find(strength => strength.id === goal.strength_id);
              const strengthColor = getColorHex(strength?.category || "");
              return (
                <Card
                  key={goal.id}
                  variant="soft"
                  onClick={() => {
                    if (!goal.approved) {
                      setCurrentGoal(goal);
                      setIsModalOpen(true);
                    }
                  }}
                  sx={{
                    cursor: "pointer",
                    bgcolor: "neutral.white",
                    border: "1px solid",
                    borderColor: "neutral.white",
                    "&:hover": {
                      border: "1px solid",
                      borderColor: "neutral.baseLighter"
                    }
                  }}
                >
                  <Stack gap={2}>
                    <Typography level="body-md">{goal.details}</Typography>
                    <Stack direction="row" gap={1}>
                      <Chip
                        variant="plain"
                        sx={{
                          bgcolor: getColorTransparency(strengthColor, "20%"),
                          color: strengthColor
                        }}
                      >
                        {strength?.label}
                      </Chip>
                      {goal.progress === "Done" && (
                        <Chip
                          variant="plain"
                          sx={{
                            bgcolor: goal.approved ? "neutral.lighter" : "neutral.dark",
                            color: goal.approved ? "neutral.baseDarker" : "neutral.lightest"
                          }}
                        >
                          {goal.approved ? "Approved" : "Waiting for approval"}
                        </Chip>
                      )}
                    </Stack>
                  </Stack>
                </Card>
              );
            })}
      </Stack>
    </Card>
  );
};
