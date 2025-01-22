import { extendTheme } from "@mui/joy/styles";
import { addHexTransparency } from "./utils/add-hex-transparency";

declare module "@mui/joy/styles" {
  interface Palette {
    subvisual: {
      primary: `#${string}`;
      primaryDark: `#${string}`;
      purple: `#${string}`;
      pink: `#${string}`;
    };
    strengths: {
      purple: `#${string}`;
      green: `#${string}`;
      orange: `#${string}`;
      blue: `#${string}`;
    };
    neutral: {
      white: `#${string}`;
      lightest: `#${string}`;
      lighter: `#${string}`;
      light: `#${string}`;
      baseLighter: `#${string}`;
      baseDarker: `#${string}`;
      dark: `#${string}`;
      darker: `#${string}`;
      darkest: `#${string}`;
      black: `#${string}`;
    };
  }
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        subvisual: {
          primary: "#065BFB",
          primaryDark: "#2521AB",
          purple: "#FF7B9B",
          pink: "#FF7B9B"
        },
        strengths: {
          purple: "#7B2381", // executing
          green: "#00945C", // strategic thinking
          orange: "#E97101", // influencing
          blue: "#0070CD" // relationship building
        },
        neutral: {
          white: "#FFFFFF",
          lightest: "#EAEAEA",
          lighter: "#DDDDDF",
          light: "#B5B6BA",
          baseLighter: "#8F8F96",
          baseDarker: "#6A6B73",
          dark: "#48494F",
          darker: "#29292D",
          darkest: "#101113",
          black: "#000000"
        }
      }
    }
  },
  fontFamily: {
    body: "'Inter', sans-serif"
  },
  components: {
    JoyTypography: {
      styleOverrides: {
        root: () => ({
          lineHeight: 1
        })
      }
    },
    JoyInput: {
      styleOverrides: {
        root: () => ({
          borderRadius: 20
        })
      }
    },
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const sharedStyles = {
            border: "2px solid",
            borderRadius: 20,
            transition: "0.3s"
          };

          const solidStyles = {
            backgroundColor: theme.palette.subvisual.primary,
            color: theme.palette.neutral.white,
            borderColor: theme.palette.subvisual.primary,
            "&:hover": {
              backgroundColor: theme.palette.subvisual.primaryDark,
              borderColor: theme.palette.subvisual.primaryDark
            },
            "&:focus": {
              borderColor: theme.palette.subvisual.pink
            },
            "&:disabled": {
              backgroundColor: theme.palette.neutral.light,
              borderColor: theme.palette.neutral.light,
              color: theme.palette.neutral.white
            }
          };

          const outlinedStyles = {
            backgroundColor: "transparent",
            color: theme.palette.subvisual.primary,
            borderColor: theme.palette.subvisual.primary,
            "&:hover": {
              color: theme.palette.subvisual.primaryDark,
              borderColor: theme.palette.subvisual.primaryDark
            },
            "&:focus": {
              backgroundColor: addHexTransparency(theme.palette.subvisual.primaryDark, "10%"),
              borderColor: theme.palette.subvisual.pink
            },
            "&:disabled": {
              color: theme.palette.neutral.light,
              borderColor: theme.palette.neutral.light
            }
          };

          return {
            ...sharedStyles,
            ...(ownerState.variant === "solid" ? solidStyles : {}),
            ...(ownerState.variant === "outlined" ? outlinedStyles : {})
          };
        }
      }
    }
  }
});
