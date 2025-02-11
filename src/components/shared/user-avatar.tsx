import { Skeleton, Stack } from "@mui/joy";
import { UserModel } from "../../models/user.model";

type UserAvatarProps = {
  avatar: UserModel["avatar"];
};

export const UserAvatar = ({ avatar }: UserAvatarProps) => {
  return (
    <Stack alignItems="center">
      {!avatar ? (
        <Skeleton variant="rectangular" height={320} width={320} sx={{ borderRadius: "50%" }} />
      ) : (
        <img src={avatar} alt={avatar} style={{ height: 320, width: "auto" }} />
      )}
    </Stack>
  );
};
