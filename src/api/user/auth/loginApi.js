import axiosInstance from "../../axiosInstance";

// 로그인
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout", {});
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
