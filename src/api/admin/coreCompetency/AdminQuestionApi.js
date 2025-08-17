import axiosInstance from '../../axiosInstance'; // 공통 axios 인스턴스 임포트

// 이 모듈에서 사용할 API의 기본 경로를 상수로 정의합니다.
const BASE_PATH = '/admin/coreCompetency/question';

/**
 * 특정 진단에 새로운 핵심역량 문항을 생성합니다.
 * @param {number | string} assessmentId - 진단 평가 ID
 * @param {object} questionDto - 생성할 문항 데이터
 * @returns {Promise<any>} 생성된 문항 데이터
 */
export const createCoreCompetencyQuestion = async (assessmentId, questionDto) => {
  const { data } = await axiosInstance.post(`${BASE_PATH}/create/${assessmentId}`, questionDto);
  return data;
};

/**
 * 기존 핵심역량 문항을 수정합니다.
 * @param {number | string} questionId - 수정할 문항 ID
 * @param {object} questionDto - 수정할 문항 데이터
 * @returns {Promise<any>} 수정된 문항 데이터
 */
export const updateCoreCompetencyQuestion = async (questionId, questionDto) => {
  const { data } = await axiosInstance.put(`${BASE_PATH}/update/${questionId}`, questionDto);
  return data;
};

/**
 * 핵심역량 문항을 삭제합니다.
 * @param {number | string} questionId - 삭제할 문항 ID
 * @returns {Promise<any>} 삭제 성공 결과
 */
export const deleteCoreCompetencyQuestion = async (questionId) => {
  const { data } = await axiosInstance.delete(`${BASE_PATH}/delete/${questionId}`);
  return data;
};

/**
 * 특정 핵심역량 문항 정보를 조회합니다.
 * @param {number | string} questionId - 조회할 문항 ID
 * @returns {Promise<any>} 문항 상세 데이터
 */
export const getCoreCompetencyQuestion = async (questionId) => {
  const { data } = await axiosInstance.get(`${BASE_PATH}/get/${questionId}`);
  return data;
};

/**
 * 모든 핵심역량 문항 목록을 조회합니다.
 * @returns {Promise<any[]>} 전체 문항 목록
 */
export const getAllCoreCompetencyQuestions = async () => {
  const { data } = await axiosInstance.get(`${BASE_PATH}/get/all`);
  return data;
};

/**
 * 특정 문항의 선택지(답변) 개수를 설정합니다.
 * @param {number | string} questionId - 문항 ID
 * @param {number} count - 설정할 선택지 개수
 * @returns {Promise<any>} 변경 결과
 */
export const setAnswerOptionCount = async (questionId, count) => {
  const { data } = await axiosInstance.patch(`${BASE_PATH}/${questionId}/option-count`, null, {
    params: { count },
  });
  return data;
};

/**
 * 특정 진단에 포함된 모든 문항을 조회합니다.
 * @param {number | string} assessmentId - 진단 평가 ID
 * @returns {Promise<any[]>} 해당 진단의 문항 목록
 */
export const getQuestionsByAssessment = async (assessmentId) => {
  const { data } = await axiosInstance.get(`${BASE_PATH}/assessment/${assessmentId}`);
  return data;
};

/**
 * 특정 진단에 포함된 모든 하위 역량(Subcategory) 목록을 조회합니다.
 * @param {number | string} assessmentId - 진단 평가 ID
 * @returns {Promise<any[]>} 해당 진단의 하위 역량 목록
 */
export const getSubCategoriesByAssessment = async (assessmentId) => {
  const { data } = await axiosInstance.get(`${BASE_PATH}/assessment/${assessmentId}/subcategories`);
  return data;
};