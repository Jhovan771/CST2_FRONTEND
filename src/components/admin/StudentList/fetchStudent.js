import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_LINK}/api/students/students`;

export const fetchStudents = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.students;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};
