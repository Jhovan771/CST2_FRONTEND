import axios from "axios";

const API_URL = `${
  import.meta.env.VITE_SERVER_LINK
}/api/exercises/new-exercise`;

export const addActivity = async (activityData, token) => {
  try {
    // console.log("Payload being sent:", activityData);

    const response = await axios.post(API_URL, activityData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding activity:", error);
    throw error;
  }
};
