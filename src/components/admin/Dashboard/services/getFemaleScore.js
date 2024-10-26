import { useEffect, useState } from "react";
import axios from "axios";

const getFemaleScores = () => {
  const [femaleScore, setFemaleScore] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFemaleScores = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_LINK
          }/api/exercises/fetch-overall-female-scores`,
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

        const overallFemaleAccuracy =
          totalActivities > 0 ? Math.round(totalScore / totalActivities) : 0;
        setFemaleScore(overallFemaleAccuracy);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };

    getFemaleScores();
  }, []);

  return { femaleScore, error };
};

export default getFemaleScores;
