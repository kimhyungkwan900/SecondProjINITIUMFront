import { buildParamsWithSort, unwrap } from "../../utils/apiUtils";
import axiosInstance from "../axiosInstance";

// 학과(부서) 조회
export const fetchSchoolSubjects = async (params = {}) => {
  try {
    const { cleaned, serializer } = buildParamsWithSort({
      page: 0,
      size: 20,
      sort: "subjectName,asc",
      ...params,
    });

    const response = await axiosInstance.get("/scsbjt", {
      params: cleaned,
      paramsSerializer: serializer,
      signal: params?.signal,
    });

    return response.data;
  } catch (error) {
    unwrap(error);
  }
};

// 학과(부서) 단건조회
export const fetchSchoolSubjectByCode = async (subjectCode, opts = {}) => {
  try {
    const response = await axiosInstance.get(`/scsbjt/${encodeURIComponent(subjectCode)}`, {
      signal: opts?.signal,
    });
    return response.data;
  } catch (error) {
    unwrap(error);
  }
};

// Select Option 용 요청 Api
export const fetchSchoolSubjectOptions = async (params = {}) => {
  try {
    const { cleaned, serializer } = buildParamsWithSort({
      page: 0,
      size: 1000,
      sort: "subjectName,asc",
      ...params,
    });

    const response = await axiosInstance.get("/scsbjt/options", {
      params: cleaned,
      paramsSerializer: serializer,
      signal: params?.signal,
    });

    return response.data;
  } catch (error) {
    unwrap(error);
  }
};

// 유효성검증
export const validateScsbjtParams = (params = {}) => {
  const errors = {};

  if (params?.q && String(params.q).length > 100) {
    errors.q = "검색어는 100자 이내여야 합니다.";
  }
  if (params?.size && (isNaN(params.size) || params.size < 1 || params.size > 1000)) {
    errors.size = "size는 1~1000 사이의 숫자여야 합니다.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};