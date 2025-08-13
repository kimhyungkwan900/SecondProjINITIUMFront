import axiosInstance from "../../axiosInstance";

// 핵심역량진단목록 전체 불러오기
export const getAllAssessmentList = () => {
  return axiosInstance.get(`/assessments/list`);
};

// 상세 목록: 컨트롤러 베이스(/api/assessments/list) + 하위 경로(/assessments/responded-details/{studentNo})
export const getMyRespondedAssessmentDetails = (studentNo) => {
  return axiosInstance.get(`/assessments/list/assessments/responded-details/${studentNo}`);
};

// (같은 규칙으로 쓰실 거면 아래 둘도 일관되게)
export const getMyRespondedAssessmentIds = (studentNo) => {
  return axiosInstance.get(`/assessments/list/assessments/responded/${studentNo}`);
};

export const hasRespondedAssessment = (assessmentId, studentNo) => {
  return axiosInstance.get(`/assessments/list/assessments/${assessmentId}/responded/${studentNo}`);
};

