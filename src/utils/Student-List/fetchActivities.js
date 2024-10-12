import axios from "axios";

const fetchActivities = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_LINK}/api/exercises/fetch-act`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.activities;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

export default fetchActivities;
