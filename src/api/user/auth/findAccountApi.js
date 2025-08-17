import axiosInstance from "../../axiosInstance";
import { unwrap } from "../../../utils/apiUtils";

/** 이메일로 인증코드 전송 */
export const sendEmailCode = async (email) => {
  try {
    const res = await axiosInstance.post("/auth/send-email-code", { email });
    return res.data; // 보통 200 OK (바디 없음일 수도 있음)
  } catch (error) {
    unwrap(error);
  }
};

/** 로그인 ID로 사용자의 이메일 조회 (마스킹 포함 응답) */
export const getUserEmailByLoginId = async (loginId) => {
  try {
    const res = await axiosInstance.post("/auth/user-email", { loginId });
    // 기대 응답: { email: string, maskedEmail: string }
    return res.data;
  } catch (error) {
    unwrap(error);
  }
};

/** 이메일 + 인증코드 검증 */
export const verifyEmailCode = async ({ email, authCode }) => {
  try {
    const res = await axiosInstance.post("/auth/verify-email-code", {
      email,
      authCode,
    });
    // 컨트롤러가 boolean 반환: true/false
    return res.data === true || res.data === "true";
  } catch (error) {
    unwrap(error);
  }
};

/** 로그인 ID 기준 임시 비밀번호 발급 */
export const resetPassword = async (loginId) => {
  try {
    const res = await axiosInstance.post("/auth/reset-password", { loginId });
    // 기대 응답: { message: "임시 비밀번호가 이메일로 발송되었습니다." }
    return res.data;
  } catch (error) {
    unwrap(error);
  }
};

export const sendEmailCodeByLoginId = async (loginId) => {
  try {
    // 1st: 단일 엔드포인트 시도
    try {
      const res = await axiosInstance.post("/auth/send-email-code-by-loginId", {
        loginId,
      });
      // 기대 응답: { email: null, maskedEmail: string }
      return res.data;
    } catch (_) {
      // 2nd: 폴백(이메일 먼저 조회 → 코드 전송)
      const info = await getUserEmailByLoginId(loginId); // { email, maskedEmail }
      const email = info?.email;
      if (!email) {
        const e = new Error("가입된 이메일을 찾을 수 없습니다.");
        e.status = 404;
        throw e;
      }
      await sendEmailCode(email);
      return info; // maskedEmail 포함
    }
  } catch (error) {
    unwrap(error);
  }
};

/** 이메일로 로그인 ID 찾기 */
export const findLoginIdByEmail = async (email) => {
  try {
    const res = await axiosInstance.post("/auth/find-id", { email });
    // 기대 응답: { loginId: string }
    return res.data;
  } catch (error) {
    unwrap(error);
  }
};