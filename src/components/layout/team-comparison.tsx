import { Chip, Stack, Typography } from "@mui/joy";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";
import { StrengthModel } from "../../models/strength.model";
import { UserModel } from "../../models/user.model";
import { radarChartBgColors, radarChartBorderColors } from "../../utils/get-radar-chart-colors";
import { ProfileComparisonChart } from "../charts/profile-comparison-chart";
import { ColoredCircle } from "../shared/colored-circle";

type TeamCompareProps = {
  strengths: StrengthModel[];
  selectedUsersArray: UserModel[];
  setSelectedUsersArray: (users: UserModel[]) => void;
};

export const TeamComparison = ({ strengths, selectedUsersArray, setSelectedUsersArray }: TeamCompareProps) => {
  const removeUser = (userId: string) => {
    setSelectedUsersArray(selectedUsersArray.filter(user => user.id !== userId));
  };

  return (
    <Stack flex={1} gap={2.5}>
      <Typography level="title-lg" fontWeight={700}>
        Profile Comparison
      </Typography>

      <Stack gap={4}>
        {selectedUsersArray.length > 0 && (
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" gap={2}>
              {selectedUsersArray.map((user, index) => {
                const colorIndex = index % radarChartBgColors.length;
                return (
                  <Chip
                    key={user.id}
                    variant="outlined"
                    onClick={() => removeUser(user.id)}
                    startDecorator={<ColoredCircle color={radarChartBorderColors[colorIndex]} size={12} />}
                    sx={{
                      color: radarChartBorderColors[colorIndex],
                      fontSize: 14
                    }}
                  >
                    {user.name}
                  </Chip>
                );
              })}
            </Stack>
            <Chip
              variant="outlined"
              onClick={() => setSelectedUsersArray([])}
              endDecorator={<PlusSignOutlined sx={{ fontSize: 12, transform: "rotate(45deg)" }} />}
              sx={{ fontSize: 14 }}
            >
              Clear all
            </Chip>
          </Stack>
        )}

        <Stack position="relative" width="100%" height="100%">
          <ProfileComparisonChart strengths={strengths} selectedUsersArray={selectedUsersArray} />
        </Stack>
      </Stack>
    </Stack>
  );
};
