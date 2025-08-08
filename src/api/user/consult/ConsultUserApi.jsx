import axios from "axios"

//상담 신청
export const applyConsult = async (applyInfo) => {
    const response = await axios.post("/api/consult/apply/new", applyInfo, );

    return response;
}

//상담신청 취소
export const applyCancel = async (applyId) => {
    const reponse = await axios.delete(`/api/consult/apply/cancel/${applyId}`);

    return reponse;
}

//상담내역 조회
// /api/consult/dscsnInfo/list
export const getConsultList = async (searchParams) => {
    const response = await axios.get("/api/consult/dscsnInfo/list", {params: searchParams});

    return response.data
}

//상담상태 변경
export const updateStatus = async (dscsnInfoId, status) => {
    const response = await axios.put(`/api/consult/dscsnInfo/list/${dscsnInfoId}`, {status});

    return response;
}

//상담결과 등록
export const registerResult = async (resultInfo) => {
    const response = await axios.post("/api/consult/dscsnInfo/list/result", resultInfo);

    return response;
}

//상담신청 페이지 상담항목 가져오기
export const getDscsnKind = async (prefix) => {
    const response = await axios.get(`api/consult/dscsnkind/get/${prefix}`);

    return response.data;
}

//상담 만족도 등록
export const registerSatis = async (satisInfo) => {
    const response = await axios.post("/api/consult/satisfaction", satisInfo)

    return response;
}

//일정 등록
export const registerSchedule = async (scheduleInfo, dscsnType) => {
    const response = await axios.post(`/api/consult/schedule/${dscsnType}`, scheduleInfo)

    return response;
}

//일정 조회
// /api/consult/schedule
// /api/consult/schedule/{page}


//일정 삭제
export const deleteSchedule = async (scheduleId) => {
    const response = await axios.delete(`/api/consult/schedule/${scheduleId}`);

    return response;
}