
import axios from "axios";

// ✅ axios 공통 인스턴스 생성 (쿠키 자동 포함 + baseURL)
const axiosInstance = axios.create({
  withCredentials: true,
});

// 핵심역량진단목록 전체 불러오기
export const getAllAssessmentList = () => {
  return axiosInstance.get(`/api/assessments/list`);
};
