import { Box, Button, Card, Chip, IconButton, Skeleton, Stack, Typography } from "@mui/joy";
import { useContext } from "react";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";
import { ThreeDots } from "../../assets/icons/three-dots";
import { AuthContext } from "../../contexts/auth.context";
import { GoalModel, GoalProgress } from "../../models/goal.model";
import { getColorHex } from "../../utils/get-color-hex";
import { getColorTransparency } from "../../utils/get-color-transparency";

type KanbanSectionProps = {
  progress: GoalProgress;
  goals: GoalModel[];
  isLoading: boolean;
};

export const KanbanSection = ({ progress, goals, isLoading }: KanbanSectionProps) => {
  const { strengths } = useContext(AuthContext);

  return (
    <Card variant="soft" sx={{ bgcolor: "neutral.lightest", width: 320 }}>
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
            <ThreeDots sx={{ fontSize: 24 }} />
          </IconButton>
        </Stack>

        <Card
          variant="soft"
          component={Button}
          sx={{
            bgcolor: "neutral.white",
            "&:hover": { bgcolor: getColorTransparency(getColorHex("primary"), "10%") }
          }}
        >
          <Stack alignItems="center">
            <Typography
              level="body-md"
              textColor="subvisual.primary"
              startDecorator={<PlusSignOutlined sx={{ color: "subvisual.primary", fontSize: 16 }} />}
            >
              Add New Task
            </Typography>
          </Stack>
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
                <Card key={goal.id} variant="soft" sx={{ bgcolor: "neutral.white" }}>
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
