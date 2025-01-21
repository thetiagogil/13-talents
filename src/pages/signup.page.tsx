import { Button, Link, Stack, Typography } from "@mui/joy";

export const SignupPage = () => {
  return (
    <Stack
      sx={{
        bgcolor: "subvisual.primary",
        height: { xs: "100%", lg: "100vh" },
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { xs: "center", lg: "stretch" }
      }}
    >
      <Stack
        sx={{ width: { xs: "90%", lg: "50%" }, justifyContent: "center", alignItems: { xs: "center", lg: "end" } }}
      >
        <Stack sx={{ m: 4, gap: 1 }}>
          <Typography sx={{ color: "white", fontSize: 56 }}>Subvisual Strengths</Typography>
          <Typography sx={{ color: "white" }}>
            Explore your top talents and how they shape your role in the team.
          </Typography>
        </Stack>
      </Stack>
      <Stack sx={{ width: { xs: "90%", lg: "50%" }, alignItems: { xs: "center", lg: "start" } }}>
        <Stack
          sx={{
            bgcolor: "white",
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
              <Typography sx={{ color: "subvisual.grey" }}>
                You are one step away from seeing your strengths coming to life.
              </Typography>
            </Stack>
            <Stack>
              <Button variant="outlined">google button</Button>
            </Stack>
          </Stack>
          <Stack>
            <Typography sx={{ color: "subvisual.grey" }}>By signing up you're agreeing to our</Typography>
            <Typography>
              <Link underline="always" sx={{ color: "black" }}>
                Terms of service
              </Link>{" "}
              &{" "}
              <Link underline="always" sx={{ color: "black" }}>
                Privacy Policy
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
