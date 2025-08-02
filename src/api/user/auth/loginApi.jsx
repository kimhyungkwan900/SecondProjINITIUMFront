import axios from "axios";

export const login = async (credentials) => {
  try {
    const response = await axios.post("/api/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
