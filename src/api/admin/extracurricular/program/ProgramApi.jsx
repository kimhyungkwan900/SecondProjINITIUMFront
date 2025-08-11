import axiosInstance from "../../../axiosInstance";


// 비교과 프로그램 등록 요청
export const aplicationProgram = async (ExtracurricularFormDTO, empId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append(
      "ExtracurricularFormDTO",
      new Blob([JSON.stringify(ExtracurricularFormDTO)], {
        type: "application/json",
      })
    );
    if (imageFile) {
      formData.append("image", imageFile);
    }
    const response = await axiosInstance.post(
      "/admin/extracurricular/application",
      formData,
      {
        params: { empId },
        headers: {
          // multipart/form-data는 axios가 boundary를 자동으로 처리함
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("등록 실패: ", error);
    throw error;
  }
};

// 비교과 프로그램 조회 (필터 포함)
export const fetchPrograms = async (filter, page = 0, size = 10) => {
  try {
    const response = await axiosInstance.get("/admin/extracurricular/program/list", {
      params: {
        keyword: filter.keyword,
        status: filter.status,
        departmentCode: filter.departmentCode,
        eduType: filter.eduType,
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("프로그램 불러오기 실패", error);
    throw error;
  }
};

// 비교과 프로그램 상태 업데이트
export const updateProgramStatus = async (eduMngId, sttsNm, eduMlg, surveyDTO) => {
  try {
    const payload = {
      programUpdateFormDTO: {
        eduMngId,
        sttsNm,
        eduMlg,
      },
      surveyDTO,
    };

    const response = await axiosInstance.put("/admin/extracurricular/program/update", payload);
    return response.data;
  } catch (error) {
    console.error("상태 변경 실패:", error);
    throw error;
  }
};