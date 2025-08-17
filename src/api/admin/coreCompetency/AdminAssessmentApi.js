import axiosInstance from '../../axiosInstance'; // 공통 axios 인스턴스 임포트

// 이 모듈에서 사용할 API의 기본 경로를 상수로 정의합니다.
const ASSESSMENT_PATH = '/admin/assessment';
const RESPONSE_PATH = '/response';

/**
 * API 요청을 위해 평가 데이터를 준비합니다. (주로 날짜 형식 변환)
 * 'yyyy-MM-dd' 형식의 날짜를 'yyyyMMdd'로 변경합니다.
 * @param {object} data - 프론트엔드에서 사용하는 평가 데이터
 * @returns {object} API DTO 형식에 맞는 데이터
 */
const prepareAssessmentData = (data) => {
  const formatDate = (dateString) => (dateString ? dateString.replace(/-/g, '') : undefined);

  return {
    ...data,
    startDate: formatDate(data.startDate),
    endDate: formatDate(data.endDate),
    registerDate: formatDate(data.registerDate),
  };
};

/**
 * 모든 진단 평가 목록을 조회합니다.
 * @returns {Promise<any>} 진단 평가 목록 데이터
 */
export const getAllAssessments = async () => {
  const { data } = await axiosInstance.get(`${ASSESSMENT_PATH}/all`);
  return data;
};

/**
 * 새로운 진단 평가를 생성합니다.
 * @param {object} assessmentData - 생성할 평가 데이터
 * @returns {Promise<any>} 생성된 평가 데이터
 */
export const createAssessment = async (assessmentData) => {
  const payload = prepareAssessmentData(assessmentData);
  const { data } = await axiosInstance.post(`${ASSESSMENT_PATH}/create`, payload);
  return data;
};

/**
 * ID로 기존 진단 평가를 수정합니다.
 * @param {number | string} id - 수정할 평가의 ID
 * @param {object} assessmentData - 수정할 평가 데이터
 * @returns {Promise<any>} 수정된 평가 데이터
 */
export const updateAssessment = async (id, assessmentData) => {
  const payload = prepareAssessmentData(assessmentData);
  const { data } = await axiosInstance.put(`${ASSESSMENT_PATH}/update/${id}`, payload);
  return data;
};

/**
 * ID로 진단 평가를 삭제합니다.
 * @param {number | string} id - 삭제할 평가의 ID
 * @returns {Promise<any>} 삭제 성공 메시지
 */
export const deleteAssessment = async (id) => {
  const { data } = await axiosInstance.delete(`${ASSESSMENT_PATH}/delete/${id}`);
  return data;
};

/**
 * 특정 진단에 학생의 응답이 이미 존재하는지 확인합니다.
 * @param {number | string} id - 진단 평가 ID
 * @param {string} studentNo - 학생 번호
 * @returns {Promise<boolean>} 응답 존재 여부
 */
export const checkDuplicate = async (id, studentNo) => {
  const { data } = await axiosInstance.get(`${RESPONSE_PATH}/check/${id}/${studentNo}`);
  return data;
};