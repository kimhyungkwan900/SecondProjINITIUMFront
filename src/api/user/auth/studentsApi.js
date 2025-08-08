import axios from "axios";

export const fetchStudentByNo = async (studentNo) => {
  const res = await axios.get(`http://localhost:8080/api/students/${studentNo}`);
  return res.data;
};


export const fetchStudents = async ({
    studentNo = "",
    name = "",
    studentStatusCode = "",
    schoolSubjectCode = "",
    page = 0,
    size = 15
}) => {
    const response = await axios.get("/api/students", {
        params: { studentNo, name, studentStatusCode, schoolSubjectCode, page, size }
    });
    return response.data;
};