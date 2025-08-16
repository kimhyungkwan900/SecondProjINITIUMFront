import axiosInstance from "../../axiosInstance";
import { unwrap, handleApiError } from "../../../utils/apiUtils";

// 로그인
export const login = async ({ loginId, password }) => {
  try {
    const res = await axiosInstance.post("/auth/login", { loginId, password });
    return res.data; // LoginResponseDto
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// 내 정보
export const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    unwrap(error);
  }
};

// 비밀번호 변경
export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    await axiosInstance.post("/auth/change-password", { currentPassword, newPassword });
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// 비밀번호 인증
export const verifyPassword = async ({ password }) => {
  try {
    await axiosInstance.post("/auth/verify-password", { password });
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};