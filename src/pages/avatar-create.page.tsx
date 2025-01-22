import { Link as JoyLink, Stack, Typography } from "@mui/joy";
import { Link as ReactLink } from "react-router-dom";
import { MockAvatar } from "../api/mock-avatar";
import { ArrowRightOutlined } from "../assets/icons/arrow-right";

export const AvatarCreatePage = () => {
  return (
    <Stack alignItems="center">
      <Stack minHeight="100vh" width={1120} justifyContent="space-between" py={10} gap={4}>
        <Stack maxWidth={720} alignItems="center" alignSelf="center" gap={4}>
          <Typography level="h1" textAlign="center" textColor="neutral.dark">
            Your Strength-Based Avatar is Almost Ready!
          </Typography>

          <Typography level="body-md" textColor="neutral.dark">
            Now, let's customize the core features to bring your Avatar to life.
          </Typography>
        </Stack>

        <Stack alignItems="center">
          <MockAvatar sx={{ fontSize: 280 }} />
        </Stack>

        <Stack bgcolor="neutral.white" height={128} alignItems="center" borderRadius={8}></Stack>

        <Stack alignItems="end">
          <JoyLink
            component={ReactLink}
            to="/avatar-results"
            underline="none"
            endDecorator={<ArrowRightOutlined sx={{ fontSize: 10 }} />}
            textColor="neutral.black"
            gap={0.5}
          >
            Next
          </JoyLink>
        </Stack>
      </Stack>
    </Stack>
  );
};
