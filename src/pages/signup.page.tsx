import { Button, Input, Link, Stack, Typography } from "@mui/joy";

export const SignupPage = () => {
  return (
    <Stack
      sx={{
        background:
          "linear-gradient(45deg, var(--joy-palette-subvisual-primaryDark), var(--joy-palette-subvisual-primary), var(--joy-palette-subvisual-primaryDark))",
        minHeight: "100vh",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { xs: "center", lg: "stretch" }
      }}
    >
      <Stack
        sx={{ width: { xs: "90%", lg: "50%" }, justifyContent: "center", alignItems: { xs: "center", lg: "end" } }}
      >
        <Stack sx={{ m: 4, gap: 1 }}>
          <Typography sx={{ color: "neutral.white", fontSize: 56 }}>Subvisual Strengths</Typography>
          <Typography sx={{ color: "neutral.white" }}>
            Explore your top talents and how they shape your role in the team.
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ width: { xs: "90%", lg: "50%" }, alignItems: { xs: "center", lg: "start" } }}>
        <Stack
          sx={{
            bgcolor: "neutral.white",
            height: "100%",
            m: 4,
            p: 8,
            pt: 40,
            gap: 16,
            borderRadius: 8
          }}
        >
          <Stack sx={{ gap: 4 }}>
            <Stack sx={{ gap: 1 }}>
              <Typography sx={{ fontSize: 32 }}>Welcome to Subvisual Strengths!</Typography>

              <Typography>You are one step away from seeing your strengths coming to life.</Typography>
            </Stack>

            <Stack gap={1.5}>
              <Input placeholder="Type your email here to enter..."></Input>
              <Button>Continue</Button>
            </Stack>
          </Stack>

          <Typography>
            By signing up you're agreeing to our <br />
            <Link
              component="span"
              underline="always"
              sx={{ color: "neutral.black", textDecorationColor: "neutral.black" }}
            >
              Terms of service
            </Link>{" "}
            &{" "}
            <Link
              component="span"
              underline="always"
              sx={{ color: "neutral.black", textDecorationColor: "neutral.black" }}
            >
              Privacy Policy
            </Link>
            .
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
