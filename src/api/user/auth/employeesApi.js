import axiosInstance from "../../axiosInstance";


// --- 단건 조회 ---
export const fetchEmployeeByNo = async (empNo) => {
  const response = await axiosInstance.get(`/employees/${empNo}`);
  return response.data;
};

// --- 임용(신규 등록) ---
// 교수
export const appointProfessor = async (professorAppointDto) => {
  const res = await axiosInstance.post("/employees/appoint/professor", professorAppointDto);
  return res.data;
};
// 강사
export const appointInstructor = async (counselorHireDto) => {
  const res = await axiosInstance.post("/employees/appoint/instructor", counselorHireDto);
  return res.data;
};
// 직원
export const appointStaff = async (staffAppointDto) => {
  const res = await axiosInstance.post("/employees/appoint/staff", staffAppointDto);
  return res.data;
};

// --- 정보 수정 ---
export const adminUpdateEmployeeInfo = async (empNo, adminUpdateEmployeeDto) => {
  const res = await axiosInstance.put(`/employees/${empNo}/admin-info`, adminUpdateEmployeeDto);
  return res.data;
};

export const updateMyInfo = async (empNo, employeeUpdateMyInfoDto) => {
  const res = await axiosInstance.put(`/employees/${empNo}/my-info`, employeeUpdateMyInfoDto);
  return res.data;
};

// --- 상태 변경 ---
export const changeEmployeeStatus = async (empNo, statusCode) => {
  const res = await axiosInstance.patch(`/employees/${empNo}/status`, { statusCode });
  return res.data;
};

// --- 검색 & 페이징 ---
export const fetchEmployees = async ({
  empNo = "",
  name = "",
  departmentCode = "",
  positionCode = "",
  employeeStatusCode = "",
  page = 0,
  size = 15,
  sort,
  ...rest
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

  const res = await axiosInstance.get("/employees", { params });
  return res.data;
};
