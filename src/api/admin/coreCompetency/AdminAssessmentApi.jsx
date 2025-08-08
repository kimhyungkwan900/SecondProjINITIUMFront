import axiosInstance from "../../axiosInstance";

// [1] 핵심역량 진단 전체 조회
export const getAllAssessments = () => {
  return axiosInstance.get(`/admin/assessment/all`);
};

// [2] 핵심역량 진단 등록 (POST)
export const createAssessment = (payload) => {
  return axiosInstance.post(`/admin/assessment/create`, payload);
};

// [3] 핵심역량 진단 수정 (PUT)
export const updateAssessment = (id, payload) => {
  return axiosInstance.put(`/admin/assessment/update/${id}`, payload);
};

// [4] 핵심역량 진단 삭제 (DELETE)
export const deleteAssessment = (id) => {
  return axiosInstance.delete(`/admin/assessment/delete/${id}`);
};
