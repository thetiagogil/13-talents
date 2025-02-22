import {
  Avatar,
  Box,
  Drawer,
  Dropdown,
  Grid,
  IconButton,
  Link as JoyLink,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Typography
} from "@mui/joy";
import { useContext, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { ArrowDownOutlined } from "../../assets/icons/arrow-down";
import { ArrowUpOutlined } from "../../assets/icons/arrow-up";
import { NotificationsOutlined } from "../../assets/icons/notifications-icon";
import { AuthContext } from "../../contexts/auth.context";
import { Sidebar } from "./sidebar";

type NavbarProps = {
  hasSideBar?: boolean;
};

export const Navbar = ({ hasSideBar }: NavbarProps) => {
  const { handleLogout, user } = useContext(AuthContext);
  const [isSidebarDrawerOpen, setisSidebarDrawerOpen] = useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);

  return (
    <Grid container height={80} p={2} pl={{ xs: "auto", lg: 3.5 }}>
      <Grid xs={6} display="flex" alignItems="center" justifyContent="start">
        {hasSideBar && (
          <Box display={{ xs: "flex", lg: "none" }} alignItems="center">
            <IconButton size="sm" onClick={() => setisSidebarDrawerOpen(true)}>
              MENU
            </IconButton>
            <Drawer open={isSidebarDrawerOpen} onClose={() => setisSidebarDrawerOpen(false)}>
              <Sidebar />
            </Drawer>
          </Box>
        )}

        {!hasSideBar && (
          <Box display={{ xs: "none", lg: "flex" }} alignItems="center">
            <JoyLink component={ReactLink} to="/profile-results">
              <img src="/favicon.png" style={{ height: 40 }} />
            </JoyLink>
          </Box>
        )}
      </Grid>

      <Grid xs={6} display="flex" alignItems="center" justifyContent="end" gap={1}>
        <IconButton size="sm" disabled sx={{ opacity: 0.5 }}>
          <NotificationsOutlined sx={{ fontSize: 18 }} />
        </IconButton>

        <Dropdown open={isProfileMenuOpen} onOpenChange={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
          <MenuButton variant="plain" size="sm">
            <Stack direction="row" alignItems="center" gap={1.5}>
              <Avatar
                alt={user.name}
                src={user.avatar || undefined}
                sx={{ border: "2px solid", borderColor: "main.primary" }}
              />
              <Typography level="body-md" display={{ xs: "none", lg: "inline" }}>
                {user?.name}
              </Typography>
              {isProfileMenuOpen ? (
                <ArrowUpOutlined sx={{ fontSize: 12 }} />
              ) : (
                <ArrowDownOutlined sx={{ fontSize: 12 }} />
              )}
            </Stack>
          </MenuButton>

          <Menu placement="bottom-end">
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Dropdown>
      </Grid>
    </Grid>
  );
};
