import { CircularProgress, Stack } from "@mui/joy";

export const LoadingPage = () => (
  <Stack height="100vh" alignItems="center" justifyContent="center">
    <CircularProgress variant="plain" sx={{ "--CircularProgress-size": "200px" }}>
      <img src="/favicon.png" style={{ height: 80 }} />
    </CircularProgress>
  </Stack>
);
