import { CircularProgress, Stack } from "@mui/joy";
import { SubvisualLogo } from "../assets/icons/subvisual-logo";

export const LoadingPage = () => (
  <Stack height="100vh" alignItems="center" justifyContent="center">
    <CircularProgress variant="plain" sx={{ "--CircularProgress-size": "200px" }}>
      <SubvisualLogo sx={{ fontSize: 80 }} />
    </CircularProgress>
  </Stack>
);
