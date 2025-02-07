import { Table, Typography } from "@mui/joy";
import { useMemo } from "react";
import { StrengthModel } from "../../models/strength.model";
import { UserModel } from "../../models/user.model";
import { getColorHex } from "../../utils/get-color-hex";

type TeamComparisonTableProps = {
  strengths: StrengthModel[];
  selectedUsersArray: UserModel[];
};

export const TeamComparisonTable = ({ strengths, selectedUsersArray }: TeamComparisonTableProps) => {
  const data = useMemo(() => {
    return strengths
      .map(strength => {
        const totalScore = selectedUsersArray.reduce((sum, user) => {
          const position = (user.strengths || []).indexOf(strength.id);
          const score = position !== -1 ? 10 - position : 0;
          return sum + score;
        }, 0);
        const averageScore = selectedUsersArray.length > 0 ? totalScore / selectedUsersArray.length : 0;
        const compatibility = Math.round((averageScore / 10) * 100);
        return { ...strength, compatibility };
      })
      .sort((a, b) => b.compatibility - a.compatibility)
      .slice(0, 5);
  }, [strengths, selectedUsersArray]);

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
        {data.map(strength => (
          <tr key={strength.id}>
            <td>
              {selectedUsersArray.length > 0 && (
                <Typography textColor={getColorHex(strength.category)}>
                  {strength.label} ({strength.compatibility}%)
                </Typography>
              )}
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
