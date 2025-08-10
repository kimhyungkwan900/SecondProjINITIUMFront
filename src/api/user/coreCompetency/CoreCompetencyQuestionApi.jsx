import axiosInstance from "../../axiosInstance";

// 핵심역량진단목록 전체 불러오기
export const getAllAssessments = () => {
  return axiosInstance.post(`/admin/core-competency/question/get/all`);
};