import { Avatar, Stack, Typography } from "@mui/joy";
import { UserModel } from "../../models/user.model";

type UserProfileInfoprops = {
  user: UserModel;
};

type UserInfoProps = {
  user: UserModel;
  fontSize: number;
  isRow?: boolean;
  hasMe?: boolean;
};

export const UserProfileInfo = ({ user }: UserProfileInfoprops) => (
  <Stack alignItems={{ xs: "center", lg: "start" }} gap={1}>
    <Typography level="title-lg" fontWeight={700}>
      {user?.name}
    </Typography>
    <Typography level="body-md" textColor="neutral.light">
      {user?.title}
    </Typography>
  </Stack>
);

export const UserAvatarInfo = ({ user, fontSize, isRow = false, hasMe = false }: UserInfoProps) => (
  <Stack direction={isRow ? "row" : "column"} alignItems="center" gap={1}>
    <Avatar size="lg" alt={user.name} />
    <Stack alignItems={isRow ? "start" : "center"} textAlign="center" gap={0.5}>
      <Typography fontSize={fontSize} fontWeight={700}>
        {user.name} {hasMe && "(me)"}
      </Typography>
      <Typography textColor="neutral.light" fontSize={fontSize}>
        {user.title}
      </Typography>
    </Stack>
  </Stack>
);
