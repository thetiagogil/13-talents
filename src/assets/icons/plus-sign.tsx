import { SvgIcon, SvgIconProps } from "@mui/joy";

export const PlusSignOutlined = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M11.4857 5.48571H6.51429V0.514286C6.51429 0.230254 6.28403 0 6 0C5.71597 0 5.48571 0.230254 5.48571 0.514286V5.48571H0.514286C0.230254 5.48571 0 5.71597 0 6C0 6.28403 0.230254 6.51429 0.514286 6.51429H5.48571V11.4857C5.48571 11.7697 5.71597 12 6 12C6.28403 12 6.51429 11.7697 6.51429 11.4857V6.51429H11.4857C11.7697 6.51429 12 6.28403 12 6C12 5.71597 11.7697 5.48571 11.4857 5.48571Z"
          fill="currentColor"
        />
      </svg>
    </SvgIcon>
  );
};
