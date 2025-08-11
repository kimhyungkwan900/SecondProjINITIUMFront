import axiosInstance from '../../axiosInstance';

// 기본 설정
const BASE_URL = '/diagnosis';

// 공통 에러 핸들러
const handleError = (error) => {
  console.error('[Diagnosis API Error]', error.response || error.message);
  throw error;
};

// 검사 목록 조회
export const fetchTests = async () => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/tests`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// 검사 검색
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

// 검사 페이징 조회
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

// 검사 문항 조회
export const fetchQuestions = async (testId) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/${testId}/questions`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// 검사 제출
export const submitDiagnosis = async (data) => {
  try {
    const res = await axiosInstance.post(`${BASE_URL}/submit`, data);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// 결과 요약 조회
export const fetchResultSummary = async (resultId) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/result/${resultId}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// 결과 PDF 다운로드
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

// 학생별 전체 검사 결과 조회
export const fetchAllResultsByStudent = async (studentNo) => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/results/${studentNo}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// 상세 결과
export const fetchResultDetails = async (resultId) => {
  try {
    if (!resultId) throw new Error('결과 ID가 유효하지 않습니다.');
    
    const res = await axiosInstance.get(`/diagnosis/result/${resultId}/details`);
    
    if (!Array.isArray(res.data)) {
      console.warn('[fetchResultDetails] 예상치 못한 데이터 형식:', res.data);
      return [];
    }
    
    return res.data;
  } catch (err) {
    handleError(err);
    return [];
  }
};

// ✅ 학생별 검사 결과 "페이징" 조회
export const fetchPagedResultsByStudent = async (studentNo, page = 0, size = 3, sort = 'completionDate,desc') => {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/results/${studentNo}/paged`, {
      params: { page, size, sort },
    });
    return res.data; // Page<DiagnosticResultDto>
  } catch (err) {
    handleError(err);
  }
};