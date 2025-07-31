// src/api/diagnosisApi.jsx
import axios from 'axios';

// ✅ 기본 설정
const BASE_URL = '/api/diagnosis';

// ✅ 검사 목록 조회
export const fetchTests = async () => {
  const res = await axios.get(`${BASE_URL}/tests`);
  return res.data;
};

// ✅ 검사 검색
export const searchTests = async (keyword) => {
  const res = await axios.get(`${BASE_URL}/tests/search`, { params: { keyword } });
  return res.data;
};

// ✅ 검사 페이징 조회
export const fetchPagedTests = async (keyword = '', page = 0, size = 10) => {
  const res = await axios.get(`${BASE_URL}/tests/paged`, {
    params: { keyword, page, size },
  });
  return res.data;
};

// ✅ 검사 문항 조회
export const fetchQuestions = async (testId) => {
  const res = await axios.get(`${BASE_URL}/${testId}/questions`);
  return res.data;
};

// ✅ 검사 제출
export const submitDiagnosis = async (data) => {
  const res = await axios.post(`${BASE_URL}/submit`, data);
  return res.data;
};

// ✅ 결과 요약 조회
export const fetchResultSummary = async (resultId) => {
  const res = await axios.get(`${BASE_URL}/result/${resultId}`);
  return res.data;
};

// ✅ 결과 PDF 다운로드
export const downloadResultPdf = async (resultId) => {
  const res = await axios.get(`${BASE_URL}/result/${resultId}/pdf`, { responseType: 'blob' });
  return res;
};

// ✅ 학생별 전체 검사 결과 조회 (📌 추가)
export const fetchAllResultsByStudent = async (studentNo) => {
  const res = await axios.get(`${BASE_URL}/results/${studentNo}`);
  return res.data;
};
