import axiosInstance from "../../../axiosInstance";

export const updateApply = async (applyUpdates) => {
  try {
    const response = await axiosInstance.put("/extracurricular/admin/status/batch", applyUpdates);
    return response.data;
  } catch (error) {
    console.error("신청 상태 업데이트 실패", error);
    throw error;
  }
};