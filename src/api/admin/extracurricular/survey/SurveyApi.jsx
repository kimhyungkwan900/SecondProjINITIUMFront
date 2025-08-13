import axiosInstance from "../../../axiosInstance";

export const fetchSurveyByProgram = async (eduMngId, page = 0, size = 5) => {
  try {
    const response = await axiosInstance.get("/extracurricular/survey/list", {
      params: {
        eduMngId,
        page,
        size
      }
    });
    return response.data; // Page<DTO> 형태
  } catch (error) {
    console.error("설문 응답 조회 실패:", error);
    return null;
  }
};
