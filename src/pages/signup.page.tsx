import { Box, Button, Input, Link, Stack, Typography } from "@mui/joy";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/auth.context";

export const SignupPage = () => {
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoadingSubmit(true);
    await handleLogin(email);
    setIsLoadingSubmit(false);
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
          "linear-gradient(45deg, var(--joy-palette-subvisual-primaryDark), var(--joy-palette-subvisual-primary), var(--joy-palette-subvisual-primaryDark))"
      }}
    >
      <Stack width={{ xs: "100%", lg: "50%" }} justifyContent="center" alignItems={{ xs: "center", lg: "end" }}>
        <Stack alignItems={{ xs: "center", lg: "start" }} gap={{ xs: 2, lg: 1 }}>
          <Typography level="h1" textColor={"neutral.white"} textAlign="center">
            Subvisual Strengths
          </Typography>
          <Typography level="body-md" textColor="neutral.white" textAlign="center">
            Explore your top talents and how they shape your role in the team.
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
              <Typography level="h3" textColor="neutral.dark" fontFamily="Acta-Book">
                Welcome to Subvisual Strengths!
              </Typography>

              <Typography level="body-md" textColor="neutral.baseLighter">
                You are one step away from seeing your strengths coming to life.
              </Typography>
            </Stack>

            <Stack component="form" onSubmit={handleSubmit} gap={1.5}>
              <Input placeholder="Type your email here..." value={email} onChange={e => setEmail?.(e.target.value)} />
              <Button type="submit" loading={isLoadingSubmit} disabled={email.length === 0}>
                Continue
              </Button>
            </Stack>
          </Stack>

          <Typography level="body-md" textColor="neutral.baseLighter">
            By signing up you're agreeing to our{" "}
            <Box component="span" display={{ xs: "inline", lg: "block" }}>
              <Link underline="always">Terms of service</Link> & <Link underline="always">Privacy Policy</Link>.
            </Box>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
