
import { unwrap, buildParamsWithSort } from "../../../utils/apiUtils";
import axiosInstance from "../../axiosInstance";

// ---------- 단건 ----------
export const fetchEmployeeByNo = async (empNo, { signal } = {}) => {
  try {
    if (!empNo?.trim()) throw new Error("사번(empNo)은 필수입니다.");
    const { data } = await axiosInstance.get(`/employees/${encodeURIComponent(empNo)}`, { signal });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 임용(신규 등록) ----------
export const appointProfessor = async (dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.post("/employees/appoint/professor", dto, { signal });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

export const appointInstructor = async (dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.post("/employees/appoint/instructor", dto, { signal });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

export const appointStaff = async (dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.post("/employees/appoint/staff", dto, { signal });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 정보 수정 ----------
export const adminUpdateEmployeeInfo = async (empNo, dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.put(`/employees/${encodeURIComponent(empNo)}/admin-info`, dto, { signal });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

export const updateMyInfo = async (empNo, dto, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.put(`/employees/${encodeURIComponent(empNo)}/my-info`, dto, { signal });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 상태 변경 ----------
export const changeEmployeeStatus = async (empNo, statusCode, { signal } = {}) => {
  try {
    const { data } = await axiosInstance.patch(
      `/employees/${encodeURIComponent(empNo)}/status`,
      { statusCode },
      { signal }
    );
    return data;
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
      ...params,
    });

    const { data } = await axiosInstance.get("/employees", {
      params: cleaned,
      paramsSerializer: serializer,
      signal,
    });
    return data;
  } catch (err) {
    unwrap(err);
  }
};

export const fetchProfessors = async (params = {}, { signal } = {}) => {
  try {
    const data = await fetchEmployees({ ...params, filterByProfessorOnly: true }, { signal });
    return data?.content || []; // List<EmployeeDto>
  } catch (err) {
    unwrap(err);
  }
};

// ---------- 이름 검색(자동완성 전용) ----------
export const searchEmployeesByName = async (name, { size = 10, filterByProfessorOnly = false, filterByDeptCode = null, signal } = {}) => {
  const data = await fetchEmployees({ name, page: 0, size, filterByProfessorOnly, filterByDeptCode }, { signal });
  return (data?.content || []).map((e) => ({ empNo: e.empNo, name: e.name }));
};

