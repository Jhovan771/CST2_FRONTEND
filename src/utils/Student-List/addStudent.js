import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_LINK}/api/students/add-student`;

export const addStudent = async (studentData, token) => {
  try {
    const response = await axios.post(API_URL, studentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 201;
  } catch (error) {
    console.error(
      "Error adding student:",
      error.response ? error.response.data : error.message
    );
    return false;
  }
};
