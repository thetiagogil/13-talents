import { Chip, Stack } from "@mui/joy";
import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from "chart.js";
import { useMemo } from "react";
import { Radar } from "react-chartjs-2";
import { STRENGTH_CATEGORIES } from "../../lib/constants";
import { StrengthModel } from "../../models/strength.model";
import { UserModel } from "../../models/user.model";
import { getColorHex } from "../../utils/get-color-hex";
import { getColorTransparency } from "../../utils/get-color-transparency";
import { radarChartBgColors, radarChartBorderColors } from "../../utils/get-radar-chart-colors";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type ProfileComparisonChartProps = {
  strengths: StrengthModel[];
  selectedUsersArray: UserModel[];
};

export const TeamComparisonRadarChart = ({ strengths, selectedUsersArray }: ProfileComparisonChartProps) => {
  const { data, options } = useMemo(() => {
    const maxUsersToCompare = selectedUsersArray.slice(0, 5);

    // Ordered list for each strength category
    const orderedCategoryStrengths = STRENGTH_CATEGORIES.map(category => {
      let ordered: StrengthModel[] = [];
      // 1. Add strengths that are common to every selected user
      const currentCategoryStrengths = strengths.filter(strength => strength.category === category);
      const commonStrengths = currentCategoryStrengths.filter(strength =>
        selectedUsersArray.every(user => (user.strengths || []).includes(strength.id))
      );
      ordered = [...commonStrengths];

      // 2. Add the rest of the strengths that are individual for each user (in order) that haven't been added yet
      selectedUsersArray.forEach(user => {
        (user.strengths || []).forEach(strengthId => {
          const matchingStrength = currentCategoryStrengths.find(strength => strength.id === strengthId);
          if (matchingStrength && !ordered.find(strength => strength.id === matchingStrength.id)) {
            ordered.push(matchingStrength);
          }
        });
      });
      return ordered;
    });

    // Ensure each quadrant's size of the chart is the same
    const maxNumberOfStrengthsPerQuadrant = Math.max(...orderedCategoryStrengths.map(arr => arr.length), 1);
    const dividedCategoryStrengths = orderedCategoryStrengths.map((array, index) => {
      if (array.length < maxNumberOfStrengthsPerQuadrant) {
        const placeholders = Array(maxNumberOfStrengthsPerQuadrant - array.length).fill({
          id: null,
          label: "",
          details: "",
          category: STRENGTH_CATEGORIES[index]
        });
        return [...array, ...placeholders];
      }
      return array;
    });

    // Flatten the array into one ordered list
    const flattenCategoryStrengths = dividedCategoryStrengths.flat();

    // Chart configs
    const data = {
      labels: flattenCategoryStrengths.map(s => s.label),
      datasets: maxUsersToCompare.map((user, index) => {
        const data = flattenCategoryStrengths.map(strength => {
          if (strength.id) {
            const position = (user.strengths || []).indexOf(strength.id);
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
              const category = flattenCategoryStrengths[index]?.category;
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
  }, [strengths, selectedUsersArray]);

  return (
    <Stack position="relative" width="100%" height={{ xs: 360, md: "100%" }}>
      <Radar data={data} options={options} />

      {STRENGTH_CATEGORIES.map((category, index) => {
        const value = 40;
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
