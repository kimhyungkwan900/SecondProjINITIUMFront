// src/api/externalDiagnosisApi.jsx
import axios from 'axios';

// ✅ 기본 설정
const BASE_URL = '/api/external-diagnosis';

// ✅ Axios 기본 옵션 (withCredentials 공통 적용)
const axiosInstance = axios.create({
  withCredentials: true, // 세션/쿠키 인증 유지
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ 에러 헬퍼 함수
const handleError = (error) => {
  console.error('[External Diagnosis API Error]', error.response || error.message);
  throw error;
};

// ✅ 외부 검사 전체 목록
export const fetchExternalTests = async () => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/tests`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ 외부 검사 검색
export const searchExternalTests = async (keyword = '') => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/tests/search`, {
      params: { keyword },
    });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ 외부 검사 페이징 조회
export const fetchPagedExternalTests = async (keyword = '', page = 0, size = 10) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/tests/paged`, {
      params: { keyword, page, size },
    });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ 외부 검사 문항 조회 (원본)
export const fetchExternalQuestionsRaw = async (qestrnSeq, trgetSe) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/questions`, {
      params: { qestrnSeq, trgetSe },
    });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ 외부 검사 문항 조회 (파싱)
export const fetchExternalQuestionsParsed = async (qestrnSeq, trgetSe) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/questions/parsed`, {
      params: { qestrnSeq, trgetSe },
    });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ 외부 검사 제출
export const submitExternalDiagnosis = async (data) => {
  try {
    const res = await axiosInstance.post(`${BASE_URL}/submit`, data);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ 학생별 전체 외부 검사 결과 조회
export const fetchAllExternalResultsByStudent = async (studentNo) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/results/${studentNo}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};
