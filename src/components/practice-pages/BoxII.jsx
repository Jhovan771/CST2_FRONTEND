import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const BoxII = ({ triggerUpdate, resetChartData }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Pronunciation Accuracy",
        data: [],
        fill: false,
        borderColor: "maroon",
        pointBorderColor: "transparent",
        pointBorderColor: 4,
        tension: 0.5,
      },
    ],
  });

  // Function to update chart data
  const updateChartData = () => {
    const storedData =
      JSON.parse(localStorage.getItem("pronunciationData")) || [];

    console.log("Stored Data:", storedData);

    if (storedData.length > 0) {
      const labels = storedData.map((entry) => entry.word);
      const accuracyData = storedData.map((entry) => entry.accuracy);

      setChartData({
        labels,
        datasets: [
          {
            label: "Pronunciation Accuracy",
            data: accuracyData,
            fill: false,
            borderColor: "maroon",
            pointBorderColor: "transparent",
            pointBorderColor: 4,
            tension: 0.5,
          },
        ],
      });
    } else {
      // Debugging line
      console.log("No data to display.");
    }
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "pronunciationData") {
        updateChartData();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    updateChartData();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (resetChartData) {
      resetChartData();
    }
  }, [resetChartData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "black",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const storedData =
              JSON.parse(localStorage.getItem("pronunciationData")) || [];
            const word = storedData[index]?.word || "Unknown";
            const status = storedData[index]?.status || "Unknown";
            return `Word: ${word}, Status: ${status}, Accuracy: ${context.raw}%`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Attempts",
          color: "black",
        },
        ticks: {
          color: "black",
        },
      },
      y: {
        title: {
          display: true,
          text: "Accuracy (%)",
          color: "black",
        },
        ticks: {
          color: "black",
        },
        beginAtZero: true,
        max: 100,
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  const chartStyles = {
    width: "100%",
    height: "80vh",
    maxWidth: "800px",
    margin: "0 auto",
  };

  return (
    <div id='box-2' className='bg-white rounded-md p-4'>
      <h2>Pronunciation Accuracy Chart</h2>
      <div style={chartStyles}>
        {chartData.labels.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <p>No data available to display</p>
        )}
      </div>
    </div>
  );
};

export default BoxII;
