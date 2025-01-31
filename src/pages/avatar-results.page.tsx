import { Box, Button, Stack, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import { MockAvatar } from "../api/mock-avatar";
import { CardTopStrengths } from "../components/shared/card-top-strengths";
import { Layout } from "../components/shared/layout";

const DashboardButton = () => (
  <Button component={Link} to="/personal" sx={{ width: { xs: "100%", lg: "auto" } }}>
    Go to dashboard
  </Button>
);
export const AvatarResultsPage = () => {
  return (
    <Layout alignCenter sx={{ p: 2 }}>
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

          <MockAvatar sx={{ fontSize: 280 }} />

          <Box display={{ xs: "none", lg: "block" }}>
            <DashboardButton />
          </Box>
        </Stack>

        <CardTopStrengths />

        <Box display={{ xs: "block", lg: "none" }}>
          <DashboardButton />
        </Box>
      </Stack>
    </Layout>
  );
};
