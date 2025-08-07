import { useEffect, useState } from "react";

// AdminAssessmentDetailPanel: 진단 평가 상세 정보를 보여주고 일부 수정 가능한 폼 컴포넌트
const AdminAssessmentDetailPanel = ({ assessment }) => {
  // 폼 상태: 수정 가능한 로컬 form 상태로 관리
  const [form, setForm] = useState(null);

  /**
   * 날짜 문자열을 yyyyMMdd → yyyy-MM-dd 형식으로 변환
   * <input type="date" />와 호환되도록 가공
   */
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return dateStr.length === 8 
      ? `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`
      : dateStr; // 이미 yyyy-MM-dd 형식이면 그대로 반환
  };

  /**
   * assessment prop이 변경될 때마다 form 상태를 새로 복사하여 설정
   * 날짜는 보기 좋게 가공된 문자열로 변환하여 form에 반영
   */
  useEffect(() => {
    if (assessment) {
      setForm({
        ...assessment,
        registerDate: formatDate(assessment.registerDate),
        startDate: formatDate(assessment.startDate),
        endDate: formatDate(assessment.endDate),
      });
    }
  }, [assessment]);

  /**
   * input/select 변경 시 해당 필드만 갱신하는 핸들러
   * @param {string} field - 수정할 필드 이름
   * @param {*} value - 입력값
   */
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // form이 아직 준비되지 않았다면 렌더링하지 않음
  if (!form) return null;

  return (
    <div className="mt-6 border p-8 rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-800">상세 정보</h2>

      {/* 필드들을 2열 그리드로 구성 */}
      <div className="grid grid-cols-2 gap-6 text-sm">
        
        {/* 진단번호 (PK, 읽기 전용) */}
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">진단번호</label>
          <input type="text" value={assessment.assessmentNo} className="w-full border mt-1 px-3 py-2 rounded" readOnly />
        </div>

        {/* 진단명 */}
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">진단명</label>
          <input
            type="text"
            value={form.assessmentName}
            onChange={(e) => handleChange("assessmentName", e.target.value)}
            className="w-full border mt-1 px-3 py-2 rounded"
          />
        </div>

        {/* 등록일자 (수정 불가) */}
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">등록일자</label>
          <input
            type="date"
            value={form.registerDate}
            className="w-full border mt-1 px-3 py-2 rounded"
            readOnly
          />
        </div>

        {/* 진단 시작일 */}
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">진단 시작일</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            className="w-full border mt-1 px-3 py-2 rounded"
          />
        </div>

        {/* 진단 종료일 */}
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">진단 종료일</label>
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
            className="w-full border mt-1 px-3 py-2 rounded"
          />
        </div>

        {/* 온라인 여부 선택 */}
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">온라인 실시 여부</label>
          <select
            value={form.onlineYn}
            onChange={(e) => handleChange("onlineYn", e.target.value)}
            className="w-full border mt-1 px-3 py-2 rounded"
          >
            <option value="Y">온라인</option>
            <option value="N">오프라인</option>
          </select>
        </div>

        {/* 학년도 입력 */}
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">학년도</label>
          <input
            type="text"
            value={form.academicYear}
            onChange={(e) => handleChange("academicYear", e.target.value)}
            className="w-full border mt-1 px-3 py-2 rounded"
          />
        </div>

        {/* 학기 선택 */}
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">학기</label>
          <select
            value={form.semesterCode}
            onChange={(e) => handleChange("semesterCode", e.target.value)}
            className="w-full border mt-1 px-3 py-2 rounded"
          >
            <option value="1">1학기</option>
            <option value="2">2학기</option>
          </select>
        </div>

        {/* 관리부서 선택 */}
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">관리부서</label>
          <select
            value={form.departmentName}
            onChange={(e) => handleChange("departmentName", e.target.value)}
            className="w-full border mt-1 px-3 py-2 rounded"
          >
            <option value="141">핵심역량센터</option>
            <option value="104">학사지원처</option>
            <option value="107">학생복지처</option>
          </select>
        </div>

        {/* 안내문 입력 */}
        <div className="col-span-2">
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">안내문</label>
          <textarea
            value={form.guideContent}
            onChange={(e) => handleChange("guideContent", e.target.value)}
            className="w-full border mt-1 px-3 py-2 rounded h-32 resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAssessmentDetailPanel;
