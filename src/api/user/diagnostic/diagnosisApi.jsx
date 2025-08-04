// src/api/diagnosisApi.jsx
import axios from 'axios';

// ✅ 기본 설정
const BASE_URL = '/api/diagnosis';

// ✅ Axios 인스턴스 (공통 설정)
const axiosInstance = axios.create({
  withCredentials: true, // 로그인 세션/쿠키 인증 유지
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 공통 에러 핸들러
const handleError = (error) => {
  console.error('[Diagnosis API Error]', error.response || error.message);
  throw error;
};

// ✅ 검사 목록 조회
export const fetchTests = async () => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/tests`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ 검사 검색
export const searchTests = async (keyword = '') => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/tests/search`, {
      params: { keyword },
    });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ 검사 페이징 조회
export const fetchPagedTests = async (keyword = '', page = 0, size = 10) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/tests/paged`, {
      params: { keyword, page, size },
    });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ 검사 문항 조회
export const fetchQuestions = async (testId) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/${testId}/questions`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ 검사 제출
export const submitDiagnosis = async (data) => {
  try {
    const res = await axiosInstance.post(`${BASE_URL}/submit`, data);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ 결과 요약 조회
export const fetchResultSummary = async (resultId) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/result/${resultId}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ 결과 PDF 다운로드
export const downloadResultPdf = async (resultId) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/result/${resultId}/pdf`, {
      responseType: 'blob',
    });
    return res;
  } catch (err) {
    handleError(err);
  }
};

// ✅ 학생별 전체 검사 결과 조회
export const fetchAllResultsByStudent = async (studentNo) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/results/${studentNo}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};
