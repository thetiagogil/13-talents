import { Card, Skeleton, Stack, Typography } from "@mui/joy";
import { STRENGTH_CATEGORIES } from "../../lib/constants";
import { StrengthModel } from "../../models/strength.model";
import { UsersStrengthsModel } from "../../models/users-strengths.model";
import { getColorHex } from "../../utils/get-color-hex";

type TeamSearchProps = {
  strengths: StrengthModel[];
  usersStrengths: UsersStrengthsModel[];
  isLoading: boolean;
};

export const TeamDomains = ({ strengths, usersStrengths, isLoading }: TeamSearchProps) => (
  <Stack gap={2.5}>
    <Typography level="title-lg" fontWeight={700}>
      Team's Domains
    </Typography>

    <Stack direction="row">
      {STRENGTH_CATEGORIES.map((category, index) => {
        const filterStrengthsByCategory = strengths.filter(strength => strength.category === category);
        const filterUsersStrengthsByCategory = usersStrengths.filter(item =>
          filterStrengthsByCategory.some(strength => item.strength_id === strength.id)
        );
        const numberOfUsers = new Set(filterUsersStrengthsByCategory.map(item => item.user_id)).size;
        const numberOfStrengths = new Set(filterUsersStrengthsByCategory.map(item => item.strength_id)).size;

        return (
          <Card
            key={category}
            variant="plain"
            sx={{
              bgcolor: getColorHex(category),
              flex: 1,
              borderRadius: 0,
              ...(index === 0 && { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }),
              ...(index === 3 && { borderTopRightRadius: 8, borderBottomRightRadius: 8 })
            }}
          >
            <Stack gap={1}>
              <Typography level="body-md" textColor="neutral.white" fontWeight={700}>
                {category}
              </Typography>
              {isLoading ? (
                <Skeleton variant="text" />
              ) : (
                <Typography level="body-md" textColor="neutral.white">
                  {numberOfUsers} people
                </Typography>
              )}
              {isLoading ? (
                <Skeleton variant="text" />
              ) : (
                <Typography level="body-md" textColor="neutral.white">
                  {numberOfStrengths} strengths
                </Typography>
              )}
            </Stack>
          </Card>
        );
      })}
    </Stack>
  </Stack>
);
