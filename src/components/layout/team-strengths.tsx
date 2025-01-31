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
import { useState } from "react";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";
import { StrengthModel } from "../../models/strength.model";
import { UserModel } from "../../models/user.model";
import { UsersStrengthsModel } from "../../models/users-strengths.model";
import { getColorHex } from "../../utils/get-color-hex";
import { UserInfo } from "../shared/user-info";

type AccordionItemProps = {
  item: { strength_id: number; user_ids: string[] };
  users: UserModel[];
  strength: StrengthModel;
};

type TeamStrengthsProps = {
  users: UserModel[];
  strengths: StrengthModel[];
  usersStrengths: UsersStrengthsModel[];
  isLoading: boolean;
};

const AccordionItem = ({ item, users, strength }: AccordionItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const usersWithStrength = users.filter(user => item.user_ids.some(userId => user.id === userId));

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
                fontSize: 12,
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
              bgcolor: getColorHex(strength.category),
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
            <Typography level="body-md">{strength.label}</Typography>
            <Typography level="body-md" fontWeight={700}>
              {item.user_ids.length}
            </Typography>
          </Stack>
        </AccordionSummary>

        <AccordionDetails>
          <Stack p={2} gap={4}>
            <Typography level="body-sm" fontSize={14} textColor="neutral.baseLighter">
              Domain: {strength.category}
            </Typography>

            <Grid container spacing={4}>
              {usersWithStrength.map(user => (
                <Grid key={user.id} xs={3}>
                  <UserInfo user={user} fontSize={12} withAvatar />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export const TeamStrengths = ({ users, strengths, usersStrengths, isLoading }: TeamStrengthsProps) => {
  const usersStrengthsGrouped = Object.entries(
    usersStrengths.reduce(
      (acc, { strength_id, user_id }) => {
        (acc[strength_id] ||= []).push(user_id);
        return acc;
      },
      {} as Record<number, string[]>
    )
  )
    .sort(([, a], [, b]) => b.length - a.length)
    .map(([strength_id, user_ids]) => ({ strength_id: Number(strength_id), user_ids }));

  const midpoint = Math.ceil(usersStrengthsGrouped.length / 2);
  const columns = [usersStrengthsGrouped.slice(0, midpoint), usersStrengthsGrouped.slice(midpoint)];

  return (
    <Stack gap={2.5}>
      <Typography level="title-lg" fontWeight={700}>
        Team's Domains
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} gap={{ xs: 1.5, md: 4 }}>
        {columns.map((column, index) => (
          <Stack key={index} flex={1} gap={1.5}>
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton key={index} variant="rectangular" width="100%" sx={{ borderRadius: 8 }}>
                    <Button></Button>
                  </Skeleton>
                ))
              : column.map(item => {
                  const strengthInfo = strengths.find(s => s.id === item.strength_id) as StrengthModel;
                  return (
                    <AccordionItem key={item.strength_id} item={item} users={users} strength={strengthInfo || {}} />
                  );
                })}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
