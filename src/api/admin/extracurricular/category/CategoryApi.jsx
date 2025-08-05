import axios from "axios";
import qs from "qs";

// 분류 체계 리스트 가져오기
export const getCategory = async ({ categoryId = null, programName = "", competencyIds = [], departmentCode = "" }) => {
  try {
    const response = await axios.get("/api/extracurricular/category", {
      params: { categoryId, programName, competencyIds, departmentCode },
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }), // 반복 형식으로 쿼리 직렬화
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("분류 체계 조회 실패:", error);
    throw error;
  }
};

//신규 분류 등록
export const insertCategory = async (categoryData) => {
    try{
        const response = await axios.post("/api/extracurricular/category", categoryData,{withCredentials: true})
        return response.data;
    }catch(error){
        console.log("저장 실패" + error);
        throw error;
    }
}

//분류 체계 삭제
export const deleteCategory = async (ctgryId) => {
    try{
        const response = await axios.delete("/api/extracurricular/category", {
            params: { ctgryId },
            withCredentials: true,
            });
        return response.data;
    }catch(error){
        console.log("삭제 실패" + error)
        throw error;
    }
}

//분류 체계 수정 
export const updateCategory = async (cateogryData) => {
  try {
    const response = await axios.put("/api/extracurricular/category", cateogryData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("수정 실패", error);
    throw error;
  }
};

// 부서(학과 가져오기)
export const getEmployees = async () => {
  try {
    const response = await axios.get("/api/extracurricular/category/employees", {
      withCredentials: true, // 쿠키 기반 인증이라면 꼭 필요
    });
    return response.data;
  } catch (error) {
    console.error("학교 조회 오류", error);
    throw error;
  }
};

// 로그인한 교직원이 속한 부서가 관리하는 분류 가져오기
export const getCategoryInEmpNo = async (empNo) => {
  try {
    const response = await axios.get(
      "/api/extracurricular/category/list",
      {
        params: { empId: empNo }, 
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("조회 오류", error);
    throw error;
  }
};