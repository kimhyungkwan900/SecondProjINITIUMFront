import { handleApiError, unwrap } from "../../../utils/apiUtils";
import axiosInstance from "../../axiosInstance";


// 로그인
export const login = async ({ loginId, password }) => {
  try {
    // 서버가 HttpOnly 쿠키에 RT/AT를 심어주고, (선택) body로 사용자 정보/메시지를 반환한다고 가정
    const res = await axiosInstance.post("/auth/login", { loginId, password });
    return res.data; // { user, ... } 형태면 상위에서 setUser(res.data.user) 가능
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout"); // 서버가 쿠키 삭제
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
    // unwrap 유틸이 예외를 재던지거나 메시지 라핑을 한다면 그대로 유지
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