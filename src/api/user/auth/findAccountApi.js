import axiosInstance from "../../axiosInstance";

export const sendEmailCode = async (email) => {
  try {
    const response = await axiosInstance.post("/auth/send-email-code", { email });
    return response.data;
  } catch (error) {
    console.error("Failed to send email verification code:", error);
    throw error;
  }
};