import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const IndividualGraph = ({ scoresData }) => {
  const labels = scoresData.length ? scoresData.map((item) => item.label) : [];
  const scores = scoresData.length ? scoresData.map((item) => item.score) : [];

  const data = {
    labels: labels,
    datasets: [
      {
        data: scores,
        backgroundColor: "transparent",
        borderColor: "maroon",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
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
          display: true,
        },
      },
      y: {
        grid: {
          borderDash: [10],
        },
        ticks: {
          stepSize: 10,
          callback: (value) => {
            return Math.round(value);
          },
        },
      },
    },
  };

  return (
    <div
      style={{ margin: "18px", padding: "14px" }}
      className='bg-white/50 rounded-md w-full'>
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default IndividualGraph;
