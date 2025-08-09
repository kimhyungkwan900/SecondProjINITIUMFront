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
