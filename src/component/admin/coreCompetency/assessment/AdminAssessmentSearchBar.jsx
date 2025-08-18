import axios from "axios";
import { useState } from "react";
import TextInput from "../../../common/TextInput";

const AdminAssessmentSearchBar = ({ setAssessmentList }) => {
  const [academicYear, setAcademicYear] = useState("");   // 학년도
  const [assessmentNo, setAssessmentNo] = useState("");   // 진단번호
  const [semesterCode, setSemesterCode] = useState("");   // 학기

  const fetchAssessments = () => {
    const params = new URLSearchParams();
    if (academicYear) params.append("academicYear", academicYear);
    if (semesterCode) params.append("semesterCode", semesterCode);
    if (assessmentNo) params.append("assessmentNo", assessmentNo);

    axios
      .get(`/api/admin/assessments/list?${params.toString()}`)
      .then((res) => {
        setAssessmentList(res.data);
      })
      .catch((err) => {
        console.error("진단 평가 불러오기 실패", err);
      });
  };

  return (
    <div className="grid grid-cols-12 gap-4 items-end">
      {/* 학년도/학기 */}
      <label className="col-span-12 md:col-span-2 adm-label self-center">
        학년도/학기
      </label>

      <TextInput
        type="text"
        placeholder="예: 2025"
        value={academicYear}
        onChange={(e) => {
          setAcademicYear(e.target.value);
          setAssessmentList([]); // 이전 결과 초기화
        }}
        className="col-span-6 md:col-span-3 adm-control w-full"
      />

      <select
        value={semesterCode}
        onChange={(e) => {
          setSemesterCode(e.target.value);
          setAssessmentList([]); // 이전 결과 초기화
        }}
        className="col-span-6 md:col-span-3 adm-control w-full"
      >
        <option value="">학기선택</option>
        <option value="1학기">1학기</option>
        <option value="2학기">2학기</option>
      </select>

      {/* 검색 버튼 */}
      <div className="col-span-12 md:col-span-6 lg:col-span-3 flex justify-left">
        <button
          onClick={fetchAssessments}
          className="adm-btn adm-btn--primary"
        >
          검색
        </button>
      </div>

      {/* 진단번호 */}
      <div className="col-span-12 grid grid-cols-12 gap-4 items-end">
        <label className="col-span-12 md:col-span-2 adm-label self-center">진단번호</label>
          <TextInput
            type="text"
            placeholder="예: ASMT2025-01"
            value={assessmentNo}
            onChange={(e) => { setAssessmentNo(e.target.value); setAssessmentList([]); }}
            className="col-span-12 md:col-span-4 adm-control w-full"
          />
      </div>
    </div>
  );
};

export default AdminAssessmentSearchBar;
