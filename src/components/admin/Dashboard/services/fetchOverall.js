import { useEffect, useState } from "react";
import axios from "axios";

const fetchOverall = () => {
  const [overallScore, setOverallScore] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOverallScore = async () => {
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

        const totalActivities = response.data.length;
        const totalScore = response.data.reduce((sum, activity) => {
          return sum + (parseFloat(activity.average_score) || 0);
        }, 0);

        const overallAccuracy =
          totalActivities > 0
            ? Math.round(totalScore / totalActivities).toFixed(2)
            : 0;

        setOverallScore(overallAccuracy);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    getOverallScore();
  }, []);

  return { overallScore, error };
};

export default fetchOverall;
