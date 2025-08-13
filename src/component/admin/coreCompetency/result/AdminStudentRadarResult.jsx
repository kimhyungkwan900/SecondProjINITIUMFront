// AdminStudentRadarResult.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentListTable from "./StudentListTable";
import StudentRadarChart from "./StudentRadarChart";

const AdminStudentRadarResult = ({ assessmentNo }) => {
  const [students, setStudents] = useState([]);     // 학생 목록
  const [selected, setSelected] = useState(null);   // 선택된 학생
  const [loadingList, setLoadingList] = useState(false);
  const [error, setError] = useState("");

  console.log("assessmentNo : ", assessmentNo);

  // 평가번호 변경 시 학생 목록 로드
  useEffect(() => {
    setSelected(null);
    setStudents([]);
    if (!assessmentNo) return;

    (async () => {
      setLoadingList(true);
      setError("");
      try {
        const url = `/api/admin/core-competency/result/assessments/${assessmentNo}/response/students`;
        const { data } = await axios.get(url);
        setStudents(Array.isArray(data) ? data : []);
      } catch {
        setError("학생 목록을 불러오지 못했습니다.");
        setStudents([]);
      } finally {
        setLoadingList(false);
      }
    })();
  }, [assessmentNo]);

  return (
    <div className="w-full grid grid-cols-12 gap-6">
      {/* 왼쪽: 학생 목록 */}
      <div className="col-span-5">
        <div className="rounded-2xl shadow p-4 border bg-white h-[680px] flex flex-col">
          <div className="mb-3 text-lg font-semibold">학생 목록</div>
          <StudentListTable
            students={students}
            selected={selected}
            onSelect={(s) => setSelected((prev) => (prev?.studentNo === s?.studentNo ? null : s))}
            loading={loadingList}
            error={error}
          />
        </div>
      </div>

      {/* 오른쪽: 레이더 차트 */}
      <div className="col-span-7">
        <div className="rounded-2xl shadow p-4 border bg-white h-[680px] flex flex-col">
          <div className="mb-3 text-lg font-semibold">하위역량별 평균 점수</div>
          <StudentRadarChart assessmentNo={assessmentNo} student={selected} />
          {selected && (
            <div className="mt-4 text-sm text-gray-600">
              <span className="font-medium">{selected.name}</span> / {selected.studentNo} · {selected.subjectCode} · {selected.schoolYear}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStudentRadarResult;
