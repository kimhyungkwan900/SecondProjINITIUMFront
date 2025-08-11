import axiosInstance from "../../../axiosInstance";

export const attendanceList = async (eduShdlId) => {
  const response = await axiosInstance.get("/admin/extracurricular/attendance/list", {
    params: { eduShdlId },
  });
  return response.data; 
}

export const attendanceUpdate = async (eduShdlId, attendanceMap) => {
  try {
    const response = await axiosInstance.put(
      "/admin/extracurricular/attendance/save",
      attendanceMap,
      {
        params: { eduShdlId }
      }
    );
    return response.data; // 성공 메시지 등 반환
  } catch (error) {
    console.error("출석 상태 저장 실패:", error);
    throw error;
  }
};