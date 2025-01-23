import { Avatar, Dropdown, IconButton, Menu, MenuButton, MenuItem, Stack, Typography } from "@mui/joy";
import { useContext, useState } from "react";
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
      px={3}
      py={2}
    >
      {hasSubvisualIcon && <SubvisualLogo sx={{ fontSize: 48 }} />}
      <Stack direction="row" alignItems="center" gap={2}>
        <IconButton size="sm">
          <NotificationsOutlined sx={{ fontSize: 18 }} />
        </IconButton>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Avatar sx={{ fontSize: 48, border: "2px solid", borderColor: "subvisual.pink" }} />
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography level="body-md">{user?.name}</Typography>
            <Dropdown open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
              <MenuButton variant="plain" size="sm">
                {isOpen ? <ArrowUpOutlined sx={{ fontSize: 12 }} /> : <ArrowDownOutlined sx={{ fontSize: 12 }} />}
              </MenuButton>
              <Menu>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Dropdown>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
