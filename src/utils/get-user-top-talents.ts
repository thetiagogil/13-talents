import { TALENT_CATEGORIES } from "../lib/constants";
import { TalentModel } from "../models/talent.model";

export const userTopTalents = (userTalents: number[] | [], talents: TalentModel[]) => {
  // Handle top 10 talents array
  const topTalents = userTalents
    ?.map((userTalent: number) => talents.find(talent => talent.id === userTalent))
    .slice(0, 10) as TalentModel[];

  // Handle top 10 talents categories percentages object
  const length = topTalents.length;
  let topPercentagesInitial = Object.fromEntries(TALENT_CATEGORIES.map(cat => [cat, 0]));

  const topPercentages = topTalents.reduce((accumulator, talents) => {
    accumulator[talents.category] = (accumulator[talents.category] || 0) + 1;
    return accumulator;
  }, topPercentagesInitial);

  Object.keys(topPercentages).forEach(cat => {
    const category = cat as TalentModel["category"];
    topPercentages[category] = length ? Math.round((topPercentages[category] / length) * 100) : 0;
  });

  return { userTopTalentsArray: topTalents, userTopTalentsPercentages: topPercentages };
};
