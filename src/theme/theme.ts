import { extendTheme } from "@mui/joy/styles";
import { colors } from "./colors";

declare module "@mui/joy/styles" {
  interface Palette {
    subvisual: typeof colors.subvisual;
    strengths: typeof colors.strengths;
    goals: typeof colors.goals;
    neutral: typeof colors.neutral;
  }
  interface StackProps {
    fullWidth?: boolean;
  }
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          500: colors.subvisual.primary
        },
        subvisual: colors.subvisual,
        strengths: colors.strengths,
        goals: colors.goals,
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
    "title-lg": { fontSize: "20px" },
    "title-md": { fontSize: "16px" },
    "title-sm": { fontSize: "12px" },
    "body-lg": { fontSize: "20px" },
    "body-md": { fontSize: "16px" },
    "body-sm": { fontSize: "12px" },
    "body-xs": { fontSize: "10px" }
  },
  components: {
    JoyTypography: {
      styleOverrides: {
        root: () => ({
          lineHeight: 1.2,
          fontWeight: 400
        })
      }
    },
    JoyLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.neutral.black,
          textDecorationColor: theme.palette.neutral.black,
          transition: "0.3s",
          "&:hover": {
            color: theme.palette.neutral.baseDarker,
            textDecorationColor: theme.palette.neutral.baseDarker
          }
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
        root: () => ({
          borderRadius: 20,
          transition: "0.3s"
        })
      }
    },
    JoyTabs: {
      styleOverrides: {
        root: () => ({
          backgroundColor: "transparent",
          width: "100%"
        })
      }
    },
    JoyTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: "transparent",
          transition: "0.3s",
          "&.Mui-selected": {
            backgroundColor: "transparent",
            color: theme.palette.subvisual.primary
          },
          "&::after": {
            color: theme.palette.subvisual.primary
          },
          "&.MuiTab-root": {
            "&:hover": {
              backgroundColor: "transparent",
              color: theme.palette.subvisual.primary
            }
          }
        })
      }
    },
    JoyChip: {
      styleOverrides: {
        root: () => ({
          fontSize: 16,
          paddingLeft: 12,
          paddingRight: 12
        })
      }
    },
    JoyCard: {
      styleOverrides: {
        root: () => ({
          transition: "0.3s"
        })
      }
    },
    JoyStack: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...((ownerState as any).fullWidth && { width: "100%" })
        })
      }
    }
  }
});
