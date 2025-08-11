import axiosInstance from "../../axiosInstance";

// 학생 단건 조회
export const fetchStudentByNo = async (studentNo) => {
  try {
    const res = await axiosInstance.get(`/students/${studentNo}`);
    return res.data;
  } catch (error) {
    console.error(`학생 조회 실패 (학번: ${studentNo}):`, error);
    throw error;
  }
};

export const fetchStudents = async (searchParams = {}) => {
  const {
    studentNo = "",
    name = "",
    universityCode = "",
    schoolSubjectCode = "",
    schoolSubjectCodeSe = "",
    clubCode = "",
    studentStatusCode = "",
    studentStatusCodeSe = "",
    grade = "",
    genderCode = "",
    genderCodeSe = "",
    advisorId = "",
    email = "",
    admissionDateFrom = "",
    admissionDateTo = "",
    page = 0,
    size = 15,
    sort = "studentNo,asc"
  } = searchParams;

  try {
    // 빈 문자열인 파라미터는 제거하여 요청
    const params = Object.fromEntries(
      Object.entries({
        studentNo,
        name,
        universityCode,
        schoolSubjectCode,
        schoolSubjectCodeSe,
        clubCode,
        studentStatusCode,
        studentStatusCodeSe,
        grade,
        genderCode,
        genderCodeSe,
        advisorId,
        email,
        admissionDateFrom,
        admissionDateTo,
        page,
        size,
        sort
      }).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
    );

    console.log("[API 요청 파라미터]", params);

    const response = await axiosInstance.get("/students", { params });
    
    console.log("[API 응답]", {
      totalElements: response.data.totalElements,
      totalPages: response.data.totalPages,
      currentPage: response.data.number,
      size: response.data.size
    });

    return response.data;
  } catch (error) {
    console.error("학생 목록 조회 실패:", error);
    throw error;
  }
};

// 학생 등록
export const enrollStudent = async (enrollDto) => {
  try {
    const response = await axiosInstance.post("/students", enrollDto);
    console.log("학생 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("학생 등록 실패:", error);
    throw error;
  }
};

// 자기정보 수정
export const updateMyInfo = async (studentNo, updateDto) => {
  try {
    const response = await axiosInstance.put(`/students/${studentNo}/my-info`, updateDto);
    console.log("학생 본인 정보 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(`학생 본인 정보 수정 실패 (학번: ${studentNo}):`, error);
    throw error;
  }
};

// 관리자 학생 정보 수정
export const adminUpdateStudentInfo = async (studentNo, adminUpdateDto) => {
  try {
    const response = await axiosInstance.put(`/students/${studentNo}/admin-info`, adminUpdateDto);
    console.log("관리자 학생 정보 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(`관리자 학생 정보 수정 실패 (학번: ${studentNo}):`, error);
    throw error;
  }
};

// 학생 상태 변경
export const changeStudentStatus = async (studentNo, statusCode, statusCodeSe = "SL0030") => {
  try {
    const response = await axiosInstance.patch(`/students/${studentNo}/status`, { 
      statusCode,
      statusCodeSe 
    });
    console.log("학생 상태 변경 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error(`학생 상태 변경 실패 (학번: ${studentNo}):`, error);
    throw error;
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