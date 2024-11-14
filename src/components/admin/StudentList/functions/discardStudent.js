export const discardStudent = async (student_id, activity_id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_LINK}/api/exercises/discard-student`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ student_id, activity_id }),
      }
    );

    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      console.error("Failed to discard student:", result.message);
      console.log(
        "Discarding student with ID:",
        student_id,
        "for activity ID:",
        activity_id
      );
    }
  } catch (error) {
    console.error("Error discarding student:", error);
  }
};
