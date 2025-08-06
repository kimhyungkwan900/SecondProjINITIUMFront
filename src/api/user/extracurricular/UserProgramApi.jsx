import axios from "axios";

export const filterProgramList = async ({ keyword, competencyIds, statusFilter ,page = 0, size = 10 }) => {
  try {
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (Array.isArray(competencyIds) && competencyIds.length > 0) {
      competencyIds.forEach(id => {
        if (id !== null && id !== undefined) {
          params.append("competencyIds", id);
        }
      });
    }
    params.append("page", page);
    params.append("size", size);
    if (statusFilter) params.append("statusFilter", statusFilter);

    const response = await axios.get(`/api/user/extracurricular/program/list`, {
      params: params,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("🔥 필터 프로그램 목록 요청 실패", error);
    throw error;
  }
};


export const programDetail = async (eduMngId) => {
  try {
    const response = await axios.get(`/api/user/extracurricular/program`, {
      params: {
        eduMngId: eduMngId
      },
       withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("프로그램 상세 조회 오류:", error);
    throw error;
  }
};