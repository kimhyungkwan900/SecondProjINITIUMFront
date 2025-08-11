import axiosInstance from "../../axiosInstance";

const logErr = (label, error) => {
  const status = error?.response?.status;
  const msg = error?.response?.data?.message || error?.message;
  console.error(`${label} [${status ?? "-"}]: ${msg}`);
};

// 로그인
export const login = async ({ loginId, password }) => {
  try {
    const res = await axiosInstance.post("/auth/login", { loginId, password });
    return res.data; // LoginResponseDto
  } catch (error) {
    logErr("Login failed", error);
    throw error;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    logErr("Logout failed", error);
    throw error;
  }
};

// 내 정보
export const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data; // UserDetailDto
  } catch (error) {
    logErr("Get current user failed", error);
    throw error;
  }
};

// 비밀번호 변경
export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    await axiosInstance.post("/auth/change-password", { currentPassword, newPassword });
  } catch (error) {
    logErr("Change password failed", error);
    throw error;
  }
};