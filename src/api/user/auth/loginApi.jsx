import axios from "axios";

export const login = async (credentials) => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/login", credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
