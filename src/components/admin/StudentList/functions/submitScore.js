export const submitScore = async (selectedStudent, act_id) => {
  if (!selectedStudent) {
    console.log("No student selected");
    return Promise.reject("No student selected");
  }

  const overallAccuracy = localStorage.getItem("activityAccuracy");
  const score = overallAccuracy
    ? parseInt(
        overallAccuracy
          .split(", ")
          .find((part) => part.startsWith("score:"))
          .split(": ")[1]
          .replace("%", ""),
        10
      )
    : 0;

  const data = {
    id: selectedStudent.id,
    activity_id: act_id,
    score: score,
    completed: 1,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_LINK}/api/exercises/submit-activity-score`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    if (response.ok) {
      console.log("Score submitted successfully:", result);
      localStorage.removeItem("activityAccuracy");
      window.location.reload();
    } else {
      console.error("Failed to submit score:", result.message);
      return Promise.reject(result.message);
    }
  } catch (error) {
    console.error("Error submitting score:", error);
    return Promise.reject(error);
  }
};
