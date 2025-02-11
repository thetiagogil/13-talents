import { Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from "chart.js";
import { Radar } from "react-chartjs-2";
import { StrengthModel } from "../../models/strength.model";
import { UserModel } from "../../models/user.model";
import { radarChartBgColors, radarChartBorderColors } from "../../utils/get-radar-chart-colors";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type ProfileComparisonChartProps = {
  strengths: StrengthModel[];
  selectedUsersArray: UserModel[];
};

export const ProfileComparisonChart = ({ strengths, selectedUsersArray }: ProfileComparisonChartProps) => {
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
      title: { display: false }
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

  return <Radar data={data} options={options} />;
};
