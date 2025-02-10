import { Stack, Typography } from "@mui/joy";
import { UserModel } from "../../models/user.model";

type UserInfoProps = {
  user: UserModel;
};

export const UserInfo = ({ user }: UserInfoProps) => (
  <Stack alignItems={{ xs: "center", lg: "start" }} gap={1}>
    <Typography level="title-lg" fontWeight={700}>
      {user?.name}
    </Typography>
    <Typography level="body-md" textColor="neutral.light">
      {user?.title}
    </Typography>
  </Stack>
);
