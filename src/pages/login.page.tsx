import { Button, Divider, Input, Link, Stack, Typography } from "@mui/joy";
import { FormEvent, useContext, useState } from "react";
import { useGetUserByEmail } from "../api/use-user.api";
import { AuthContext } from "../contexts/auth.context";
import { SnackbarContext } from "../contexts/snackbar.context";

export const LoginPage = () => {
  const { handleLogin } = useContext(AuthContext);
  const { showSnackbar } = useContext(SnackbarContext);
  const [email, setEmail] = useState<string>("");
  const { isFetching: isLoading, refetch } = useGetUserByEmail(email);
  const { isFetching: isLoadingTestUser, refetch: refetchTestUser } = useGetUserByEmail("johndoe@talents.com");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (email.length <= 0) return showSnackbar("danger", "Please enter credentials.");
      const { data: user, error } = await refetch();
      if (error || !user) {
        showSnackbar("danger", "Invalid credentials.");
      } else {
        await handleLogin(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTestLogin = async () => {
    try {
      const { data: user, error } = await refetchTestUser();
      if (error || !user) {
        showSnackbar("danger", "Test user not found.");
      } else {
        await handleLogin(user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      minHeight="100vh"
      direction={{ xs: "column", lg: "row" }}
      alignItems={{ xs: "center", lg: "stretch" }}
      py={{ xs: 4, lg: 0 }}
      px={2}
      gap={{ xs: 4, lg: 8 }}
      sx={{
        background:
          "linear-gradient(45deg, var(--joy-palette-main-primaryDark), var(--joy-palette-main-primary), var(--joy-palette-main-primaryDark))"
      }}
    >
      <Stack width={{ xs: "100%", lg: "50%" }} justifyContent="center" alignItems={{ xs: "center", lg: "end" }}>
        <Stack alignItems={{ xs: "center", lg: "start" }} gap={{ xs: 2, lg: 1 }}>
          <Typography level="h1" textColor={"neutral.white"} textAlign="center">
            Talents
          </Typography>
          <Typography level="body-md" textColor="neutral.white" textAlign="center">
            Explore your top talents and how they shape your role in your team.
          </Typography>
        </Stack>
      </Stack>

      <Stack width={{ xs: "100%", lg: "50%" }} alignItems={{ xs: "center", lg: "start" }}>
        <Stack
          bgcolor="neutral.white"
          height="100%"
          my={{ xs: 0, lg: 4 }}
          p={{ xs: 4, lg: 8 }}
          pt={{ xs: "auto", lg: 40 }}
          gap={16}
          borderRadius={8}
        >
          <Stack gap={{ xs: 8, lg: 4 }}>
            <Stack gap={{ xs: 2, lg: 1 }}>
              <Typography level="h3" textColor="neutral.dark">
                Welcome to Talents!
              </Typography>

              <Typography level="body-md" textColor="neutral.baseLighter">
                You are one step away from seeing your talents coming to life.
              </Typography>
            </Stack>

            <Stack gap={2}>
              <Stack gap={1}>
                <Input placeholder="Type your email here..." value={email} onChange={e => setEmail(e.target.value)} />
                <Button variant="solid" onClick={handleSubmit} loading={isLoading}>
                  Continue
                </Button>
              </Stack>

              <Divider orientation="horizontal">
                <Typography level="body-md" textColor="neutral.baseLighter">
                  or
                </Typography>
              </Divider>

              <Button variant="outlined" onClick={handleTestLogin} loading={isLoadingTestUser}>
                Continue with test user
              </Button>
            </Stack>
          </Stack>

          <Typography level="body-md" fontStyle="italic">
            Built as part of the{" "}
            <Link href="https://subvisual.com/" target="_blank">
              Subvisual
            </Link>{" "}
            Apprenticeship.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
