import { extendTheme } from "@mui/joy/styles";
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
        primary: {
          500: colors.subvisual.primary
        },
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
        root: ({ theme }) => ({
          borderRadius: 20,
          transition: "0.3s",
          "&:focus": {
            borderColor: theme.palette.subvisual.pink
          }
        })
      }
    }
  }
});
