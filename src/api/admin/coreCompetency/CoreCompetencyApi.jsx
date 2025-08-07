
import axios from "axios";

// ✅ axios 공통 인스턴스 생성 (쿠키 자동 포함 + baseURL)
const axiosInstance = axios.create({
  withCredentials: true,
});

// 핵심역량진단목록 등록
export const getAllAssessmentList = () => {
  return axiosInstance.get(`/api/assessments/list`);
};

// 핵심역량진단목록 수정


// 핵심역량진단목록 삭제