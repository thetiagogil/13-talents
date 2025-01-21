import { Button, IconButton, Stack, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import { MockAvatar } from "../api/mock-avatar";
import { ArrowRotateOutlined } from "../assets/icons/arrow-rotate";
import { AvatarLoading } from "../components/layout/avatar-loading";
import { CardTopStrengths } from "../components/layout/card-top-strengths";
import { Layout } from "../components/shared/containers";

export const AvatarResultsPage = () => {
  let loading = false; // mock loading

  return (
    <Layout>
      {loading ? (
        <AvatarLoading />
      ) : (
        <Stack sx={{ justifyContent: "center", flexDirection: "row", gap: 14 }}>
          <Stack sx={{ maxWidth: 480 }}>
            <Stack sx={{ alignItems: " center", gap: 7 }}>
              <Stack sx={{ alignItems: " center", gap: 3 }}>
                <Typography sx={{ fontSize: 48, fontFamily: "Acta-Book" }}>
                  Your <Typography sx={{ color: "subvisual.primary", fontFamily: "inherit" }}>Strengths</Typography>,
                  brought to life.
                </Typography>

                <Typography sx={{ fontSize: 20 }}>
                  Meet your personalized avatar—a reflection of your unique talents and abilities.
                </Typography>
              </Stack>

              <Stack sx={{ alignItems: " center", gap: 4 }}>
                <MockAvatar sx={{ fontSize: 280 }} />

                <IconButton>
                  <ArrowRotateOutlined sx={{ fontSize: 16 }} />
                </IconButton>

                <Button component={Link} to="/avatar-results">
                  Go to dashboard
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <CardTopStrengths />
        </Stack>
      )}
    </Layout>
  );
};
