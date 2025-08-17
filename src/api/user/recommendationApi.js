import axiosInstance from "../axiosInstance";

export const getRecommendedPrograms = async (
  assessmentNo,
  studentNo,
  limit = 15
) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/user/recommend/${encodeURIComponent(assessmentNo)}/${encodeURIComponent(studentNo)}`,
      { params: { limit } }
    );
    return data;
  } catch (error) {
    console.error("Error fetching recommended programs:", error);
    throw error;
  }
};

export const getRecommendedProgramsPage = async ({
  assessmentNo,
  studentNo,
  page = 0,
  size = 12,
  sort = "LATEST",
}) => {
  try {
    const { data } = await axiosInstance.get("/api/user/recommend", {
      params: { assessmentNo, studentNo, page, size, sort },
    });
    return data;
  } catch (error) {
    console.error("Error fetching paged recommended programs:", error);
    throw error;
  }
};

export const getRecommendedProgramsFlat = async (args) => {
  const pageData = await getRecommendedProgramsPage(args);
  if (Array.isArray(pageData?.content)) return pageData.content;
  if (Array.isArray(pageData)) return pageData;
  return [];
};
