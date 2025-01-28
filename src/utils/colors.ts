import { STRENGTH_CATEGORIES } from "../lib/constants";

export const colors = {
  subvisual: {
    primary: "#065BFB",
    primaryDark: "#2521AB",
    purple: "#FF7B9B",
    pink: "#FF7B9B"
  },
  strengths: {
    purple: "#7B2381", // executing
    orange: "#E97101", // influencing
    blue: "#0070CD", // relationship building
    green: "#00945C" // strategic thinking
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
  },
  background: {
    avatarLoading: "#038DEF"
  }
};

export const strengthsColor = STRENGTH_CATEGORIES.map((category, index) => ({
  category,
  color: {
    0: "strengths.purple",
    1: "strengths.orange",
    2: "strengths.blue",
    3: "strengths.green"
  }[index]
}));
