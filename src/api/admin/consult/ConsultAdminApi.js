import { buildParamsWithSort } from "../../../utils/apiUtils";
import axiosInstance from "../../axiosInstance";


// API 엔드포인트의 공통 경로를 상수로 관리하여 실수를 줄이고 유지보수를 용이하게 합니다.
const BASE_URL = "/admin/consult/dscsnkind";

/**
 * 신규 상담 항목을 추가합니다.
 * @param {object} kindInfo - 추가할 상담 항목 정보
 * @returns {Promise<any>} API 응답 데이터
 */
export const addDscsnKind = async (kindInfo) => {
  const { data } = await axiosInstance.post(`${BASE_URL}/new`, kindInfo);
  return data;
};

/**
 * 상담 항목 목록을 조회합니다. 페이지, 정렬, 검색을 지원합니다.
 * @param {object} [searchParams={}] - 조회 조건 (page, sort, 검색 필드 등)
 * @returns {Promise<any>} API 응답 데이터
 */
export const findDscsnKind = async (searchParams = {}) => {
  const { page, ...rest } = searchParams;
  const { cleaned, serializer } = buildParamsWithSort(rest); // 파라미터 정리 및 정렬 직렬화

  // page 파라미터 유무에 따라 동적으로 URL을 생성합니다.
  const url = page !== undefined && page !== null ? `${BASE_URL}/${page}` : BASE_URL;

  const { data } = await axiosInstance.get(url, {
    params: cleaned,
    paramsSerializer: serializer, // 정렬(sort) 파라미터를 위한 커스텀 직렬화 적용
  });
  return data;
};

/**
 * 상담 항목 정보를 수정합니다.
 * @param {object} updateInfo - 수정할 상담 항목 정보
 * @returns {Promise<any>} API 응답 데이터
 */
export const updateDscsnKind = async (updateInfo) => {
  const { data } = await axiosInstance.put(`${BASE_URL}/update`, updateInfo);
  return data;
};

/**
 * 지정된 ID의 상담 항목들을 삭제합니다.
 * @param {number[]} dscsnKindIds - 삭제할 상담 항목 ID 배열
 * @returns {Promise<any>} API 응답 데이터
 */
export const deleteDscsnKind = async (dscsnKindIds) => {
  const { data } = await axiosInstance.delete(`${BASE_URL}/delete`, { data: dscsnKindIds });
  return data;
};