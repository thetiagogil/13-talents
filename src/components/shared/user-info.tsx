import { Stack, Typography } from "@mui/joy";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";

export const UserInfo = () => {
  const { user } = useContext(AuthContext);
  return (
    <Stack alignItems={{ xs: "center", lg: "start" }} gap={1}>
      <Typography level="title-lg" fontWeight={700}>
        {user?.name}
      </Typography>
      <Typography level="body-md" textColor="neutral.light">
        {user?.title}
      </Typography>
    </Stack>
  );
};
