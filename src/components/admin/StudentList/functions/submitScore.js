export const submitScore = async (selectedStudent, act_id) => {
  if (!selectedStudent) {
    console.log("No student selected");
    return;
  }

  const overallAccuracy = localStorage.getItem("activityAccuracy");
  //   console.log("Overall Accuracy Value:", overallAccuracy);

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

  //   console.log("Parsed Score:", score);

  const data = {
    id: selectedStudent.id,
    activity_id: act_id,
    score: score,
    completed: 1,
  };

  //   console.log("Data being sent:", data);

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
    }
  } catch (error) {
    console.error("Error submitting score:", error);
  }
};
