import axios from "axios";
import { useEffect, useState } from "react";

const AdminCoreCompetencyParticipant = ({assessmentNo}) =>{

  const [studentList, setStudentList] = useState([]);
  const [selectedStudentNo, setSelectedStudentNo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchStudents = async () => {
    if (!assessmentNo) { setStudentList([]); return; }
    try {
      const url = `/api/admin/core-competency/result/assessments/${assessmentNo}/response/students`;
      const res = await axios.get(url);
      setStudentList(res.data ?? []);
      setSelectedStudentNo(null);
      setCurrentPage(1);
    } catch (err) {
      console.error("학생 목록 로딩 실패", err);
      setStudentList([]);
    }
  };

  useEffect(() => { fetchStudents(); }, [assessmentNo]);

  const totalPages = Math.ceil(studentList.length / itemsPerPage) || 1;
  const currentStudentList = studentList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mt-3 px-6 py-6 bg-white rounded-xl shadow-md border border-gray-300">
      <span className="text-xl text-black font-bold">▐ 학생정보</span>
      <table className="w-full mt-3 text-[16px] border border-gray-300 rounded-md overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-center">
          <tr>
            <th className="border p-2 text-center">학번</th>
            <th className="border p-2 text-center">성명</th>
            <th className="border p-2 text-center">성별</th>
            <th className="border p-2 text-center">학과</th>
            <th className="border p-2 text-center">학년</th>
            <th className="border p-2 text-center">학적상태</th>
            <th className="border p-2 text-center">핵심역량완료일</th>
          </tr>
        </thead>
        <tbody>
          {currentStudentList.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">
                {assessmentNo ? "학생이 없습니다." : "좌측에서 진단을 먼저 선택하세요."}
              </td>
            </tr>
          ) : (
            currentStudentList.map((s) => {
              const isSelected = selectedStudentNo === s.studentNo;
              return (
                <tr
                  key={s.studentNo}
                  onClick={() => setSelectedStudentNo(isSelected ? null : s.studentNo)}
                  className={`cursor-pointer hover:bg-blue-50 ${isSelected ? "bg-blue-100 font-semibold" : ""}`}
                >
                  <td className="border p-2 text-center">{s.studentNo}</td>
                  <td className="border p-2 text-center">{s.name}</td>
                  <td className="border p-2 text-center">{s.gender}</td>
                  <td className="border p-2 text-center">{s.subjectCode}</td>
                  <td className="border p-2 text-center">{s.schoolYear}</td>
                  <td className="border p-2 text-center">{s.status}</td>
                  <td className="border p-2 text-center">{s.completeDate}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {studentList.length > itemsPerPage && (
        <div className="mt-3 flex justify-center gap-2 items-center text-sm">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="mr-2 px-3 py-2 border rounded disabled:opacity-40">이전</button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="ml-2 px-3 py-2 border rounded disabled:opacity-40">다음</button>
        </div>
      )}
    </div>
  );
};

export default AdminCoreCompetencyParticipant;

