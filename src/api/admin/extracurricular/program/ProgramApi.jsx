import axios from "axios"

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
        const response = await axios.post("/api/admin/extracurricular/aplication", formData, {
            params: { empId },
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("등록 실패: ", error);
        throw error;
    }
};


// 비교과 프로그램 조회 필터포함
export const fetchPrograms = async (filter, page = 0, size = 10) => {
  try {
    const response = await axios.get('/api/admin/extracurricular/program/list', {
      params: {
        keyword: filter.keyword,
        status: filter.status,
        departmentCode: filter.departmentCode,
        page,
        size,
      },withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('프로그램 불러오기 실패', error);
  }
};

// 비교과 프로그램 업데이트 함수
export const updateProgramStatus = async (eduMngId, eduSttsCd) => {
  try {
    const dto = {
      eduMngId,
      eduSttsCd,
    };

    const response = await axios.put(
      "/api/admin/extracurricular/program/update",
      dto, // 👈 바디에 DTO가 들어가야 함
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("상태 변경 실패:", error);
    throw error;
  }
};