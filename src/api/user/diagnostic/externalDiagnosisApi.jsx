// src/api/externalDiagnosisApi.jsx
import axios from 'axios';

// ✅ 기본 설정
const BASE_URL = '/api/external-diagnosis';

// ✅ 외부 검사 전체 목록
export const fetchExternalTests = async () => {
  const res = await axios.get(`${BASE_URL}/tests`);
  return res.data;
};

// ✅ 외부 검사 검색
export const searchExternalTests = async (keyword) => {
  const res = await axios.get(`${BASE_URL}/tests/search`, { params: { keyword } });
  return res.data;
};

// ✅ 외부 검사 페이징 조회
export const fetchPagedExternalTests = async (keyword = '', page = 0, size = 10) => {
  const res = await axios.get(`${BASE_URL}/tests/paged`, {
    params: { keyword, page, size },
  });
  return res.data;
};

// ✅ 외부 검사 문항 조회 (원본)
export const fetchExternalQuestionsRaw = async (qestrnSeq, trgetSe) => {
  const res = await axios.get(`${BASE_URL}/questions`, {
    params: { qestrnSeq, trgetSe },
  });
  return res.data;
};

// ✅ 외부 검사 문항 조회 (파싱)
export const fetchExternalQuestionsParsed = async (qestrnSeq, trgetSe) => {
  const res = await axios.get(`${BASE_URL}/questions/parsed`, {
    params: { qestrnSeq, trgetSe },
  });
  return res.data;
};

// ✅ 외부 검사 제출
export const submitExternalDiagnosis = async (data) => {
  const res = await axios.post(`${BASE_URL}/submit`, data);
  return res.data;
};

// ✅ 학생별 전체 외부 검사 결과 조회 (📌 추가)
export const fetchAllExternalResultsByStudent = async (studentNo) => {
  const res = await axios.get(`${BASE_URL}/results/${studentNo}`);
  return res.data;
};