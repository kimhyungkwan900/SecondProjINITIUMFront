import axiosInstance from "../../axiosInstance";

const BASE_URL = '/external-diagnosis';

const handleError = (error) => {
  console.error('[External Diagnosis API Error]', error.response || error.message);
  throw error;
};

// 외부 검사 전체 목록
export const fetchExternalTests = async () => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/tests`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// 외부 검사 검색
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

// 외부 검사 페이징 조회
export const fetchPagedExternalTests = async (keyword = '', page = 0, size = 10) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/tests/paged`, {
      params: { keyword, page, size },
    });
    return res.data; // Spring Page 객체 {content, totalElements, ...}
  } catch (err) {
    handleError(err);
  }
};

// 외부 검사 문항 조회 (원본) — v1은 trgetSe 불필요!
export const fetchExternalQuestionsRaw = async (qestrnSeq) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/questions`, {
      params: { qestrnSeq },
    });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// 외부 검사 문항 조회 (파싱) — v1은 trgetSe 불필요!
export const fetchExternalQuestionsParsed = async (qestrnSeq) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/questions/parsed`, {
      params: { qestrnSeq },
    });
    return res.data; // { title, description, questions:[{questionText, options:[{text,value}]}] }
  } catch (err) {
    handleError(err);
  }
};

// 외부 검사 제출 (백엔드가 form-urlencoded로 변환해 커리어넷에 POST)
export const submitExternalDiagnosis = async (data) => {
  try {
    // data에는 다음이 포함되어야 함:
    // studentNo, qestrnSeq, trgetSe, answers, gender(100323/100324), grade, name, email, school?, startDtm
    const res = await axiosInstance.post(`${BASE_URL}/submit`, data);
    return res.data; // { inspectSeq, resultUrl, testName }
  } catch (err) {
    handleError(err);
  }
};

// 학생별 전체 외부 검사 결과 조회
export const fetchAllExternalResultsByStudent = async (studentNo) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/results/${studentNo}`);
    return res.data; // ExternalDiagnosisResultDto[]
  } catch (err) {
    handleError(err);
  }
};
