import { useState, useEffect } from "react";
import axios from "axios";

const fetchOverallScore = () => {
  const [chartData, setChartData] = useState({ labels: [], scores: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_LINK
          }/api/exercises/fetch-overall-scores`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const labels = response.data.map((activity) => activity.label);
        const scores = response.data.map((activity) => activity.average_score);

        setChartData({ labels, scores });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  return { chartData, error };
};

export default fetchOverallScore;
