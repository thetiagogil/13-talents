import { CircularProgress, Stack, Typography } from "@mui/joy";
import { MockAvatar } from "../../api/mock-avatar";

export const AvatarLoading = () => {
  return (
    <Stack sx={{ alignItems: "center" }}>
      <Stack sx={{ bgcolor: "#038DEF", alignItems: "center", gap: 4, py: 12, px: 28, borderRadius: 32 }}>
        <Stack component="section">
          <Typography sx={{ fontSize: 48, color: "white" }}>Hang on, superhero.</Typography>
        </Stack>
        <Stack component="section">
          <CircularProgress variant="soft" />
        </Stack>
        <Stack component="section">
          <Typography sx={{ color: "white" }}>We’re putting the final touches on your Avatar’s powers.</Typography>
        </Stack>
        <Stack component="section">
          <MockAvatar sx={{ fontSize: 160 }} />
        </Stack>
      </Stack>
    </Stack>
  );
};
