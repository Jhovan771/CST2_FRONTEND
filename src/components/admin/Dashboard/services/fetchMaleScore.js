import { useState, useEffect } from "react";
import axios from "axios";
import { computeOverallRating } from "../functions/computeOverallRating";

const fetchMaleScore = () => {
  const [chartData, setChartData] = useState({ labels: [], scores: [] });
  const [error, setError] = useState(null);
  const [rating, setRating] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_LINK
          }/api/exercises/fetch-overall-male-scores`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const labels = response.data.map((activity) => activity.label);
        const scores = response.data.map((activity) => activity.average_score);

        setChartData({ labels, scores });

        const { rating } = computeOverallRating(scores);
        setRating(rating);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  return { chartData, rating, error };
};

export default fetchMaleScore;
