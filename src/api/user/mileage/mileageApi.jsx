import axiosInstance from "../../axiosInstance";

// 나의 마일리지
export const getMileageSummary = async (studentNo, page=1, size=10) => {
  const res = await axiosInstance.get("/user/mileage/summary", {  
    params: { studentNo, page: page - 1, size },
  });
  return res.data;
};

// 장학금 사용자 정보 (PathVariable 버전)
export const getUserScholarshipInfo = async (studentNo) => {
  const res = await axiosInstance.get(`/user/scholarship/info/${studentNo}`);
  return res.data;
  // 쿼리파라미터 버전이면:
  // return (await axiosInstance.get("/user/scholarship/info", { params: { studentNo }})).data;
};

export const getBankCodes = async () => {
  return (await axiosInstance.get("/user/scholarship/banks")).data;
};

export const applyScholarship = async (payload) => {
  return (await axiosInstance.post("/user/scholarship/apply", payload)).data;
};

export const getScholarshipStatus = async (studentNo, page = 1, size = 10) => {
  const res = await axiosInstance.get(`/user/scholarship/status/${studentNo}`, {
    params: { page: page - 1, size }, // ← 여기!
  });
  return res.data;
  };