import { Stack, Typography } from "@mui/joy";
import { StrengthModel } from "../../models/strength.model";
import { UserModel } from "../../models/user.model";
import { TeamComparisonRadarChart } from "../analytics/team-comparison-radar-chart";
import { TeamComparisonTable } from "../analytics/team-comparison-table";

type TeamCompareProps = {
  strengths: StrengthModel[];
  selectedUsersArray: UserModel[];
  setSelectedUsersArray: (users: UserModel[]) => void;
};

export const TeamComparison = ({ strengths, selectedUsersArray, setSelectedUsersArray }: TeamCompareProps) => {
  return (
    <Stack gap={2.5}>
      <Typography level="title-lg" fontWeight={700}>
        Profile Comparison
      </Typography>

      <Stack maxWidth={1200} gap={4}>
        <TeamComparisonRadarChart
          strengths={strengths}
          selectedUsersArray={selectedUsersArray}
          setSelectedUsersArray={setSelectedUsersArray}
        />
        {selectedUsersArray.length > 0 && (
          <TeamComparisonTable strengths={strengths} selectedUsersArray={selectedUsersArray} />
        )}
      </Stack>
    </Stack>
  );
};
