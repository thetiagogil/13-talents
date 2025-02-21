import { Table, Typography } from "@mui/joy";
import { useMemo } from "react";
import { TalentModel } from "../../models/talent.model";
import { UserModel } from "../../models/user.model";
import { getColorHex } from "../../utils/get-color-hex";

type TeamComparisonTableProps = {
  talents: TalentModel[];
  selectedUsersArray: UserModel[];
};

export const TeamComparisonTable = ({ talents, selectedUsersArray }: TeamComparisonTableProps) => {
  const data = useMemo(() => {
    return talents
      .map(talent => {
        const totalScore = selectedUsersArray.reduce((sum, user) => {
          const position = (user.talents || []).indexOf(talent.id);
          const score = position !== -1 ? 10 - position : 0;
          return sum + score;
        }, 0);
        const averageScore = selectedUsersArray.length > 0 ? totalScore / selectedUsersArray.length : 0;
        const compatibility = Math.round((averageScore / 10) * 100);
        return { ...talent, compatibility };
      })
      .sort((a, b) => b.compatibility - a.compatibility)
      .slice(0, 5);
  }, [talents, selectedUsersArray]);

  return (
    <Table
      hoverRow
      stickyHeader
      borderAxis="bothBetween"
      sx={{
        "& th": {
          bgcolor: "transparent"
        },
        "& th:not(:first-of-type)": { display: { xs: "none", sm: "table-cell" } },
        "& td:not(:first-of-type)": { display: { xs: "none", sm: "table-cell" } }
      }}
    >
      <thead>
        <tr>
          <th>Team Top 5</th>
          <th>As a team we bring</th>
          <th>As a team we need</th>
          <th>As a team we are motivated by</th>
        </tr>
      </thead>
      <tbody>
        {data.map(talent => (
          <tr key={talent.id}>
            <td>
              <Typography textColor={getColorHex(talent.category)}>
                {talent.label} ({talent.compatibility}%)
              </Typography>
            </td>
            <td>{talent.details.bring}</td>
            <td>{talent.details.need}</td>
            <td>{talent.details.motivate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
