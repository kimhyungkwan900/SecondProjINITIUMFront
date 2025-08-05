import axios from "axios";

export const sendEmailCode = async (email) => {
  try {
    const response = await axios.post("/api/auth/send-email-code", { email });
    return response.data;
  } catch (error) {
    console.error("Failed to send email verification code:", error);
    throw error;
  }
};
