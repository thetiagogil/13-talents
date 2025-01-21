import { Avatar, Dropdown, IconButton, Menu, MenuButton, MenuItem, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import { ArrowDownOutlined } from "../../assets/icons/arrow-down";
import { ArrowUpOutlined } from "../../assets/icons/arrow-up";
import { NotificationsOutlined } from "../../assets/icons/notifications-icon";
import { SubvisualLogo } from "../../assets/icons/subvisual-logo";

type NavbarProps = {
  hasSubvisualIcon?: boolean;
};

export const Navbar = ({ hasSubvisualIcon }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: hasSubvisualIcon ? "space-between" : "end",
        alignItems: "center",
        py: 2,
        px: 4
      }}
    >
      {hasSubvisualIcon ? <SubvisualLogo sx={{ height: 48, width: 48 }} /> : null}
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
        <IconButton size="sm">
          <NotificationsOutlined sx={{ height: 18, width: 18 }} />
        </IconButton>
        <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ height: 48, width: 48 }} />
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
            <Typography>João</Typography>
            <Dropdown open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
              <MenuButton variant="plain" size="sm">
                {isOpen ? (
                  <ArrowUpOutlined sx={{ height: 12, width: 12 }} />
                ) : (
                  <ArrowDownOutlined sx={{ height: 12, width: 12 }} />
                )}
              </MenuButton>
              <Menu>
                <MenuItem>Test</MenuItem>
                <MenuItem>Test</MenuItem>
                <MenuItem>Test</MenuItem>
              </Menu>
            </Dropdown>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
