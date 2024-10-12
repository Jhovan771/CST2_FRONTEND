import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_LINK;

export const deleteStudent = async (studentId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${SERVER_URL}/api/students/delete/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
