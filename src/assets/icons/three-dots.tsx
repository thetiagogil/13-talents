import { SvgIcon, SvgIconProps } from "@mui/joy";

export const ThreeDots = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="7" viewBox="0 0 27 7" fill="none">
        <circle cx="3.5" cy="3.5" r="3" fill="#48494F" />
        <circle cx="13.5" cy="3.5" r="3" fill="#48494F" />
        <circle cx="23.5" cy="3.5" r="3" fill="#48494F" />
      </svg>
    </SvgIcon>
  );
};
