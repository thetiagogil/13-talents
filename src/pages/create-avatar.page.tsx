import { Link as JoyLink, Stack, Typography } from "@mui/joy";
import { Link as ReactLink } from "react-router-dom";
import { ArrowRightOutlined } from "../assets/icons/arrow-right";
import { Layout } from "../components/shared/containers";

export const CreateAvatarPage = () => {
  return (
    <Layout>
      <Stack sx={{ alignItems: "center" }}>
        <Stack sx={{ maxWidth: 1136, gap: 4 }}>
          <Stack component="section" sx={{ maxWidth: 784, alignItems: "center", gap: 4 }}>
            <Typography sx={{ fontSize: 48, textAlign: "center" }}>
              Your Strength-Based Avatar is Almost Ready!
            </Typography>
            <Typography>Now, let's customize the core features to bring your Avatar to life.</Typography>
          </Stack>
          <Stack component="section" sx={{ alignItems: "center" }}>
            *avatar showcase box*
          </Stack>
          <Stack component="section" sx={{ alignItems: "center" }}>
            *avatar creation box*
          </Stack>
          <Stack component="section" sx={{ alignItems: "end" }}>
            <JoyLink
              component={ReactLink}
              to="/avatar-results"
              underline="none"
              endDecorator={<ArrowRightOutlined sx={{ fontSize: 10 }} />}
              sx={{
                color: "black",
                gap: 0.5
              }}
            >
              Next
            </JoyLink>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  );
};
