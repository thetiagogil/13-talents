import { Link as JoyLink, List, ListItem, ListItemButton, Stack, Typography } from "@mui/joy";
import { useContext, useState } from "react";
import { useUpdateUserAvatarState } from "../api/use-user.api";
import { ArrowRightOutlined } from "../assets/icons/arrow-right";
import { AvatarLoading } from "../components/layout/avatar-loading";
import { MainContainer } from "../components/shared/main-container";
import { UserAvatar } from "../components/shared/user-avatar";
import { AuthContext } from "../contexts/auth.context";
import { SnackbarContext } from "../contexts/snackbar.context";

const memojis = Array.from({ length: 35 }, (_, i) => `/src/assets/memojis/memo_${i + 1}.png`);

export const AvatarCreatePage = () => {
  const { user } = useContext(AuthContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const [selectedMemoji, setSelectedMemoji] = useState<string>("");
  const { mutateAsync: updateUserAvatarState, isSuccess: isLoading } = useUpdateUserAvatarState();

  const handleCreateAvatar = async () => {
    try {
      if (!selectedMemoji) return showSnackbar("danger", "You need to select an avatar.");
      await updateUserAvatarState({ userId: user.id, avatar: selectedMemoji });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainContainer alignCenter sx={{ p: 2 }}>
      {isLoading ? (
        <AvatarLoading avatar={selectedMemoji} />
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

          <UserAvatar avatar={selectedMemoji} />

          <Stack bgcolor="neutral.white" overflow="auto">
            <List orientation="horizontal" sx={{ p: 2 }}>
              {memojis.map((emojiSrc, index) => (
                <ListItem key={index}>
                  <ListItemButton
                    onClick={() => setSelectedMemoji(emojiSrc)}
                    sx={{
                      bgcolor: "neutral.lightest",
                      width: 120,
                      border: "2px solid",
                      borderColor: selectedMemoji === emojiSrc ? "subvisual.primary" : "neutral.lightest",
                      borderRadius: 8,
                      mr: 0.5,
                      overflow: "auto"
                    }}
                  >
                    <img src={emojiSrc} alt={`Memoji ${index + 1}`} style={{ height: "auto", width: "100%" }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Stack>

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
    </MainContainer>
  );
};
