import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Skeleton,
  Stack,
  Typography
} from "@mui/joy";
import { useMemo, useState } from "react";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";
import { TalentModel } from "../../models/talent.model";
import { UserModel } from "../../models/user.model";
import { UsersTalentsModel } from "../../models/users-talents.model";
import { getColorHex } from "../../utils/get-color-hex";
import { UserAvatarInfo } from "../shared/user-info";

type AccordionItemProps = {
  item: { talent_id: number; user_ids: string[] };
  currentUser: UserModel;
  users: UserModel[];
  talent: TalentModel;
};

type TeamTalentsProps = {
  currentUser: UserModel;
  users: UserModel[];
  talents: TalentModel[];
  usersTalents: UsersTalentsModel[];
  isLoading: boolean;
};

const AccordionItem = ({ item, currentUser, users, talent }: AccordionItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const usersWithTalent = users.filter(user => item.user_ids.some(userId => user.id === userId));

  return (
    <>
      <Accordion
        expanded={isExpanded}
        onChange={() => setIsExpanded(prev => !prev)}
        sx={{
          bgcolor: "neutral.white",
          borderRadius: 8
        }}
      >
        <AccordionSummary
          indicator={
            <PlusSignOutlined
              sx={{
                fontSize: isExpanded ? 13 : 12,
                transition: "0.3s",
                transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)"
              }}
            />
          }
          slotProps={{
            button: {
              sx: {
                bgcolor: "neutral.white",
                px: 3,
                py: 1,
                borderRadius: 8
              }
            }
          }}
        >
          <Box
            sx={{
              bgcolor: getColorHex(talent.category),
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 8,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20
            }}
          />
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography level="body-md">{talent.label}</Typography>
            <Typography level="body-md" fontWeight={700}>
              {item.user_ids.length}
            </Typography>
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <Stack p={2} gap={4}>
            <Typography level="body-sm" fontSize={14} textColor="neutral.baseLighter">
              Domain: {talent.category}
            </Typography>

            <Grid container spacing={4}>
              {usersWithTalent.map(user => (
                <Grid key={user.id} xs={3}>
                  <UserAvatarInfo user={user} fontSize={12} hasMe={currentUser.id === user.id} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export const TeamTalents = ({ currentUser, users, talents, usersTalents, isLoading }: TeamTalentsProps) => {
  const columns = useMemo(() => {
    const usersTalentsBasedOnUsers = usersTalents.filter(element => users.some(user => element.user_id === user.id));
    const usersTalentsGrouped = Object.entries(
      usersTalentsBasedOnUsers.reduce(
        (acc, { talent_id, user_id }) => {
          (acc[talent_id] ||= []).push(user_id);
          return acc;
        },
        {} as Record<number, string[]>
      )
    )
      .sort(([, a], [, b]) => b.length - a.length)
      .map(([talent_id, user_ids]) => ({ talent_id: Number(talent_id), user_ids }));

    const midpoint = Math.ceil(usersTalentsGrouped.length / 2);
    const columns = [usersTalentsGrouped.slice(0, midpoint), usersTalentsGrouped.slice(midpoint)];
    return columns;
  }, [users, usersTalents]);

  return (
    <Stack gap={2.5}>
      <Stack gap={1.5}>
        <Typography level="title-lg" fontWeight={700}>
          The Team’s Top 10 Talents
        </Typography>

        <Typography level="title-md">Discover how many people have each of these talents in their top 10</Typography>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} gap={{ xs: 1.5, md: 4 }}>
        {columns.map((column, index) => (
          <Stack key={index} flex={1} gap={1.5}>
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton key={index} variant="rectangular" width="100%" sx={{ borderRadius: 8 }}>
                    <Button />
                  </Skeleton>
                ))
              : column.map(item => {
                  const talentInfo = talents.find(s => s.id === item.talent_id) as TalentModel;
                  return (
                    <AccordionItem
                      key={item.talent_id}
                      item={item}
                      currentUser={currentUser}
                      users={users}
                      talent={talentInfo || {}}
                    />
                  );
                })}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
