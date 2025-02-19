import { Card, Checkbox, Chip, Skeleton, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";
import { GoalModel } from "../../models/goal.model";
import { StrengthModel } from "../../models/strength.model";
import { getColorHex } from "../../utils/get-color-hex";
import { getColorTransparency } from "../../utils/get-color-transparency";
import { CreateEditGoalModal } from "../modals/create-edit-goal.modal";
import { ColoredCircle } from "../shared/colored-circle";

type KanbanSectionProps = {
  userId: string;
  strengths: StrengthModel[];
  progress: GoalModel["progress"];
  goals: GoalModel[];
  isLoading: boolean;
};

export const KanbanSection = ({ userId, strengths, progress, goals, isLoading }: KanbanSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentGoal, setCurrentGoal] = useState<GoalModel | null>(null);
  const [showApproved, setShowApproved] = useState(false);
  const filteredGoals = showApproved
    ? goals.sort((a, b) => Number(a.approved) - Number(b.approved))
    : goals.filter(goal => goal.approved === false);

  return (
    <Card
      variant="soft"
      sx={{
        bgcolor: "neutral.lightest",
        width: { xs: "100%", sm: 320 },
        boxShadow: `0px 4px 4px 0px ${getColorTransparency(getColorHex("black"), 10)}`
      }}
    >
      {isModalOpen && (
        <CreateEditGoalModal
          userId={userId}
          strengths={strengths}
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
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack flex={1} height={36} direction="row" alignItems="center" gap={1}>
            <Chip
              variant="outlined"
              startDecorator={<ColoredCircle color={progress} size={12} />}
              sx={{
                bgcolor: getColorTransparency(getColorHex(progress), 20),
                color: getColorHex(progress),
                borderColor: getColorHex(progress)
              }}
            >
              {progress}
            </Chip>
            {isLoading ? (
              <Skeleton variant="text" level="body-md" />
            ) : (
              <Typography level="body-md" textColor="neutral.baseLighter">
                {goals.length}
              </Typography>
            )}
          </Stack>

          {progress === "Done" && (
            <Checkbox
              size="sm"
              disabled={!goals.length}
              label="Show Approved"
              checked={showApproved}
              onChange={event => setShowApproved(event.target.checked)}
              variant={showApproved ? "soft" : "outlined"}
              sx={{ color: "neutral.baseDarker" }}
            />
          )}
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
          ? Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} variant="soft" sx={{ bgcolor: "neutral.white", borderColor: "neutral.white" }}>
                <Stack gap={2}>
                  <Skeleton variant="text" level="body-md" />
                  <Skeleton variant="rectangular" height={24} width="50%" sx={{ borderRadius: 8 }} />
                </Stack>
              </Card>
            ))
          : filteredGoals.map(goal => {
              const strength = strengths.find(strength => strength.id === goal.strength_id);
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
                    ...(!goal.approved && { cursor: "pointer" }),
                    bgcolor: "neutral.white",
                    border: "1px solid",
                    borderColor: "neutral.white",
                    "&:hover": {
                      border: "1px solid",
                      borderColor: goal.approved ? "transparent" : "subvisual.primary"
                    }
                  }}
                >
                  <Stack gap={2}>
                    <Typography level="body-md">{goal.description}</Typography>
                    <Stack gap={1}>
                      <Chip
                        variant="plain"
                        sx={{
                          bgcolor: getColorTransparency(getColorHex(strength?.category || ""), 20),
                          color: getColorHex(strength?.category || "")
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
