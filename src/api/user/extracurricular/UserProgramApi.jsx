import axiosInstance from "../../axiosInstance";
import qs from "qs";

// 비교과 프로그램 필터 조회
export const filterProgramList = async ({
  keyword,
  competencyIds,
  statusFilter,
  page = 0,
  size = 10,
}) => {
  try {
    const params = { page, size };
    if (keyword) params.keyword = keyword;
    if (Array.isArray(competencyIds) && competencyIds.length > 0) {
      params.competencyIds = competencyIds;
    }
    if (statusFilter) params.statusFilter = statusFilter;

    const response = await axiosInstance.get(
      "/user/extracurricular/program/list",
      {
        params,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }), 
          // competencyIds=1&competencyIds=2 형식으로 변환
      }
    );
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

export const getMyProgramList = async({
    stdfntNo,
    eduFnshYn,
    keyword,
    page = 0,
    size = 5,
    sort = "eduAplyId",
    direction = "DESC",
  }) => {
  try{
      const params = { stdfntNo, eduFnshYn, keyword ,page, size, sort, direction };
      const response = await axiosInstance.get("/user/extracurricular/program/mylist", { params });
      return response.data;
  }catch(error) {
    console.error("신청한 프로그램 목록 요청 실패", error);
    throw error;
  }
}