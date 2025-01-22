import { extendTheme } from "@mui/joy/styles";
import { addHexTransparency } from "./utils/add-hex-transparency";
import { colors } from "./utils/colors";

declare module "@mui/joy/styles" {
  interface Palette {
    subvisual: typeof colors.subvisual;
    strengths: typeof colors.strengths;
    neutral: typeof colors.neutral;
  }
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        subvisual: colors.subvisual,
        strengths: colors.strengths,
        neutral: colors.neutral
      }
    }
  },
  fontFamily: {
    body: "'Inter', sans-serif",
    display: "'Colfax', sans-serif"
  },
  typography: {
    h1: {
      fontSize: "48px"
    },
    h2: {
      fontSize: "40px"
    },
    h3: {
      fontSize: "36px"
    },
    h4: {
      fontSize: "24px"
    },
    "title-lg": { fontSize: "20px", color: "neutral.black" },
    "title-md": { fontSize: "16px" },
    "title-sm": { fontSize: "12px" },
    "body-lg": { fontSize: "20px" },
    "body-md": { fontSize: "16px" },
    "body-sm": { fontSize: "12px", color: "neutral.light" },
    "body-xs": { fontSize: "10px" }
  },
  components: {
    JoyTypography: {
      styleOverrides: {
        root: () => ({
          lineHeight: 1,
          fontWeight: 400
        })
      }
    },
    JoyLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.neutral.black,
          textDecorationColor: theme.palette.neutral.black
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
