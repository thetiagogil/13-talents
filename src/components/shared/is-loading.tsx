import { CircularProgress, Stack } from "@mui/joy";

export const IsLoading = () => {
  return (
    <Stack flex={1} alignItems="center" p={2}>
      <CircularProgress />
    </Stack>
  );
};
