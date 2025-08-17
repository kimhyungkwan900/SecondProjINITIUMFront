import axios from "axios";
import { useEffect, useState } from "react";
import StudentResponsePage from "./StudentResponsePage";

const AdminCoreCompetencyGetResultPage = ({ assessmentNo }) => {
  // 디버그 로그
  console.log("[AdminCoreCompetencyGetResultPage] prop assessmentId:", assessmentNo);

  const [studentList, setStudentList] = useState([]);
  const [selectedStudentNo, setSelectedStudentNo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchStudents = async () => {
    if (!assessmentNo) {
      setStudentList([]);
      return;
    }
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

  useEffect(() => {
    fetchStudents();
  }, [assessmentNo]);

  const totalPages = Math.ceil(studentList.length / itemsPerPage) || 1;
  const currentStudentList = studentList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="adm-card">
      {/* 카드 헤더 */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800">학생정보</h3>
      </div>
      <div className="border-t border-gray-200" />

      {/* 테이블 헤더 */}
      <div className="grid grid-cols-7">
        <div className="adm-th">학번</div>
        <div className="adm-th">성명</div>
        <div className="adm-th">성별</div>
        <div className="adm-th">학과</div>
        <div className="adm-th">학년</div>
        <div className="adm-th">학적상태</div>
        <div className="adm-th">핵심역량완료일</div>
      </div>

      {/* 테이블 본문 */}
      <div>
        {currentStudentList.length === 0 ? (
          <div className="adm-empty">
            {assessmentNo ? "학생이 없습니다." : "진단을 먼저 선택하세요."}
          </div>
        ) : (
          currentStudentList.map((s, idx) => {
            const isSelected = selectedStudentNo === s.studentNo;
            return (
              <div
                key={s.studentNo}
                role="row"
                aria-selected={isSelected ? "true" : "false"}
                onClick={() => setSelectedStudentNo(isSelected ? null : s.studentNo)}
                className={`grid grid-cols-7 border-t hover:bg-gray-50 cursor-pointer transition-colors
                  ${idx % 2 === 1 ? "bg-[#F9FAFB]" : "bg-white"}
                  ${isSelected ? "bg-indigo-50 ring-1 ring-inset ring-indigo-200 font-semibold" : ""}`}
              >
                <div className="adm-td text-center">{s.studentNo}</div>
                <div className="adm-td">{s.name}</div>
                <div className="adm-td text-center">{s.gender}</div>
                <div className="adm-td">{s.subjectCode}</div>
                <div className="adm-td text-center">{s.schoolYear}</div>
                <div className="adm-td">{s.status}</div>
                <div className="adm-td">{s.completeDate}</div>
              </div>
            );
          })
        )}
      </div>

      {/* 페이징 바 */}
      {studentList.length > itemsPerPage && (
        <div className="px-4 py-3 flex justify-center items-center gap-3 border-t border-gray-200">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="adm-btn adm-btn--secondary h-9 text-xs px-3 disabled:opacity-50"
          >
            이전
          </button>
          <span className="text-sm text-gray-700">
            <b>{currentPage}</b> / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="adm-btn adm-btn--secondary h-9 text-xs px-3 disabled:opacity-50"
          >
            다음
          </button>
        </div>
      )}

      {/* 하단: 학생 응답 상세 */}
      <div className="p-4">
        <StudentResponsePage
          assessmentId={assessmentNo}
          studentNo={selectedStudentNo}
          pageSize={5}
        />
      </div>
    </div>
  );
};

export default AdminCoreCompetencyGetResultPage;
