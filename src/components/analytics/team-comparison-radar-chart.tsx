import { Chip, Stack } from "@mui/joy";
import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from "chart.js";
import { useMemo } from "react";
import { Radar } from "react-chartjs-2";
import { PlusSignOutlined } from "../../assets/icons/plus-sign";
import { StrengthModel } from "../../models/strength.model";
import { UserModel } from "../../models/user.model";
import { radarChartBgColors, radarChartBorderColors } from "../../utils/get-radar-chart-colors";
import { ColoredCircle } from "../shared/colored-circle";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type ProfileComparisonChartProps = {
  strengths: StrengthModel[];
  selectedUsersArray: UserModel[];
  setSelectedUsersArray: (users: UserModel[]) => void;
};

export const TeamComparisonRadarChart = ({
  strengths,
  selectedUsersArray,
  setSelectedUsersArray
}: ProfileComparisonChartProps) => {
  const removeUser = (userId: string) => {
    setSelectedUsersArray(selectedUsersArray.filter(user => user.id !== userId));
  };

  const { data, options } = useMemo(() => {
    const usersToCompare = selectedUsersArray.slice(0, 5);
    const labels = strengths.map(str => str.label);

    const datasets = usersToCompare.map((user, index) => {
      const data = strengths.map(strength => {
        const position = (user.strengths || []).indexOf(strength.id);
        return position !== -1 ? 10 - position : 0;
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
    });

    let filteredIndexes = strengths
      .map((_, index) => (datasets.some(dataset => dataset.data[index] > 0) ? index : null))
      .filter(index => index !== null);

    if (filteredIndexes.length === 0) {
      filteredIndexes = strengths.map((_, index) => index);
    }

    const filteredLabels = labels.filter((_, index) => filteredIndexes.includes(index));
    const filteredDatasets = datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.filter((_, index) => filteredIndexes.includes(index))
    }));

    let data;
    let options;
    const sharedOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 10
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

    if (selectedUsersArray.length === 0) {
      data = {
        labels: labels,
        datasets: []
      };
      options = {
        ...sharedOptions,
        scales: {
          r: {
            ...sharedOptions.scales.r,
            pointLabels: { display: false }
          }
        }
      };
    } else {
      data = {
        labels: filteredLabels,
        datasets: filteredDatasets
      };
      options = {
        ...sharedOptions,
        scales: {
          r: {
            ...sharedOptions.scales.r,
            pointLabels: { display: true }
          }
        }
      };
    }
    return { data, options };
  }, [strengths, selectedUsersArray]);

  return (
    <>
      {selectedUsersArray.length > 0 && (
        <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <Stack direction="row" flexWrap="wrap" gap={2}>
            {selectedUsersArray.map((user, index) => {
              const colorIndex = index % radarChartBgColors.length;
              return (
                <Chip
                  key={user.id}
                  variant="outlined"
                  onClick={() => removeUser(user.id)}
                  startDecorator={<ColoredCircle color={radarChartBorderColors[colorIndex]} size={12} />}
                  sx={{
                    color: radarChartBorderColors[colorIndex],
                    fontSize: 14
                  }}
                >
                  {user.name}
                </Chip>
              );
            })}
          </Stack>
          <Chip
            variant="outlined"
            onClick={() => setSelectedUsersArray([])}
            endDecorator={<PlusSignOutlined sx={{ fontSize: 12, transform: "rotate(45deg)" }} />}
            sx={{ fontSize: 14 }}
          >
            Clear all
          </Chip>
        </Stack>
      )}
      <Stack position="relative" width="100%" height="100%">
        <Radar data={data} options={options} />
      </Stack>
    </>
  );
};
