import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_LINK;

export const fetchStudent = async (studentId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. Please login.");
    return;
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/students/student/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    throw error;
  }
};

export const updateStudent = async (studentId, updateData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. Please log in again.");
    return;
  }

  try {
    // console.log("Updating student with ID:", studentId);
    // console.log("Data to be updated:", updateData);

    const response = await axios.put(
      `${API_URL}/api/students/student/${studentId}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating student data:", error);
    throw error;
  }
};
