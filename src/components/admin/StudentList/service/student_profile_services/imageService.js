import axios from "axios";

export const uploadImage = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/uploads/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
