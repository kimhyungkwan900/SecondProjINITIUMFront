import axiosInstance from "../../axiosInstance";

// 핵심역량진단목록 등록
export const getAllAssessmentList = () => {
  return axiosInstance.get(`/assessments/list`);
};

// 핵심역량진단목록 수정


// 핵심역량진단목록 삭제