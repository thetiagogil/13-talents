export const addHexTransparency = (hex: `#${string}`, percentage: `${number}%`) => {
  if (!hex.startsWith("#")) hex = `#${hex}`;
  const alphaValue = parseInt(percentage.replace("%", ""), 10);
  const alpha = Math.round((alphaValue / 100) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${alpha}`;
};
