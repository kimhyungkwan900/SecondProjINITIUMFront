import axiosInstance from "../../axiosInstance";

// 핵심역량결과진단목록 전체 불러오기
export const getAllAssessmentResultList = () => {
  return axiosInstance.get(`/assessments/list/result`);
};