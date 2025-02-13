import { IconButton, Link as JoyLink, Stack, Typography } from "@mui/joy";
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
    iconSelected: <PersonalFilled sx={{ ...sidebarItemStyle, ...sidebarItemColor(true) }} />,
    disabled: false
  },
  {
    name: "Team",
    path: "/team",
    icon: <TeamOutlined sx={{ ...sidebarItemStyle, ...sidebarItemColor(false) }} />,
    iconSelected: <TeamFilled sx={{ ...sidebarItemStyle, ...sidebarItemColor(true) }} />,
    disabled: false
  },
  {
    name: "Learn",
    path: "/learn",
    icon: <LearnOutlined sx={{ ...sidebarItemStyle, ...sidebarItemColor(false) }} />,
    iconSelected: <LearnFilled sx={{ ...sidebarItemStyle, ...sidebarItemColor(true) }} />,
    disabled: true
  }
] as const;

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <Stack alignItems="center" gap={{ xs: 0, lg: 8 }}>
      <Stack height={80} width="100%" justifyContent="center" alignItems="center">
        <JoyLink component={ReactLink} to="/profile-results">
          <SubvisualLogo sx={{ fontSize: 40 }} />
        </JoyLink>
      </Stack>

      <Stack width="100%" p={2} gap={2}>
        {sidebarItems.map(item => {
          const isSelected = pathname === item.path;
          return (
            <JoyLink
              key={item.name}
              underline="none"
              disabled={item.disabled}
              component={ReactLink}
              to={item.path}
              width="100%"
              gap={1}
              sx={{ opacity: item.disabled ? 0.5 : 1 }}
            >
              <IconButton
                variant="plain"
                size="lg"
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "row", lg: "column " },
                  justifyContent: "start",
                  alignItems: "center",
                  p: 1,
                  gap: 1
                }}
              >
                {isSelected ? item.iconSelected : item.icon}
                <Typography level="body-sm" sx={{ ...(isSelected && sidebarItemColor(true)) }}>
                  {item.name}
                </Typography>
              </IconButton>
            </JoyLink>
          );
        })}
      </Stack>
    </Stack>
  );
};
