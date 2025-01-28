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
    <Stack flex={1}>
      <Navbar hasSubvisualIcon={hasSideBar ? false : true} />
      <Stack alignItems={alignCenter ? "center" : "baseline"}>{children}</Stack>
    </Stack>
  );

  return (
    <>
      {hasSideBar ? (
        <Stack direction="row">
          <Sidebar />
          <LayoutChildren />
        </Stack>
      ) : (
        <LayoutChildren />
      )}
    </>
  );
};
