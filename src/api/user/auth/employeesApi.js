
import { unwrap, buildParamsWithSort } from "../../../utils/apiUtils";
import axiosInstance from "../../axiosInstance";

// ---------- 단건 ----------
export const fetchEmployeeByNo = async (empNo, { signal } = {}) => {
  try {
    if (!empNo?.trim()) throw new Error("사번(empNo)은 필수입니다.");
    const { data } = await axiosInstance.get(`/employees/${encodeURIComponent(empNo)}`, { signal });
    return data; // EmployeeDto
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 임용(신규 등록) ----------
export const appointProfessor = async (dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.post("/employees/appoint/professor", dto, { signal });
    return data; // EmployeeDto
  } catch (err) {
    unwrap(err);
  }
};

export const appointInstructor = async (dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.post("/employees/appoint/instructor", dto, { signal });
    return data; // EmployeeDto
  } catch (err) {
    unwrap(err);
  }
};

export const appointStaff = async (dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.post("/employees/appoint/staff", dto, { signal });
    return data; // EmployeeDto
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 정보 수정 ----------
export const adminUpdateEmployeeInfo = async (empNo, dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.put(`/employees/${encodeURIComponent(empNo)}/admin-info`, dto, { signal });
    return data; // EmployeeDto
  } catch (err) {
    unwrap(err);
  }
};

export const updateMyInfo = async (empNo, dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.put(`/employees/${encodeURIComponent(empNo)}/my-info`, dto, { signal });
    return data; // EmployeeDto
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 상태 변경 ----------
export const changeEmployeeStatus = async (empNo, statusCode, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.patch(
      `/employees/${encodeURIComponent(empNo)}/status`,
      { statusCode }, // StatusChangeRequest와 일치
      { signal }
    );
    return data; // EmployeeDto
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 검색 & 페이징 ----------
export const fetchEmployees = async (params = {}, { signal } = {}) => {
  try {
    const { cleaned, serializer } = buildParamsWithSort({
      page: 0,
      size: 15,
      sort: "empNo,asc",
      ...params,
    });

    const { data } = await axiosInstance.get("/employees", {
      params: cleaned,
      paramsSerializer: serializer,
      signal,
    });
    return data; // Page<EmployeeDto>
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 교수 목록 ----------
/** 검색 기반(부서 필터, 페이징 필요할 때) */
export const fetchProfessorsSearch = async (params = {}, { signal } = {}) => {
  try {
    const page = await fetchEmployees({ ...params, filterByProfessorOnly: true }, { signal });
    return page; // Page<EmployeeDto>
  } catch (err) {
    unwrap(err);
  }
};

/** 단순 전체 교수 목록(컨트롤러 /employees/professors 사용) */
export const fetchProfessorsSimple = async ({ signal } = {}) => {
  try {
    const { data } = await axiosInstance.get("/employees/professors", { signal });
    return Array.isArray(data) ? data : [];
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 이름 검색(자동완성 전용) ----------
export const searchEmployeesByName = async (
  name,
  { size = 10, filterByProfessorOnly = false, filterByDeptCode = null, signal } = {}
) => {
  try {
    const page = await fetchEmployees(
      { name, page: 0, size, filterByProfessorOnly, filterByDeptCode },
      { signal }
    );
    return (page?.content || []).map((e) => ({ empNo: e.empNo, name: e.name }));
  } catch (err) {
    unwrap(err);
  }
};

// ---------- (옵션) 검색 파라미터 프런트 유효성 ----------
export const validateEmployeeSearchParams = (params = {}) => {
  const errors = {};
  if (params?.size && (isNaN(params.size) || params.size < 1 || params.size > 100)) {
    errors.size = "size는 1~100 사이의 숫자여야 합니다.";
  }
  if (params?.name && String(params.name).length > 100) {
    errors.name = "이름 검색어는 100자 이내여야 합니다.";
  }
  return { isValid: Object.keys(errors).length === 0, errors };
};