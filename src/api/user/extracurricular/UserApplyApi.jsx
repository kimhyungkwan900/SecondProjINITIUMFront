import axiosInstance from "../../axiosInstance";

// 비교과 프로그램 등록
export const programApply = async (stdfntNo, eduMngId, eduAplyCn) => {
  try {
    const response = await axiosInstance.post(
      `/extracurricular/apply`,
      {
        extracurricularProgram: {
          eduMngId,
        },
        eduAplyCn,
      },
      {
        params: { stdfntNo },
      }
    );
    return response.data; // 성공 메시지 반환
  } catch (error) {
    // 에러 응답 처리
    if (error.response) {
      throw new Error(error.response.data.message || "신청 중 오류 발생");
    } else {
      throw new Error("서버에 연결할 수 없습니다.");
    }
  }
};

export const applyList = async (stdntNo, aprySttsNm, keyword, page = 0, size = 10) => {
  const params = { stdntNo, page, size };
  if (aprySttsNm) params.aprySttsNm = aprySttsNm;
  if (keyword) params.keyword = keyword;

  const response = await axiosInstance.get("/extracurricular/applies", { params });
  return response.data;
};

export const cancleApply = async (eduAplyId) => {
  try {
    const response = await axiosInstance.delete("/extracurricular/apply/cancel", {
      params: { eduAplyId },
    });
    return response.data; // "비교과 프로그램 신청이 취소되었습니다." 반환
  } catch (error) {
    console.error("신청 취소 실패", error);
    throw error; // 호출한 쪽에서 try/catch로 처리 가능
  }
};