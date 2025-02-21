import { CircularProgress, Stack, Typography } from "@mui/joy";
import { UserModel } from "../../models/user.model";
import { colors } from "../../theme/colors";
import { UserAvatar } from "../shared/user-avatar";

type AvatarLoadingProps = {
  avatar: UserModel["avatar"];
};

export const AvatarLoading = ({ avatar }: AvatarLoadingProps) => (
  <Stack
    bgcolor={colors.background.avatarLoading}
    alignItems="center"
    px={{ xs: 4, lg: 28 }}
    py={{ xs: 8, lg: 12 }}
    borderRadius={32}
    gap={4}
  >
    <Typography level="h1" textColor="neutral.white" textAlign="center">
      Hang on, superhero.
    </Typography>

    <CircularProgress variant="soft" />

    <Typography level="body-md" textColor="neutral.white" textAlign="center">
      We’re putting the final touches on your Avatar’s powers.
    </Typography>

    <UserAvatar avatar={avatar} />
  </Stack>
);
