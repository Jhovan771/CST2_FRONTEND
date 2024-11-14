import axios from "axios";

const serverLink = import.meta.env.VITE_SERVER_LINK;

export const registerUser = async (username, password, email) => {
  try {
    const response = await axios.post(`${serverLink}/api/register`, {
      username,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error.response.data;
  }
};

export const verifyOTP = async (username, password, email, otp) => {
  try {
    const response = await axios.post(`${serverLink}/api/verify-otp`, {
      username,
      password,
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error.response.data;
  }
};
