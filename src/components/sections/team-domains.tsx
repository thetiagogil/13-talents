import { Card, Skeleton, Stack, Typography } from "@mui/joy";
import { useMemo } from "react";
import { TALENT_CATEGORIES } from "../../lib/constants";
import { TalentModel } from "../../models/talent.model";
import { UsersTalentsModel } from "../../models/users-talents.model";
import { getColorHex } from "../../utils/get-color-hex";
import { pluralize } from "../../utils/pluralize";

type TeamSearchProps = {
  talents: TalentModel[];
  usersTalents: UsersTalentsModel[];
  isLoading: boolean;
};

export const TeamDomains = ({ talents, usersTalents, isLoading }: TeamSearchProps) => {
  const talentCategoriesArray = useMemo(() => {
    return TALENT_CATEGORIES.map(category => {
      const filterTalentsByCategory = talents.filter(talent => talent.category === category);
      const filterUsersTalentsByCategory = usersTalents.filter(item =>
        filterTalentsByCategory.some(talent => item.talent_id === talent.id)
      );
      const numberOfUsers = new Set(filterUsersTalentsByCategory.map(item => item.user_id)).size;
      const numberOfTalents = new Set(filterUsersTalentsByCategory.map(item => item.talent_id)).size;
      return { category, numberOfUsers, numberOfTalents };
    });
  }, [talents, usersTalents]);

  return (
    <Stack gap={2.5}>
      <Typography level="title-lg" fontWeight={700}>
        Team's Domains
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} borderRadius={8} overflow="hidden">
        {talentCategoriesArray.map(({ category, numberOfUsers, numberOfTalents }) => (
          <Card
            key={category}
            variant="plain"
            sx={{
              bgcolor: getColorHex(category),
              flex: 1,
              borderRadius: 0
            }}
          >
            <Stack alignItems={{ xs: "center", sm: "start" }} gap={1}>
              <Typography level="body-md" textColor="neutral.white" fontWeight={700}>
                {category}
              </Typography>
              {isLoading ? (
                <Skeleton variant="text" />
              ) : (
                <Typography level="body-md" textColor="neutral.white">
                  {pluralize(numberOfUsers, "person", "people")}
                </Typography>
              )}
              {isLoading ? (
                <Skeleton variant="text" />
              ) : (
                <Typography level="body-md" textColor="neutral.white">
                  {pluralize(numberOfTalents, "talent", "talents")}
                </Typography>
              )}
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};
