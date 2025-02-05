import { colors } from "../theme/colors";
import { getColorTransparency } from "./get-color-transparency";

const chartColorKeys = Object.keys(colors.charts);
const radarChartBorderColors = chartColorKeys.map(key => colors.charts[key as keyof typeof colors.charts]);
const radarChartBgColors = chartColorKeys.map(key =>
  getColorTransparency(colors.charts[key as keyof typeof colors.charts], 10)
);

export { radarChartBgColors, radarChartBorderColors };
