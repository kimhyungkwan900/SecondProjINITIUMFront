import axiosInstance from "../../axiosInstance";
import { unwrap, buildParamsWithSort } from "../../../utils/apiUtils";

// 학생 단건 조회
export const fetchStudentByNo = async (studentNo) => {
  try {
    const res = await axiosInstance.get(`/students/${studentNo}`);
    return res.data;
  } catch (error) {
    unwrap(error);
  }
};

export const fetchStudents = async (searchParams = {}) => {
  try {
    const { cleaned, serializer } = buildParamsWithSort({
      page: 0,
      size: 15,
      sort: "studentNo,asc",
      ...searchParams,
    });

    const response = await axiosInstance.get("/students", { 
      params: cleaned,
      paramsSerializer: serializer 
    });
    
    return response.data;
  } catch (error) {
    unwrap(error);
  }
};

// 학생 등록
export const enrollStudent = async (enrollDto) => {
  try {
    const response = await axiosInstance.post("/students", enrollDto);
    return response.data;
  } catch (error) {
    unwrap(error);
  }
};

// 자기정보 수정
export const updateMyInfo = async (studentNo, updateDto) => {
  try {
    const response = await axiosInstance.put(`/students/${studentNo}/my-info`, updateDto);
    return response.data;
  } catch (error) {
    unwrap(error);
  }
};

// 관리자 학생 정보 수정
export const adminUpdateStudentInfo = async (studentNo, adminUpdateDto) => {
  try {
    const response = await axiosInstance.put(`/students/${studentNo}/admin-info`, adminUpdateDto);
    return response.data;
  } catch (error) {
    unwrap(error);
  }
};

// 학생 상태 변경
export const changeStudentStatus = async (studentNo, statusCode, statusCodeSe = "SL0030") => {
  try {
    const response = await axiosInstance.patch(`/students/${studentNo}/status`, { 
      statusCode,
      statusCodeSe 
    });
    return response.data;
  } catch (error) {
    unwrap(error);
  }
};

// 검색 조건 유효성 검증
export const validateSearchParams = (searchParams) => {
  const errors = {};

  // 학년 유효성 검증
  if (searchParams.grade && (
    isNaN(searchParams.grade) || 
    parseInt(searchParams.grade) < 1 || 
    parseInt(searchParams.grade) > 4
  )) {
    errors.grade = "학년은 1-4 사이의 숫자여야 합니다.";
  }

  // 이메일 기본 형식 검증
  if (searchParams.email && !searchParams.email.includes("@")) {
    errors.email = "이메일 형식이 올바르지 않습니다.";
  }

  // 날짜 범위 검증
  if (searchParams.admissionDateFrom && searchParams.admissionDateTo) {
    const fromDate = new Date(searchParams.admissionDateFrom);
    const toDate = new Date(searchParams.admissionDateTo);
    
    if (fromDate > toDate) {
      errors.admissionDate = "입학일자 시작일이 종료일보다 늦을 수 없습니다.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// 검색 조건 URL 쿼리 변환
export const buildSearchQuery = (searchParams) => {
  const query = new URLSearchParams();
  
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      query.append(key, value);
    }
  });
  
  return query;
};

// URL 쿼리 파라미터 검색 조건 객체로 변환
export const parseSearchQuery = (searchParams) => {
  const params = {};
  
  for (const [key, value] of searchParams.entries()) {
    if (key === 'page' || key === 'size') {
      params[key] = parseInt(value);
    } else {
      params[key] = value;
    }
  }
  
  return params;
};