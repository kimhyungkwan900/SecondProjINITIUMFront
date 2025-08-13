import axiosInstance from "../../axiosInstance";
import { unwrap } from "../../../utils/apiUtils";

// 로그인
export const login = async ({ loginId, password }) => {
  try {
    const res = await axiosInstance.post("/auth/login", { loginId, password });
    return res.data; // LoginResponseDto
  } catch (error) {
    unwrap(error);
  }
};

// 로그아웃
export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    unwrap(error);
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
    unwrap(error);
  }
};