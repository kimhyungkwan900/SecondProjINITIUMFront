import axiosInstance from "../../axiosInstance";

/**
 * 모든 핵심 역량 진단 결과 목록을 조회합니다.
 * @returns {Promise<any[]>} 진단 결과 목록 데이터
 */
export const getAllAssessmentResultList = async () => {
  const { data } = await axiosInstance.get('/assessments/list/result');
  return data;
};