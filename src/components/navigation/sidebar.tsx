import { Divider, IconButton, Link as JoyLink, Stack, Typography } from "@mui/joy";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { LearnFilled, LearnOutlined } from "../../assets/icons/learn-icon";
import { PersonalFilled, PersonalOutlined } from "../../assets/icons/personal-icon";
import { SubvisualLogo } from "../../assets/icons/subvisual-logo";
import { TeamFilled, TeamOutlined } from "../../assets/icons/team-icon";

export const Sidebar = () => {
  const { pathname } = useLocation();

  const itemStyle = { fontSize: 28 };
  const itemColor = (isSelected: boolean) =>
    isSelected ? { color: "subvisual.primary" } : { color: "subvisual.grey" };

  const sidebarItems = [
    {
      name: "Personal",
      path: "/personal",
      icon: <PersonalOutlined sx={{ ...itemStyle, ...itemColor(false) }} />,
      iconSelected: <PersonalFilled sx={{ ...itemStyle, ...itemColor(true) }} />
    },
    {
      name: "Team",
      path: "/team",
      icon: <TeamOutlined sx={{ ...itemStyle, ...itemColor(false) }} />,
      iconSelected: <TeamFilled sx={{ ...itemStyle, ...itemColor(true) }} />
    },
    {
      name: "Learn",
      path: "/learn",
      icon: <LearnOutlined sx={{ ...itemStyle, ...itemColor(false) }} />,
      iconSelected: <LearnFilled sx={{ ...itemStyle, ...itemColor(true) }} />
    }
  ] as const;

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
                      <Typography sx={{ ...(isSelected && itemColor(true)), fontSize: 12 }}>{item.name}</Typography>
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
