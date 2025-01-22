import { Stack } from "@mui/joy";
import { ReactNode } from "react";
import { Navbar } from "../navigation/navbar";
import { Sidebar } from "../navigation/sidebar";

type LayoutProps = {
  children: ReactNode;
  hasSideBar?: boolean;
  alignCenter?: boolean;
};

export const Layout = ({ children, hasSideBar = false, alignCenter = false }: LayoutProps) => {
  const LayoutChildren = () => (
    <Stack sx={{ flex: 1 }}>
      <Navbar hasSubvisualIcon />
      <Stack sx={{ ...(alignCenter && { alignItems: "center" }) }}>{children}</Stack>
    </Stack>
  );

  return (
    <>
      {hasSideBar ? (
        <Stack sx={{ flexDirection: "row" }}>
          <Sidebar />
          <LayoutChildren />
        </Stack>
      ) : (
        <LayoutChildren />
      )}
    </>
  );
};
