import axios from 'axios';

// API base URL을 admin assessment 컨트롤러에 맞게 설정합니다.
const API_BASE_URL = '/api/admin/assessment';

/**
 * 날짜를 'yyyy-MM-dd' 형식에서 API가 요구하는 'yyyyMMdd' 형식으로 변환합니다.
 * @param {string} dateString - 'yyyy-MM-dd' 형식의 날짜 문자열
 * @returns {string} 'yyyyMMdd' 형식의 날짜 문자열
 */
const formatDateForApi = (dateString) => {
  if (!dateString) return '';
  return dateString.replace(/-/g, '');
};

/**
 * API에 전송하기 전에 DTO 객체를 준비합니다. (특히 날짜 형식 변환)
 * @param {object} formData - 프론트엔드 폼 데이터
 * @returns {object} API DTO 형식에 맞는 데이터
 */
const prepareDataForApi = (formData) => {
  return {
    ...formData,
    startDate: formatDateForApi(formData.startDate),
    endDate: formatDateForApi(formData.endDate),
    registerDate: formatDateForApi(formData.registerDate),
  };
};

/**
 * 모든 진단 평가 목록을 조회합니다.
 */
export const getAllAssessments = async () => {
  const response = await axios.get(`${API_BASE_URL}/all`);
  return response.data;
};

/**
 * 새로운 진단 평가를 생성합니다.
 * @param {object} assessmentData - CoreCompetencyAssessmentDto에 해당하는 데이터
 */
export const createAssessment = async (assessmentData) => {
  const payload = prepareDataForApi(assessmentData);
  const response = await axios.post(`${API_BASE_URL}/create`, payload);
  return response.data;
};

/**
 * 기존 진단 평가를 수정합니다.
 * @param {number} id - 수정할 평가의 ID
 * @param {object} assessmentData - CoreCompetencyAssessmentDto에 해당하는 데이터
 */
export const updateAssessment = async (id, assessmentData) => {
  const payload = prepareDataForApi(assessmentData);
  const response = await axios.put(`${API_BASE_URL}/update/${id}`, payload);
  return response.data;
};

/**
 * 진단 평가를 삭제합니다.
 * @param {number} id - 삭제할 평가의 ID
 */
export const deleteAssessment = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
  return response.data; // "삭제 완료" 메시지 반환
};