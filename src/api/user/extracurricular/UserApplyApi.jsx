import axios from "axios"

export const programApply = async (stdfntNo, eduMngId, eduAplyCn) => {
  try {
    const response = await axios.post(`/api/extracurricular/apply?stdfntNo=${stdfntNo}`,
      {
        extracurricularProgram: {
          eduMngId: eduMngId, 
        },
        eduAplyCn: eduAplyCn,
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