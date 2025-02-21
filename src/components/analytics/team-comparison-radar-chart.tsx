import { Chip, Stack } from "@mui/joy";
import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from "chart.js";
import { useMemo } from "react";
import { Radar } from "react-chartjs-2";
import { TALENT_CATEGORIES } from "../../lib/constants";
import { TalentModel } from "../../models/talent.model";
import { UserModel } from "../../models/user.model";
import { getColorHex } from "../../utils/get-color-hex";
import { getColorTransparency } from "../../utils/get-color-transparency";
import { radarChartBgColors, radarChartBorderColors } from "../../utils/get-radar-chart-colors";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type ProfileComparisonChartProps = {
  talents: TalentModel[];
  selectedUsersArray: UserModel[];
};

export const TeamComparisonRadarChart = ({ talents, selectedUsersArray }: ProfileComparisonChartProps) => {
  const { data, options } = useMemo(() => {
    const maxUsersToCompare = selectedUsersArray.slice(0, 5);

    // Ordered list for each talent category
    const orderedCategoryTalents = TALENT_CATEGORIES.map(category => {
      let ordered: TalentModel[] = [];
      // 1. Add talents that are common to every selected user
      const currentCategoryTalents = talents.filter(talent => talent.category === category);
      const commonTalents = currentCategoryTalents.filter(talent =>
        selectedUsersArray.every(user => (user.talents || []).includes(talent.id))
      );
      ordered = [...commonTalents];

      // 2. Add the rest of the talents that are individual for each user (in order) that haven't been added yet
      selectedUsersArray.forEach(user => {
        (user.talents || []).forEach(talentId => {
          const matchingTalent = currentCategoryTalents.find(talent => talent.id === talentId);
          if (matchingTalent && !ordered.find(talent => talent.id === matchingTalent.id)) {
            ordered.push(matchingTalent);
          }
        });
      });
      return ordered;
    });

    // Ensure each quadrant's size of the chart is the same
    const maxNumberOfTalentsPerQuadrant = Math.max(...orderedCategoryTalents.map(arr => arr.length), 1);
    const dividedCategoryTalents = orderedCategoryTalents.map((array, index) => {
      if (array.length < maxNumberOfTalentsPerQuadrant) {
        const placeholders = Array(maxNumberOfTalentsPerQuadrant - array.length).fill({
          id: null,
          label: "",
          description: "",
          category: TALENT_CATEGORIES[index]
        });
        return [...array, ...placeholders];
      }
      return array;
    });

    // Flatten the array into one ordered list
    const flattenCategoryTalents = dividedCategoryTalents.flat();

    // Chart configs
    const data = {
      labels: flattenCategoryTalents.map(s => s.label),
      datasets: maxUsersToCompare.map((user, index) => {
        const data = flattenCategoryTalents.map(talent => {
          if (talent.id) {
            const position = (user.talents || []).indexOf(talent.id);
            return position !== -1 ? 10 - position : 0;
          }
          return 0;
        });
        const colorIndex = index % radarChartBgColors.length;
        return {
          data,
          label: user.name,
          backgroundColor: radarChartBgColors[colorIndex],
          borderColor: radarChartBorderColors[colorIndex],
          borderWidth: 1,
          fill: true
        };
      })
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 10,
          pointLabels: {
            display: true,
            color: (context: any) => {
              const index = context.index;
              const category = flattenCategoryTalents[index]?.category;
              return category ? getColorHex(category) : "black";
            }
          }
        }
      },
      plugins: {
        legend: { display: false },
        title: { display: false },
        tooltip: {
          filter: (tooltipItem: any) => tooltipItem.raw !== 0,
          callbacks: {
            label: (context: any) => `${context.dataset.label}: ${context.raw}`
          }
        }
      }
    };

    return { data, options };
  }, [talents, selectedUsersArray]);

  return (
    <Stack position="relative" width="100%" height={{ xs: 360, md: "100%" }}>
      <Radar data={data} options={options} />

      {TALENT_CATEGORIES.map((category, index) => {
        const value = { xs: 10, sm: 0, md: 40 };
        const labelPositions = [
          { top: value, right: value },
          { bottom: value, right: value },
          { bottom: value, left: value },
          { top: value, left: value }
        ];
        const position = labelPositions[index];

        return (
          <Chip
            key={category}
            variant="outlined"
            sx={{
              position: "absolute",
              ...position,
              color: getColorHex(category),
              bgcolor: getColorTransparency(getColorHex(category), 10),
              borderColor: getColorHex(category),
              fontSize: 12
            }}
          >
            {category}
          </Chip>
        );
      })}
    </Stack>
  );
};
