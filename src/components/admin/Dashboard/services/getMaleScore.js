import { useEffect, useState } from "react";
import axios from "axios";

const getMaleScores = () => {
  const [maleScore, setMaleScore] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMaleScores = async () => {
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

        const totalActivities = response.data.length;

        const totalScore = response.data.reduce((sum, activity) => {
          return sum + (parseFloat(activity.average_score) || 0);
        }, 0);

        const overallMaleAccuracy =
          totalActivities > 0 ? Math.round(totalScore / totalActivities) : 0;
        setMaleScore(overallMaleAccuracy);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    getMaleScores();
  }, []);

  return { maleScore, error };
};

export default getMaleScores;
