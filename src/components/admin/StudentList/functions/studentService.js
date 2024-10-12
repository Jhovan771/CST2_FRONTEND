import axios from "axios";

const serverLink = import.meta.env.VITE_SERVER_LINK;

export const fetchStudentsWithoutScore = async (activity_id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${serverLink}/api/students/no-score`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        activity_id,
      },
    });
    return response.data.students;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};
