import { Divider, Stack } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { ReactNode } from "react";
import { Navbar } from "../navigation/navbar";
import { Sidebar } from "../navigation/sidebar";

type LayoutProps = {
  children: ReactNode;
  hasSideBar?: boolean;
  alignCenter?: boolean;
  sx?: SxProps;
};

export const MainContainer = ({ children, hasSideBar = false, alignCenter = false, sx }: LayoutProps) => {
  const Children = () => (
    <Stack flex={1}>
      <Navbar hasSideBar={hasSideBar} />
      <Stack
        width={{ xs: "100%", lg: "auto" }}
        alignItems={alignCenter ? "center" : "baseline"}
        alignSelf={{ xs: "center", lg: "auto" }}
        sx={{ ...sx }}
      >
        {children}
      </Stack>
    </Stack>
  );

  return hasSideBar ? (
    <Stack direction="row">
      <Stack minHeight="100vh" display={{ xs: "none", lg: "flex" }} direction="row">
        <Sidebar />
        <Divider orientation="vertical" />
      </Stack>
      <Children />
    </Stack>
  ) : (
    <Children />
  );
};
