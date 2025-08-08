import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/students";

// 학생 단건 조회
export const fetchStudentByNo = async (studentNo) => {
    const res = await axios.get(`${API_BASE_URL}/${studentNo}`);
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
    const response = await axios.get(API_BASE_URL, {
        params: { studentNo, name, studentStatusCode, schoolSubjectCode, page, size }
    });
    return response.data;
};

// 학생 등록
export const enrollStudent = async (enrollDto) => {
    const response = await axios.post(API_BASE_URL, enrollDto);
    return response.data;
};

// 학생 본인 정보 수정
export const updateMyInfo = async (studentNo, updateDto) => {
    const response = await axios.put(`${API_BASE_URL}/${studentNo}/my-info`, updateDto);
    return response.data;
};

// 관리자 학생 정보 수정
export const adminUpdateStudentInfo = async (studentNo, adminUpdateDto) => {
    const response = await axios.put(`${API_BASE_URL}/${studentNo}/admin-info`, adminUpdateDto);
    return response.data;
};

// 학생 상태 변경
export const changeStudentStatus = async (studentNo, statusCode) => {
    const response = await axios.patch(`${API_BASE_URL}/${studentNo}/status`, { statusCode });
    return response.data;
};
