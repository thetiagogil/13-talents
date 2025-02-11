import { Chip, Stack, Typography } from "@mui/joy";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";
import { StrengthModel } from "../../models/strength.model";
import { UserModel } from "../../models/user.model";
import { radarChartBgColors, radarChartBorderColors } from "../../utils/get-radar-chart-colors";
import { TeamComparisonRadarChart } from "../analytics/team-comparison-radar-chart";
import { TeamComparisonTable } from "../analytics/team-comparison-table";
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
    <Stack gap={2.5}>
      <Typography level="title-lg" fontWeight={700}>
        Profile Comparison
      </Typography>

      <Stack maxWidth={1200} gap={4}>
        {selectedUsersArray.length > 0 && (
          <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={2}>
            <Stack direction="row" flexWrap="wrap" gap={2}>
              {selectedUsersArray.map((user, index) => {
                const colorIndex = index % radarChartBgColors.length;
                return (
                  <Chip
                    key={user.id}
                    variant="outlined"
                    onClick={() => removeUser(user.id)}
                    startDecorator={<ColoredCircle color={radarChartBorderColors[colorIndex]} size={12} />}
                    sx={{ color: radarChartBorderColors[colorIndex], fontSize: 14 }}
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

        <TeamComparisonRadarChart strengths={strengths} selectedUsersArray={selectedUsersArray} />

        {selectedUsersArray.length > 0 && (
          <TeamComparisonTable strengths={strengths} selectedUsersArray={selectedUsersArray} />
        )}
      </Stack>
    </Stack>
  );
};
