import axios from "axios";

export const logout = async () => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};