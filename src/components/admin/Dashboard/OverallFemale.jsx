import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import FetchFemaleScore from "./services/fetchFemaleScore";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const OverallFemale = () => {
  const { chartData, error } = FetchFemaleScore();

  if (error) {
    return <div>Error fetching female chart data</div>;
  }

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.scores,
        backgroundColor: "transparent",
        borderColor: "#4ee565",
        pointBorderColor: "#4ee565",
        pointBorderWidth: 2,
        tension: 0.5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          borderDash: [10],
        },
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default OverallFemale;
