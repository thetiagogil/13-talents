import { Box } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { ElementType, ReactNode } from "react";

type FlexboxProps = {
  children?: ReactNode;
  component?: ElementType;
  sx?: SxProps;
  x?: boolean;
  y?: boolean;
  xs?: boolean;
  xc?: boolean;
  xe?: boolean;
  ys?: boolean;
  yc?: boolean;
  ye?: boolean;
  xsb?: boolean;
  ysb?: boolean;
  xsa?: boolean;
  ysa?: boolean;
  gap?: number;
  fullheight?: boolean;
  fullwidth?: boolean;
  wrap?: boolean;
  pointer?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
};

export const Flexbox = ({
  children,
  component = "div",
  sx,
  x,
  y,
  xs,
  xc,
  xe,
  ys,
  yc,
  ye,
  xsb,
  ysb,
  gap,
  xsa,
  ysa,
  fullheight,
  fullwidth,
  wrap,
  pointer,
  mobile,
  tablet,
  desktop
}: FlexboxProps) => {
  // Responsive display behavior based on props specified
  // If none of the props are specified, the component is visible on all breakpoints
  const display =
    mobile || tablet || desktop
      ? {
          xs: mobile ? "flex" : "none",
          sm: tablet ? "flex" : "none",
          md: desktop ? "flex" : "none"
        }
      : "flex";

  // Flexbox general styles
  const styles: SxProps = {
    display,
    ...(x && { flexDirection: "row" }),
    ...(y && { flexDirection: "column" }),
    ...(xs && { [x ? "justifyContent" : "alignItems"]: "flex-start" }),
    ...(xc && { [x ? "justifyContent" : "alignItems"]: "center" }),
    ...(xe && { [x ? "justifyContent" : "alignItems"]: "flex-end" }),
    ...(xsb && { [x ? "justifyContent" : "alignItems"]: "space-between" }),
    ...(xsa && { [x ? "justifyContent" : "alignItems"]: "space-around" }),
    ...(ys && { [y ? "justifyContent" : "alignItems"]: "flex-start" }),
    ...(yc && { [y ? "justifyContent" : "alignItems"]: "center" }),
    ...(ye && { [y ? "justifyContent" : "alignItems"]: "flex-end" }),
    ...(ysb && { [y ? "justifyContent" : "alignItems"]: "space-between" }),
    ...(ysa && { [y ? "justifyContent" : "alignItems"]: "space-around" }),
    ...(gap && { gap }),
    ...(fullheight && { height: "100%" }),
    ...(fullwidth && { width: "100%" }),
    ...(wrap && { flexWrap: "wrap" }),
    ...(pointer && { cursor: "pointer" })
  };

  return (
    <Box component={component} sx={{ ...styles, ...sx }}>
      {children}
    </Box>
  );
};
