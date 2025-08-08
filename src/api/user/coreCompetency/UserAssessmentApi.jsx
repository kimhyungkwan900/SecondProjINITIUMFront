import axiosInstance from "../../axiosInstance";

// 핵심역량진단목록 전체 불러오기
export const getAllAssessmentList = () => {
  return axiosInstance.get(`/assessments/list`);
};


