import { Stack } from "@mui/joy";
import { ReactNode } from "react";
import { Navbar } from "../navigation/navbar";
import { Sidebar } from "../navigation/sidebar";

type ContainerProps = {
  children: ReactNode;
  hasSideBar?: boolean;
};

export const Container = ({ children, hasSideBar }: ContainerProps) => {
  return (
    <Stack sx={{ flexDirection: "row" }}>
      {hasSideBar ? <Sidebar /> : null}
      <Stack sx={{ width: "100%" }}>
        <Navbar hasSubvisualIcon={hasSideBar ? false : true} />
        {children}
      </Stack>
    </Stack>
  );
};
