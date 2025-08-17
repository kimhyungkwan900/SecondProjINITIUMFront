import { cleanParams } from "../../../../utils/apiUtils";
import axiosInstance from "../../../axiosInstance";

const BASE_PATH = "/admin/extracurricular";

/**
 * 비교과 프로그램을 등록합니다. (이미지 파일 포함)
 * @param {object} programData - 프로그램 데이터 DTO
 * @param {string} empId - 담당자 ID
 * @param {File} [imageFile] - 썸네일 이미지 파일 (선택 사항)
 * @returns {Promise<any>} 등록 성공 결과
 */
export const aplicationProgram = async (programData, empId, imageFile) => {
  const formData = new FormData();

  formData.append(
    "ExtracurricularFormDTO",
    new Blob([JSON.stringify(programData)], { type: "application/json" })
  );

  if (imageFile) {
    formData.append("image", imageFile);
  }

  const { data } = await axiosInstance.post(
    `${BASE_PATH}/application`,
    formData,
    { params: { empId } }
  );
  return data;
};

/**
 * 비교과 프로그램 목록을 조회합니다. (필터링 및 페이지네이션 포함)
 * @param {object} params - 조회 파라미터
 * @param {object} params.filter - 필터 조건 (keyword, status, departmentCode, eduType)
 * @param {number} [params.page=0] - 페이지 번호
 * @param {number} [params.size=10] - 페이지 크기
 * @returns {Promise<any>} 프로그램 목록 데이터
 */
export const fetchPrograms = async ({ filter, page = 0, size = 10 }) => {
  const params = cleanParams({
    ...filter,
    page,
    size,
  });
  const { data } = await axiosInstance.get(`${BASE_PATH}/program/list`, { params });
  return data;
};

/**
 * 비교과 프로그램의 상태(sttsNm)와 마일리지(eduMlg)를 업데이트합니다.
 * @param {object} payload - 업데이트에 필요한 데이터
 * @param {number} payload.eduMngId - 프로그램 관리 ID
 * @param {string} payload.sttsNm - 변경할 상태명
 * @param {number} payload.eduMlg - 설정할 마일리지
 * @param {object} [payload.surveyDTO] - 설문조사 DTO (선택 사항)
 * @returns {Promise<any>} 업데이트 성공 결과
 */
export const updateProgramStatus = async ({ eduMngId, sttsNm, eduMlg, surveyDTO }) => {
  const payload = {
    programUpdateFormDTO: { eduMngId, sttsNm, eduMlg },
    surveyDTO,
  };
  const { data } = await axiosInstance.put(`${BASE_PATH}/program/update`, payload);
  return data;
};