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
    <Stack minHeight="100vh" display={{ xs: "none", lg: "flex" }} direction="row">
      <Stack justifyContent="space-between" p={2}>
        <Stack alignItems="center" gap={10}>
          <JoyLink component={ReactLink} to="/">
            <SubvisualLogo sx={{ fontSize: 40 }} />
          </JoyLink>

          <Stack alignItems="center" gap={2}>
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
                  alignItems="center"
                  gap={1}
                >
                  <IconButton variant="plain" size="lg" sx={{ width: "100%", p: 1 }}>
                    <Stack alignItems="center" gap={1}>
                      {isSelected ? item.iconSelected : item.icon}
                      <Typography level="body-sm" sx={{ ...(isSelected && sidebarItemColor(true)) }}>
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
