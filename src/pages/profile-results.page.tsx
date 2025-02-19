import { Button, Stack, Typography } from "@mui/joy";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContainer } from "../components/shared/main-container";
import { StrengthsCard } from "../components/shared/strengths-card";
import { UserAvatar } from "../components/shared/user-avatar";
import { AuthContext } from "../contexts/auth.context";
import { userTopStrengths } from "../utils/get-user-top-strengths";

const DashboardButton = () => (
  <Button component={Link} to="/personal" sx={{ width: { xs: "100%", lg: "auto" } }}>
    Go to dashboard
  </Button>
);
export const ProfileResultsPage = () => {
  const { user, strengths } = useContext(AuthContext);
  const { userTopStrengthsArray, userTopStrengthsPercentages } = userTopStrengths(user?.strengths, strengths);

  return (
    <MainContainer alignCenter sx={{ p: 2 }}>
      <Stack direction={{ xs: "column", lg: "row" }} justifyContent="center" gap={{ xs: 4, lg: 14 }}>
        <Stack maxWidth={440} gap={8} alignItems="center">
          <Stack alignItems="center" gap={3}>
            <Typography level="h1" fontFamily="Acta-Book" textAlign={{ xs: "center", lg: "start" }}>
              Your <Typography textColor="subvisual.primary">Strengths</Typography>, brought to life.
            </Typography>

            <Typography level="body-lg" textAlign={{ xs: "center", lg: "start" }}>
              Meet your personalized avatar—a reflection of your unique talents and abilities.
            </Typography>
          </Stack>

          <UserAvatar avatar={user.avatar} />

          <DashboardButton />
        </Stack>

        <StrengthsCard
          userTopStrengthsArray={userTopStrengthsArray}
          userTopStrengthsPercentages={userTopStrengthsPercentages}
        />
      </Stack>
    </MainContainer>
  );
};
