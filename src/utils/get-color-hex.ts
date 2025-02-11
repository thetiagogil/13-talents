import { colors } from "../theme/colors";

export const getColorHex = (input: string) => {
  if (input.startsWith("#")) return input;
  const word = input.toLowerCase().replace(" ", "");
  for (const category of Object.keys(colors)) {
    const colorGroup = colors[category as keyof typeof colors];
    for (const key of Object.keys(colorGroup)) {
      if (key.toLowerCase() === word) {
        return colorGroup[key as keyof typeof colorGroup] as string;
      }
    }
  }
};
