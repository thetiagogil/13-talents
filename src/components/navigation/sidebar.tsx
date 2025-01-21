import { IconButton, Stack, Typography } from "@mui/joy";
import { useLocation } from "react-router-dom";
import { LearnFilled, LearnOutlined } from "../../assets/icons/learn-icon";
import { PersonalFilled, PersonalOutlined } from "../../assets/icons/personal-icon";
import { SubvisualLogo } from "../../assets/icons/subvisual-logo";
import { TeamFilled, TeamOutlined } from "../../assets/icons/team-icon";

export const Sidebar = () => {
  const { pathname } = useLocation();
  const iconStyle = { fontSize: 32 };
  const sidebarItems = [
    {
      name: "Personal",
      icon: <PersonalOutlined sx={iconStyle} />,
      iconSelected: <PersonalFilled sx={iconStyle} />
    },
    { name: "Team", icon: <TeamOutlined sx={iconStyle} />, iconSelected: <TeamFilled sx={iconStyle} /> },
    { name: "Learn", icon: <LearnOutlined sx={iconStyle} />, iconSelected: <LearnFilled sx={iconStyle} /> }
  ] as { name: string; icon: JSX.Element; iconSelected: JSX.Element }[];

  return (
    <Stack
      sx={{
        maxWidth: 116,
        justifyContent: "space-between",
        py: 2,
        px: 4
      }}
    >
      <Stack
        sx={{
          alignItems: "center",
          gap: 10
        }}
      >
        <SubvisualLogo sx={{ fontSize: 48 }} />
        <Stack sx={{ alignItems: "center", gap: 2 }}>
          {sidebarItems.map(item => (
            <Stack key={item.name} sx={{ alignItems: "center", gap: 1 }}>
              <IconButton size="lg">{pathname === item.name.toLowerCase() ? item.iconSelected : item.icon}</IconButton>
              <Typography sx={{ fontSize: 12 }}>{item.name}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
