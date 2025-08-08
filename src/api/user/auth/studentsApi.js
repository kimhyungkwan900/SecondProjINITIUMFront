import axiosInstance from "../../axiosInstance";

// 학생 단건 조회
export const fetchStudentByNo = async (studentNo) => {
  const res = await axiosInstance.get(`/students/${studentNo}`);
  return res.data;
};

// 학생 목록 조회 (검색 + 페이징)
export const fetchStudents = async ({
  studentNo = "",
  name = "",
  studentStatusCode = "",
  schoolSubjectCode = "",
  page = 0,
  size = 15
}) => {
    //TODO: 제대로 검색 불가
  // console.log(" [API 요청 파라미터]", { studentNo, name, studentStatusCode, schoolSubjectCode, page, size });
  const response = await axiosInstance.get("/students", {
    params: { studentNo, name, studentStatusCode, schoolSubjectCode, page, size }
  });
  return response.data;
};

// 학생 등록
export const enrollStudent = async (enrollDto) => {
  const response = await axiosInstance.post("/students", enrollDto);
  return response.data;
};

// 학생 본인 정보 수정
export const updateMyInfo = async (studentNo, updateDto) => {
  const response = await axiosInstance.put(`/students/${studentNo}/my-info`, updateDto);
  return response.data;
};

// 관리자 학생 정보 수정
export const adminUpdateStudentInfo = async (studentNo, adminUpdateDto) => {
  const response = await axiosInstance.put(`/students/${studentNo}/admin-info`, adminUpdateDto);
  return response.data;
};

// 학생 상태 변경
export const changeStudentStatus = async (studentNo, statusCode) => {
  const response = await axiosInstance.patch(`/students/${studentNo}/status`, { statusCode });
  return response.data;
};
