import axiosInstance from "../../axiosInstance";


// 상담 신청
export const applyConsult = async (applyInfo) => {
    const response = await axiosInstance.post("/consult/apply/new", applyInfo);
    return response.data;
};

// 상담신청 취소
export const applyCancel = async (applyId) => {
    const response = await axiosInstance.delete(`/consult/apply/cancel/${applyId}`);
    return response.data;
};

// 상담내역 조회
export const getConsultList = async (params) => {
    const { page, ...queryParams } = params;
    return axiosInstance.get(`/consult/dscsnInfo/list/${page}`, { params: queryParams });
};

// 상담상태 변경
export const updateStatus = async (dscsnInfoId, status) => {
    const response = await axiosInstance.put(`/consult/dscsnInfo/list/${dscsnInfoId}`, { status });
    return response.data;
};

// 상담결과 등록
export const registerResult = async (resultInfo) => {
    const response = await axiosInstance.post("/consult/dscsnInfo/list/result", resultInfo);
    return response.data;
};

// 상담신청 페이지 상담항목 가져오기
export const getDscsnKind = async (prefix) => {
    const response = await axiosInstance.get(`/consult/dscsnkind/get/${prefix}`);
    return response.data;
};

// 상담 만족도 등록
export const registerSatis = async (satisInfo) => {
    const response = await axiosInstance.post("/consult/satisfaction", satisInfo);
    return response.data;
};

// 일정 등록
export const registerSchedule = async (scheduleInfo, dscsnType) => {
    const response = await axiosInstance.post(`/consult/schedule/${dscsnType}`, scheduleInfo);
    return response.data;
};

// 일정 삭제
export const deleteSchedule = async (scheduleId) => {
    const response = await axiosInstance.delete(`/consult/schedule/${scheduleId}`);
    return response.data;
};
