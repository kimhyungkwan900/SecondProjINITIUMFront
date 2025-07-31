// src/api/diagnosisAdminApi.jsx
import axios from 'axios';

// 관리자 API 기본 경로
const ADMIN_BASE_URL = '/api/admin/diagnosis';

// ✅ 관리자용 검사 등록
export const createAdminDiagnosticTest = (data) => {
  return axios.post(`${ADMIN_BASE_URL}/tests`, data);
};

// ✅ 관리자용 검사 삭제
export const deleteAdminDiagnosticTest = (testId) => {
  return axios.delete(`${ADMIN_BASE_URL}/tests/${testId}`);
};

// ✅ 관리자용 검사 목록 조회 (관리자가 전체 조회 가능)
export const fetchAdminAllTests = () => {
  return axios.get(`${ADMIN_BASE_URL}/tests`);
};