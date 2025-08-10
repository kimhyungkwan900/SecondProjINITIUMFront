import axiosInstance from "../../axiosInstance";

// 비교과 프로그램 필터 조회
export const filterProgramList = async ({
  keyword,
  competencyIds,
  statusFilter,
  page = 0,
  size = 10,
}) => {
  try {
    // params: 객체로 처리 (배열 지원)
    const params = {
      page,
      size,
    };
    if (keyword) params.keyword = keyword;
    if (Array.isArray(competencyIds) && competencyIds.length > 0) {
      params.competencyIds = competencyIds; // axios는 자동 배열 쿼리 변환
    }
    if (statusFilter) params.statusFilter = statusFilter;

    const response = await axiosInstance.get("/user/extracurricular/program/list", { params });
    return response.data;
  } catch (error) {
    console.error("🔥 필터 프로그램 목록 요청 실패", error);
    throw error;
  }
};

// 비교과 프로그램 상세 조회
export const programDetail = async (eduMngId) => {
  try {
    const response = await axiosInstance.get("/user/extracurricular/program", {
      params: { eduMngId },
    });
    return response.data;
  } catch (error) {
    console.error("프로그램 상세 조회 오류:", error);
    throw error;
  }
};

// 내가 신청한 비교과 프로그램 목록 조회
export const getAppliedProgramList = async ({
  page = 0,
  size = 5,
  sort = "eduAplyId",
  direction = "DESC",
}) => {
  try {
    const params = { page, size, sort, direction };
    const response = await axiosInstance.get("/user/extracurricular/program/applied", { params });
    return response.data;
  } catch (error) {
    console.error("신청한 프로그램 목록 요청 실패", error);
    throw error;
  }
};
