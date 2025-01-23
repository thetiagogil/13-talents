import { CircularProgress, Stack, Typography } from "@mui/joy";
import { MockAvatar } from "../../api/mock-avatar";
import { colors } from "../../utils/colors";

export const AvatarLoading = () => {
  return (
    <Stack alignItems="center">
      <Stack bgcolor={colors.background.avatarLoading} alignItems="center" px={28} py={12} borderRadius={32} gap={4}>
        <Stack>
          <Typography level="h1" textColor="neutral.white">
            Hang on, superhero.
          </Typography>
        </Stack>

        <Stack>
          <CircularProgress variant="soft" />
        </Stack>

        <Stack>
          <Typography level="body-md" textColor="neutral.white">
            We’re putting the final touches on your Avatar’s powers.
          </Typography>
        </Stack>

        <Stack>
          <MockAvatar sx={{ fontSize: 160 }} />
        </Stack>
      </Stack>
    </Stack>
  );
};
