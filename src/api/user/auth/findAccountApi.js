import axiosInstance from "../../axiosInstance";
import { unwrap } from "../../../utils/apiUtils";

export const sendEmailCode = async (email) => {
  try {
    const response = await axiosInstance.post("/auth/send-email-code", { email });
    return response.data;
  } catch (error) {
    unwrap(error);
  }
};