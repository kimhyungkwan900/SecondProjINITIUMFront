import axios from "axios";

const API_BASE = "http://localhost:8080/api/employees";

// --- 단건 조회 ---
export const fetchEmployeeByNo = async (empNo) => {
  const response = await axios.get(`${API_BASE}/${empNo}`);
  return response.data;
};

// --- 임용(신규 등록) ---
// 교수
export const appointProfessor = async (professorAppointDto) => {
  const res = await axios.post(`${API_BASE}/appoint/professor`, professorAppointDto, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
// 강사
export const appointInstructor = async (counselorHireDto) => {
  const res = await axios.post(`${API_BASE}/appoint/instructor`, counselorHireDto, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
// 직원
export const appointStaff = async (staffAppointDto) => {
  const res = await axios.post(`${API_BASE}/appoint/staff`, staffAppointDto, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// --- 정보 수정 ---
export const adminUpdateEmployeeInfo = async (empNo, adminUpdateEmployeeDto) => {
  const res = await axios.put(`${API_BASE}/${empNo}/admin-info`, adminUpdateEmployeeDto, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const updateMyInfo = async (empNo, employeeUpdateMyInfoDto) => {
  const res = await axios.put(`${API_BASE}/${empNo}/my-info`, employeeUpdateMyInfoDto, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// --- 상태 변경 ---
export const changeEmployeeStatus = async (empNo, statusCode) => {
  const res = await axios.patch(`${API_BASE}/${empNo}/status`, { statusCode }, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// --- 검색 & 페이징 ---
// searchParams는 EmployeeSearchDto의 필드 + page, size를 그대로 전달
export const fetchEmployees = async ({
  empNo = "",
  name = "",
  departmentCode = "",
  positionCode = "",
  employeeStatusCode = "",
  page = 0,
  size = 15,
  sort,
  ...rest // 필요한 추가 검색조건이 있으면 그대로 전달
} = {}) => {
  const params = {
    empNo,
    name,
    departmentCode,
    positionCode,
    employeeStatusCode,
    page,
    size,
    ...(sort ? { sort } : {}),
    ...rest,
  };

  const res = await axios.get(`${API_BASE}`, { params });
  return res.data;
};
