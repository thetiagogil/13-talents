import { Avatar, Dropdown, IconButton, Link as JoyLink, Menu, MenuButton, MenuItem, Stack, Typography } from "@mui/joy";
import { useContext, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import { ArrowDownOutlined } from "../../assets/icons/arrow-down";
import { ArrowUpOutlined } from "../../assets/icons/arrow-up";
import { NotificationsOutlined } from "../../assets/icons/notifications-icon";
import { SubvisualLogo } from "../../assets/icons/subvisual-logo";
import { AuthContext } from "../../contexts/auth.context";

type NavbarProps = {
  hasSubvisualIcon?: boolean;
};

export const Navbar = ({ hasSubvisualIcon }: NavbarProps) => {
  const { handleLogout, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Stack
      direction="row"
      justifyContent={hasSubvisualIcon ? "space-between" : "end"}
      alignItems="center"
      p={2}
      pl={3.5}
    >
      {hasSubvisualIcon && (
        <JoyLink component={ReactLink} to="/">
          <SubvisualLogo sx={{ fontSize: 40 }} />
        </JoyLink>
      )}
      <Stack direction="row" alignItems="center" gap={1}>
        <IconButton size="sm" disabled>
          <NotificationsOutlined sx={{ fontSize: 18 }} />
        </IconButton>

        <Avatar sx={{ fontSize: 48, border: "2px solid", borderColor: "subvisual.pink" }} />

        <Dropdown open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <MenuButton variant="plain" size="sm">
            <Stack direction="row" alignItems="center" gap={1.5}>
              <Typography level="body-md">{user?.name}</Typography>
              {isOpen ? <ArrowUpOutlined sx={{ fontSize: 12 }} /> : <ArrowDownOutlined sx={{ fontSize: 12 }} />}
            </Stack>
          </MenuButton>
          <Menu>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Dropdown>
      </Stack>
    </Stack>
  );
};
