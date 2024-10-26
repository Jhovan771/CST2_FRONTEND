import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_LINK;

export const deleteExercise = async (act_id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/exercises/delete-activity/${act_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting exercise:", error);
    throw error;
  }
};
