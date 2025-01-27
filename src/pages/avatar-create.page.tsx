import { Link as JoyLink, Stack, Typography } from "@mui/joy";
import { useContext, useState } from "react";
import { MockAvatar } from "../api/mock-avatar";
import { ArrowRightOutlined } from "../assets/icons/arrow-right";
import { AvatarLoading } from "../components/layout/avatar-loading";
import { Layout } from "../components/shared/layout";
import { AuthContext } from "../contexts/auth.context";

export const AvatarCreatePage = () => {
  const { handleHasAvatar } = useContext(AuthContext);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false);

  const handleCreateAvatar = async () => {
    setIsLoadingAvatar(true);
    try {
      await handleHasAvatar();
    } catch (error) {
      console.error("Failed to create avatar:", error);
    } finally {
      setIsLoadingAvatar(false);
    }
  };

  return (
    <Layout alignCenter sx={{ p: 2 }}>
      {isLoadingAvatar ? (
        <AvatarLoading />
      ) : (
        <Stack maxWidth={1120} gap={4}>
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

          <Stack bgcolor="neutral.white" height={120} alignItems="center" borderRadius={8}></Stack>

          <Stack alignItems="end">
            <JoyLink
              onClick={handleCreateAvatar}
              underline="none"
              endDecorator={<ArrowRightOutlined sx={{ fontSize: 10 }} />}
              textColor="neutral.black"
              gap={0.5}
            >
              Next
            </JoyLink>
          </Stack>
        </Stack>
      )}
    </Layout>
  );
};
