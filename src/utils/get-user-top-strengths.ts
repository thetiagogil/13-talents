import { STRENGTH_CATEGORIES } from "../lib/constants";
import { StrengthModel } from "../models/strength.model";

export const userTopStrengths = (userStrengths: number[] | undefined, strengths: StrengthModel[]) => {
  // Handle top 10 strengths array
  const topStrengths = userStrengths
    ?.map((userStrength: number) => strengths.find(strength => strength.id === userStrength))
    .slice(0, 10) as StrengthModel[];

  // Handle top 10 strengths categories percentages object
  const length = topStrengths.length;
  let topPercentagesInitial = Object.fromEntries(STRENGTH_CATEGORIES.map(cat => [cat, 0]));

  const topPercentages = topStrengths.reduce((accumulator, strengths) => {
    accumulator[strengths.category] = (accumulator[strengths.category] || 0) + 1;
    return accumulator;
  }, topPercentagesInitial);

  Object.keys(topPercentages).forEach(cat => {
    const category = cat as StrengthModel["category"];
    topPercentages[category] = length ? Math.round((topPercentages[category] / length) * 100) : 0;
  });

  return { userTopStrengthsArray: topStrengths, userTopStrengthsPercentages: topPercentages };
};
