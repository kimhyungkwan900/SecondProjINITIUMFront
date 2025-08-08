import axios from "axios";
import { useState } from "react";

const AdminAssessmentResultSearchBar = ({ setAssessmentList }) => {
  const [academicYear, setAcademicYear] = useState('');
  const [assessmentNo, setAssessmentNo] = useState('');
  const [semesterCode, setSemesterCode] = useState('');

  const fetchAssessments = () => {
    const params = new URLSearchParams();

    if (academicYear) params.append("academicYear", academicYear);
    if (semesterCode) params.append("semesterCode", semesterCode);
    if (assessmentNo) params.append("assessmentNo", assessmentNo);

    axios
      .get(`/api/admin/assessments/list/result?${params.toString()}`)
      .then((res) => {
        setAssessmentList(res.data);
      })
      .catch((err) => {
        console.error("진단 평가 불러오기 실패", err);
      });
  };

  return (
    <div className="px-6 py-4 bg-white shadow rounded mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <label className="font-medium">학년도/학기</label>
        <input
          type="text"
          placeholder="예: 2025"
          value={academicYear}
          onChange={(e) => {
            setAcademicYear(e.target.value);
            setAssessmentList([]);
          }}
          className="border px-3 py-1 rounded w-32"
        />
        <select
          value={semesterCode}
          onChange={(e) => {
            setSemesterCode(e.target.value);
            setAssessmentList([]);
          }}
          className="border px-3 py-1 rounded w-28"
        >
          <option value="1">1학기</option>
          <option value="2">2학기</option>
        </select>

        <label className="font-medium">진단번호</label>
        <input
          type="text"
          placeholder="예: 1001"
          value={assessmentNo}
          onChange={(e) => {
            setAssessmentNo(e.target.value);
            setAssessmentList([]);
          }}
          className="border px-3 py-1 rounded w-40"
        />

        <button
          onClick={fetchAssessments}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1.5 rounded transition"
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default AdminAssessmentResultSearchBar;
