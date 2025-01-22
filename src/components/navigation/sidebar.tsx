import { Divider, IconButton, Link as JoyLink, Stack, Typography } from "@mui/joy";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { LearnFilled, LearnOutlined } from "../../assets/icons/learn-icon";
import { PersonalFilled, PersonalOutlined } from "../../assets/icons/personal-icon";
import { SubvisualLogo } from "../../assets/icons/subvisual-logo";
import { TeamFilled, TeamOutlined } from "../../assets/icons/team-icon";

const sidebarItemStyle = { fontSize: 28 };
const sidebarItemColor = (isSelected: boolean) =>
  isSelected ? { color: "subvisual.primary" } : { color: "subvisual.grey" };
const sidebarItems = [
  {
    name: "Personal",
    path: "/personal",
    icon: <PersonalOutlined sx={{ ...sidebarItemStyle, ...sidebarItemColor(false) }} />,
    iconSelected: <PersonalFilled sx={{ ...sidebarItemStyle, ...sidebarItemColor(true) }} />
  },
  {
    name: "Team",
    path: "/team",
    icon: <TeamOutlined sx={{ ...sidebarItemStyle, ...sidebarItemColor(false) }} />,
    iconSelected: <TeamFilled sx={{ ...sidebarItemStyle, ...sidebarItemColor(true) }} />
  },
  {
    name: "Learn",
    path: "/learn",
    icon: <LearnOutlined sx={{ ...sidebarItemStyle, ...sidebarItemColor(false) }} />,
    iconSelected: <LearnFilled sx={{ ...sidebarItemStyle, ...sidebarItemColor(true) }} />
  }
] as const;

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <Stack sx={{ display: { xs: "none", lg: "flex" }, height: "100vh", flexDirection: "row" }}>
      <Stack
        sx={{
          justifyContent: "space-between",
          p: 2
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
            {sidebarItems.map(item => {
              const isSelected = pathname === item.path;
              return (
                <JoyLink
                  key={item.name}
                  underline="none"
                  component={ReactLink}
                  to={item.path}
                  sx={{ width: "100%", alignItems: "center", gap: 1 }}
                >
                  <IconButton variant="plain" size="lg" sx={{ width: "100%", p: 1 }}>
                    <Stack sx={{ alignItems: "center", gap: 1 }}>
                      {isSelected ? item.iconSelected : item.icon}
                      <Typography sx={{ ...(isSelected && sidebarItemColor(true)), fontSize: 12 }}>
                        {item.name}
                      </Typography>
                    </Stack>
                  </IconButton>
                </JoyLink>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
      <Divider orientation="vertical" />
    </Stack>
  );
};
