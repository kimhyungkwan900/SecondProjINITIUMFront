import { cleanParams } from "../../../utils/apiUtils";
import axiosInstance from "../../axiosInstance";

const BASE_PATH = "/consult";

/**
 * 상담을 신청합니다.
 * @param {object} applyInfo - 상담 신청 정보
 * @returns {Promise<any>} 신청 결과
 */
export const applyConsult = async (applyInfo) => {
    const { data } = await axiosInstance.post(`${BASE_PATH}/apply/new`, applyInfo);
    return data;
};

/**
 * 상담 신청을 취소합니다.
 * @param {number | string} applyId - 취소할 상담 신청 ID
 * @returns {Promise<any>} 취소 결과
 */
export const applyCancel = async (applyId) => {
    const { data } = await axiosInstance.post(`${BASE_PATH}/apply/cancel/${applyId}`);
    return data;
};

/**
 * 상담 내역 목록을 조회합니다.
 * @param {object} params - 페이지 및 필터링 정보
 * @returns {Promise<any>} 상담 내역 목록
 */
export const getConsultList = async (params) => {
    const { page, ...queryParams } = params;
    const cleanedParams = cleanParams(queryParams);
    const { data } = await axiosInstance.get(`${BASE_PATH}/dscsnInfo/list/${page}`, { params: cleanedParams });
    return data;
};

/**
 * 상담 상태를 '예약완료'로 변경합니다.
 * @param {number | string} dscsnInfoId - 상담 정보 ID
 * @returns {Promise<any>} 상태 변경 결과
 */
export const updateStatus = async (dscsnInfoId) => {
    const { data } = await axiosInstance.put(
        `${BASE_PATH}/dscsnInfo/list/${dscsnInfoId}`,
        "예약완료", // text/plain 타입으로 payload 전송
        { headers: { "Content-Type": "text/plain; charset=UTF-8" } }
    );
    return data;
};

/**
 * 상담 결과를 등록합니다.
 * @param {object} resultInfo - 상담 결과 정보
 * @returns {Promise<any>} 등록 결과
 */
export const registerResult = async (resultInfo) => {
    const { data } = await axiosInstance.post(`${BASE_PATH}/dscsnInfo/list/result`, resultInfo);
    return data;
};

/**
 * 상담 신청 페이지에서 사용할 상담 항목 목록을 가져옵니다.
 * @param {string} prefix - 상담 항목 분류 prefix
 * @returns {Promise<any[]>} 상담 항목 목록
 */
export const getDscsnKind = async (prefix) => {
    const { data } = await axiosInstance.get(`${BASE_PATH}/dscsnkind/get/${prefix}`);
    return data;
};

/**
 * 상담 만족도를 등록합니다.
 * @param {object} satisInfo - 만족도 정보
 * @returns {Promise<any>} 등록 결과
 */
export const registerSatis = async (satisInfo) => {
    const { data } = await axiosInstance.post(`${BASE_PATH}/satisfaction`, satisInfo);
    return data;
};

/**
 * 특정 상담에 대한 만족도 조사가 이미 존재하는지 확인합니다.
 * @param {number | string} dscsnInfoId - 상담 정보 ID
 * @returns {Promise<boolean>} 만족도 존재 여부
 */
export const isSatisExist = async (dscsnInfoId) => {
    const { data } = await axiosInstance.get(`${BASE_PATH}/satisfaction/exist/${dscsnInfoId}`);
    return data;
};

/**
 * 상담 종류와 교직원 번호로 가능한 상담 일정을 조회합니다.
 * @param {string} dscsnType - 상담 종류
 * @param {string} empNo - 교직원 번호
 * @returns {Promise<any[]>} 상담 가능 일정 목록
 */
export const getSchedules = async (dscsnType, empNo) => {
    const params = cleanParams({ dscsnType, empNo });
    const { data } = await axiosInstance.get(`${BASE_PATH}/schedule`, { params });
    return data;
};

/**
 * 특정 상담 일정의 상세 정보를 조회합니다.
 * @param {number | string} dscsnDtId - 상담 상세 일정 ID
 * @returns {Promise<any>} 상담 일정 상세 정보
 */
export const getScheduleById = async (dscsnDtId) => {
    const { data } = await axiosInstance.get(`${BASE_PATH}/schedule/${dscsnDtId}`);
    return data;
};

/**
 * 새로운 상담 일정을 등록합니다.
 * @param {object[]} scheduleInfos - 등록할 일정 정보 배열
 * @returns {Promise<any>} 등록 결과
 */
export const registerSchedule = async (scheduleInfos) => {
    const { data } = await axiosInstance.post(`${BASE_PATH}/schedule/new`, scheduleInfos);
    return data;
};

/**
 * 상담 일정을 삭제합니다.
 * @param {number[]} scheduleIds - 삭제할 상담 일정 ID 배열
 * @returns {Promise<any>} 삭제 결과
 */
export const deleteSchedule = async (scheduleIds) => {
    const { data } = await axiosInstance.delete(`${BASE_PATH}/schedule/delete`, { data: scheduleIds });
    return data;
};

/**
 * 특정 교직원에게 배정된 상담 목록을 조회합니다.
 * @param {string} empNo - 교직원 번호
 * @returns {Promise<any[]>} 상담 목록
 */
export const fetchConsultsByEmp = async (empNo) => {
    const { data } = await axiosInstance.get(`${BASE_PATH}/schedule/by-emp`, {
        params: { empNo },
    });
    return data;
};