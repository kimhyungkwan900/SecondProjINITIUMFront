import axios from 'axios';

// 관리자 API 기본 경로
const ADMIN_BASE_URL = '/api/admin/diagnosis';

// Axios 인스턴스 (공통 설정)
const axiosInstance = axios.create({
  withCredentials: true, // 관리자 인증 세션 유지
  headers: {
    'Content-Type': 'application/json',
  },
});

// 공통 에러 핸들러
const handleError = (error) => {
  console.error('[Diagnosis Admin API Error]', error.response || error.message);
  throw error;
};

// 관리자용 검사 등록
export const createAdminDiagnosticTest = async (data) => {
  try {
    const res = await axiosInstance.post(`${ADMIN_BASE_URL}/tests`, data);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// 관리자용 검사 삭제
export const deleteAdminDiagnosticTest = async (testId) => {
  try {
    const res = await axiosInstance.delete(`${ADMIN_BASE_URL}/tests/${testId}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// 관리자용 검사 목록 조회 (전체 조회)
export const fetchAdminAllTests = async () => {
  try {
    const res = await axiosInstance.get(`${ADMIN_BASE_URL}/tests`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};
