import { extendTheme } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
  interface Palette {
    subvisual: {
      primary: string;
      primaryDark: string;
      purple: string;
      pink: string;
    };
    strengths: {
      purple: string;
      green: string;
      orange: string;
      blue: string;
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
        background: {}
      }
    }
  },
  components: {
    JoyTypography: {
      styleOverrides: {
        root: () => ({
          fontFamily: "'Inter', sans-serif"
        })
      }
    },
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => {
          const sharedStyles = {
            padding: "10px 20px",
            border: "2px solid",
            borderRadius: "40px",
            transition: "0.3s"
          };

          const solidStyles = {
            backgroundColor: theme.palette.subvisual.primary,
            color: "white",
            borderColor: theme.palette.subvisual.primary,
            "&:hover": {
              backgroundColor: theme.palette.subvisual.primaryDark,
              borderColor: theme.palette.subvisual.primaryDark
            },
            "&:focus": {
              borderColor: theme.palette.subvisual.pink
            },
            "&:disabled": {
              backgroundColor: "lightGrey",
              borderColor: "lightGrey",
              color: "white"
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
              backgroundColor: "#2521AB1A",
              borderColor: theme.palette.subvisual.pink
            },
            "&:disabled": {
              color: "lightGrey",
              borderColor: "lightGrey"
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
