import axiosInstance from "../../axiosInstance";

// 마일리지 요약 조회
export const getMileageSummary = async (studentNo, page = 1, size = 10) => {
  const response = await axiosInstance.get("/user/mileage/summary", {
    params: { studentNo, page, size },
  });
  return response.data;
};