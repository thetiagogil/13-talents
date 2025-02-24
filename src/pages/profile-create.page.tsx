import {
  Link as JoyLink,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Step,
  StepIndicator,
  Stepper,
  Typography
} from "@mui/joy";
import { useContext, useState } from "react";
import { useUpdateUserProfileAfterFirstLogin } from "../api/use-user.api";
import { ArrowRightOutlined } from "../assets/icons/arrow-right";
import { AvatarLoading } from "../components/sections/avatar-loading";
import { MainContainer } from "../components/shared/main-container";
import { UserAvatar } from "../components/shared/user-avatar";
import { AuthContext } from "../contexts/auth.context";
import { SnackbarContext } from "../contexts/snackbar.context";
import { USER_ROLES } from "../lib/constants";
import { UserModel } from "../models/user.model";
import { getColorHex } from "../utils/get-color-hex";
import { getColorTransparency } from "../utils/get-color-transparency";

const memojis = Array.from({ length: 35 }, (_, i) => `/public/memojis/memo_${i + 1}.png`);

export const ProfileCreatePage = () => {
  const { user } = useContext(AuthContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const [profile, setProfile] = useState<{
    selectedRole: UserModel["role"];
    selectedAvatar: UserModel["avatar"];
  }>({
    selectedRole: user.role,
    selectedAvatar: user.avatar
  });
  const [activeStep, setActiveStep] = useState<number>(0);
  const { mutateAsync: updateUserProfileAfterFirstLogin, isSuccess: isLoading } = useUpdateUserProfileAfterFirstLogin();

  const handleCreateProfile = async () => {
    try {
      if (!profile.selectedRole) return showSnackbar("danger", "You need to select a role.");
      if (!profile.selectedAvatar) return showSnackbar("danger", "You need to select an avatar.");
      await updateUserProfileAfterFirstLogin({
        userId: user.id,
        avatar: profile.selectedAvatar,
        role: profile.selectedRole
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainContainer alignCenter sx={{ p: 2 }}>
      {isLoading ? (
        <AvatarLoading avatar={profile.selectedAvatar} />
      ) : (
        <Stack width={{ xs: "100%", lg: 1120 }} gap={4}>
          <Stepper sx={{ width: "100%" }}>
            {[{ label: "Select Role" }, { label: "Select Avatar" }].map((step, index) => (
              <Step
                key={index}
                indicator={
                  <StepIndicator
                    variant={activeStep <= index ? "soft" : "solid"}
                    color={activeStep < index ? "neutral" : "primary"}
                  >
                    {index + 1}
                  </StepIndicator>
                }
                sx={[activeStep > index && index !== 1 && { "&::after": { bgcolor: "main.primaryDark" } }]}
              >
                {step.label}
              </Step>
            ))}
          </Stepper>

          <Stack maxWidth={720} alignItems="center" alignSelf="center" gap={4}>
            <Typography level="h1" textAlign="center" textColor="neutral.dark">
              Create Your Profile
            </Typography>
            <Typography level="body-md" textColor="neutral.dark">
              {activeStep === 0 && "First, let's select the role that best aligns with your responsibilities at work."}
              {activeStep === 1 && "Now, let's bring your avatar to life!"}
            </Typography>
          </Stack>

          {activeStep === 0 && (
            <List
              orientation="horizontal"
              sx={{ width: "100%", justifyContent: "center", flexDirection: { xs: "column", md: "row" }, p: 0, gap: 2 }}
            >
              {USER_ROLES.map((role, index) => (
                <ListItem key={index}>
                  <ListItemButton
                    onClick={() => setProfile(prev => ({ ...prev, selectedRole: role }))}
                    sx={{
                      bgcolor:
                        profile.selectedRole === role
                          ? getColorTransparency(getColorHex("primary"), 10)
                          : "transparent",
                      width: 160,
                      justifyContent: "center",
                      border: "1px solid",
                      borderColor: profile.selectedRole === role ? "main.primary" : "neutral.lighter",
                      borderRadius: 8
                    }}
                  >
                    {role}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}

          {activeStep === 1 && (
            <Stack width="100%" gap={4}>
              <UserAvatar avatar={profile.selectedAvatar} />

              <Stack bgcolor="neutral.white" overflow="auto">
                <List orientation="horizontal" sx={{ p: 2 }}>
                  {memojis.map((emojiSrc, index) => (
                    <ListItem key={index}>
                      <ListItemButton
                        onClick={() => setProfile(prev => ({ ...prev, selectedAvatar: emojiSrc }))}
                        sx={{
                          bgcolor: "neutral.lightest",
                          width: 120,
                          border: "2px solid",
                          borderColor: profile.selectedAvatar === emojiSrc ? "main.primary" : "neutral.lightest",
                          borderRadius: 8,
                          mr: 0.5
                        }}
                      >
                        <img src={emojiSrc} alt={`Memoji ${index + 1}`} style={{ height: "auto", width: "100%" }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </Stack>
          )}

          <Stack direction="row" justifyContent={activeStep === 0 ? "end" : "space-between"} alignItems="center">
            {activeStep === 1 && (
              <JoyLink
                onClick={() => setActiveStep(0)}
                underline="none"
                startDecorator={<ArrowRightOutlined sx={{ fontSize: 10, transform: "rotate(180deg)" }} />}
                textColor="neutral.black"
                gap={0.5}
              >
                Back
              </JoyLink>
            )}
            <JoyLink
              onClick={() => {
                if (activeStep === 0) {
                  if (!profile.selectedRole) {
                    return showSnackbar("danger", "You need to select a role.");
                  }
                  setActiveStep(1);
                } else {
                  handleCreateProfile();
                }
              }}
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
