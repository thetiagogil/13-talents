import { Button, IconButton, Stack, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import { MockAvatar } from "../api/mock-avatar";
import { ArrowRotateOutlined } from "../assets/icons/arrow-rotate";
import { CardTopStrengths } from "../components/layout/card-top-strengths";
import { Layout } from "../components/shared/containers";

export const AvatarResultsPage = () => {
  return (
    <Layout alignCenter>
      <Stack direction="row" justifyContent="center" gap={14}>
        <Stack maxWidth={480}>
          <Stack alignItems="center" gap={7}>
            <Stack alignItems="center" gap={3}>
              <Typography level="h1" fontFamily="Acta-Book">
                Your <Typography textColor="subvisual.primary">Strengths</Typography>, brought to life.
              </Typography>

              <Typography level="body-lg">
                Meet your personalized avatar—a reflection of your unique talents and abilities.
              </Typography>
            </Stack>

            <Stack alignItems="center" gap={4}>
              <MockAvatar sx={{ fontSize: 280 }} />
              <IconButton>
                <ArrowRotateOutlined sx={{ fontSize: 16 }} />
              </IconButton>
              <Button component={Link} to="/personal">
                Go to dashboard
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <CardTopStrengths />
      </Stack>
    </Layout>
  );
};
