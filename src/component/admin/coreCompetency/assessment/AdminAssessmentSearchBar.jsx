import axios from "axios";
import { useState } from "react";

// 관리자 평가 검색 바 컴포넌트
const AdminAssessmentSearchBar = ({ setAssessmentList }) => {
  //  검색 조건 상태 정의
  const [academicYear, setAcademicYear] = useState('');     // 학년도
  const [assessmentNo, setAssessmentNo] = useState('');     // 진단번호
  const [semesterCode, setSemesterCode] = useState('');     // 학기 (예: "1학기", "2학기")

  // 검색 실행 함수 (검색 버튼 클릭 시 호출)
  const fetchAssessments = () => {
    const params = new URLSearchParams(); // 쿼리 스트링을 위한 객체 생성

    // 값이 있는 조건만 파라미터에 추가
    if (academicYear) params.append("academicYear", academicYear);
    if (semesterCode) params.append("semesterCode", semesterCode);
    if (assessmentNo) params.append("assessmentNo", assessmentNo);

    // 서버에 GET 요청 → 검색 결과 받아오기
    axios
      .get(`/api/admin/assessments/list?${params.toString()}`)
      .then((res) => {
        // 결과를 상위 컴포넌트에 전달
        setAssessmentList(res.data);
      })
      .catch((err) => {
        console.error("진단 평가 불러오기 실패", err);
      });
  };

  return (
    <div className=" px-6 py-4 bg-white shadow rounded mb-6">
      {/*  검색 영역 전체 */}
      <div className="flex flex-wrap gap-4 items-center">
        
        {/* 학년도 입력 필드 */}
        <label className="font-medium">학년도/학기</label>
        <input
          type="text"
          placeholder="예: 2025"
          value={academicYear}
          onChange={(e) => {
            setAcademicYear(e.target.value);  // 학년도 입력값 변경
            setAssessmentList([]);            // 이전 결과 초기화
          }}
          className="border px-3 py-1 rounded w-32"
        />

        {/* 학기 선택 드롭다운 */}
        <select
          value={semesterCode}
          onChange={(e) => {
            setSemesterCode(e.target.value);  // 학기 선택 변경
            setAssessmentList([]);            // 이전 결과 초기화
          }}
          className="border px-1 py-1 rounded w-28"
        >
          <option value="">학기선택</option>
          <option value="1학기">1학기</option>
          <option value="2학기">2학기</option>
        </select>

        {/* 진단번호 입력 필드 */}
        <label className="font-medium">진단번호</label>
        <input
          type="text"
          placeholder="예: ASMT2025-01"
          value={assessmentNo}
          onChange={(e) => {
            setAssessmentNo(e.target.value);  // 진단번호 입력값 변경
            setAssessmentList([]);            // 이전 결과 초기화
          }}
          className="border px-7 py-1 rounded w-40"
        />

        {/* 검색 버튼 */}
        <button
          onClick={fetchAssessments}  // 검색 실행
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1.5 rounded transition"
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default AdminAssessmentSearchBar;
