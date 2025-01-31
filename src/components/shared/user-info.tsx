import { Avatar, Stack, Typography } from "@mui/joy";
import { UserModel } from "../../models/user.model";

type UserInfoProps = {
  user: UserModel;
  fontSize: number;
  withAvatar?: boolean;
  isRow?: boolean;
  hasMe?: boolean;
};

export const UserInfo = ({ user, fontSize = 16, withAvatar = false, isRow = false, hasMe = false }: UserInfoProps) => (
  <Stack direction={isRow ? "row" : "column"} alignItems="center" gap={1}>
    {withAvatar && <Avatar size="lg" alt={user.name} />}
    <Stack
      alignItems={withAvatar ? (isRow ? "start" : "center") : { xs: "center", lg: "start" }}
      textAlign="center"
      gap={withAvatar ? 0.5 : 1}
    >
      <Typography fontSize={fontSize} fontWeight={700}>
        {user.name} {withAvatar && hasMe && "(me)"}
      </Typography>
      <Typography textColor="neutral.light" fontSize={withAvatar ? fontSize : fontSize - 4}>
        {user.title}
      </Typography>
    </Stack>
  </Stack>
);
