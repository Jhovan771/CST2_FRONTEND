export const fetchStudentScores = async (studentId, token) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_SERVER_LINK
      }/api/exercises/fetch-scores/${studentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.scores || [];
  } catch (error) {
    console.error("Error fetching scores:", error);
    return [];
  }
};
