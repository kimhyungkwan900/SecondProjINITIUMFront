
import qs from "qs";
import axiosInstance from "../../../axiosInstance";

// 분류 체계 리스트 가져오기
export const getCategory = async ({
  categoryId = null,
  programName = "",
  competencyIds = [],
  departmentCode = "",
}) => {
  try {
    const response = await axiosInstance.get("/extracurricular/category", {
      params: { categoryId, programName, competencyIds, departmentCode },
      paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" }),
    });
    return response.data;
  } catch (error) {
    console.error("분류 체계 조회 실패:", error);
    throw error;
  }
};

// 신규 분류 등록
export const insertCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.post("/extracurricular/category", categoryData);
    return response.data;
  } catch (error) {
    console.log("저장 실패", error);
    throw error;
  }
};

// 분류 체계 삭제
export const deleteCategory = async (ctgryId) => {
  try {
    const response = await axiosInstance.delete("/extracurricular/category", {
      params: { ctgryId },
    });
    return response.data;
  } catch (error) {
    console.log("삭제 실패", error);
    throw error;
  }
};

// 분류 체계 수정
export const updateCategory = async (categoryData) => {
  try {
    const response = await axiosInstance.put("/extracurricular/category", categoryData);
    return response.data;
  } catch (error) {
    console.error("수정 실패", error);
    throw error;
  }
};

// 부서(학과) 가져오기
export const getEmployees = async () => {
  try {
    const response = await axiosInstance.get("/extracurricular/category/employees");
    return response.data;
  } catch (error) {
    console.error("학교 조회 오류", error);
    throw error;
  }
};

// 로그인한 교직원이 속한 부서가 관리하는 분류 가져오기
export const getCategoryInEmpNo = async (empNo) => {
  try {
    const response = await axiosInstance.get("/extracurricular/category/list", {
      params: { empId: empNo },
    });
    return response.data;
  } catch (error) {
    console.error("조회 오류", error);
    throw error;
  }
};
