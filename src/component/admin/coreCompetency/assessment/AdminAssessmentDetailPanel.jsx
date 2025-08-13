import React, { useEffect, useMemo, useState } from "react";

const AdminAssessmentDetailPanel = ({ initialAssessment, onSave, onDelete, onCancel, existingAssessments = [] }) => {
  const [form, setForm] = useState(null);

  const nameToCodeMap = {
    semester: { "1학기": "1", "2학기": "2" },
    online: { "온라인": "Y", "오프라인": "N" },
  };

  const formatDateForInput = (dateStr) => {
    if (!dateStr || dateStr.includes("-")) return dateStr || "";
    return dateStr.length === 8 ? `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}` : "";
  };

  useEffect(() => {
    if (initialAssessment) {
      const semesterCodeValue = nameToCodeMap.semester[initialAssessment.semesterCode] || initialAssessment.semesterCode;
      const onlineYnValue = nameToCodeMap.online[initialAssessment.onlineYn] || initialAssessment.onlineYn;
      setForm({
        ...initialAssessment,
        semesterCode: semesterCodeValue,
        onlineYn: onlineYnValue,
        registerDate: formatDateForInput(initialAssessment.registerDate),
        startDate: formatDateForInput(initialAssessment.startDate),
        endDate: formatDateForInput(initialAssessment.endDate),
      });
    }
  }, [initialAssessment]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // ---- 진단명 중복 체크 ----
  const normalize = (v) => String(v ?? "").trim().toLowerCase();
  const isDuplicateName = useMemo(() => {
    if (!form) return false;
    const currId = form.id ?? null;
    const name = normalize(form.assessmentName);
    if (!name) return false;
    return (existingAssessments || []).some((a) => {
      const aName = normalize(a.assessmentName ?? a.name ?? a.title);
      if (currId && a.id === currId) return false; // 자기 자신 제외
      return aName === name;
    });
  }, [form, existingAssessments]);

  // 저장 클릭
  const handleSaveClick = () => {
    if (!form) return;

    // 필수 입력
    const trimmedName = String(form.assessmentName ?? "").trim();
    if (!trimmedName || !form.startDate || !form.endDate || !form.academicYear || !form.departmentName) {
      alert("필수 항목을 확인해주세요.");
      return;
    }

    // 중복 차단
    if (isDuplicateName) {
      alert("이미 존재하는 진단명입니다.");
      return;
    }

    // 날짜 유효성
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const startDate = new Date(form.startDate);
    const endDate = new Date(form.endDate);

    if (startDate < today) {
      alert("진단 시작일은 지난 날짜로 설정할 수 없습니다.");
      return;
    }
    if (endDate < today) {
      alert("진단 종료일은 지난 날짜로 설정할 수 없습니다.");
      return;
    }
    if (endDate < startDate) {
      alert("진단 종료일은 시작일보다 이전 날짜일 수 없습니다.");
      return;
    }

    onSave({ ...form, assessmentName: trimmedName });
  };

  const handleDeleteClick = () => {
    onDelete(form.id);
  };

  if (!form) return null;

  const isCreating = !form.id;
  const saveDisabled = isDuplicateName || !String(form.assessmentName ?? "").trim();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {isCreating ? "새 진단 등록" : "기본 정보 수정"}
      </h2>

      <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-sm">
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">진단번호</label>
          <input type="text" value={form.assessmentNo || "자동 생성"} className="w-full border mt-1 px-3 py-2 rounded bg-gray-100" readOnly />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">
            진단명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.assessmentName ?? ""}
            onChange={(e) => handleChange("assessmentName", e.target.value)}
            className={`w-full border mt-1 px-3 py-2 rounded ${isDuplicateName ? "border-red-500" : ""}`}
            aria-invalid={isDuplicateName}
            placeholder="예: 2025-1학기 핵심역량 진단"
          />
          {isDuplicateName && (
            <p className="text-red-600 text-xs mt-1">이미 존재하는 진단명입니다.</p>
          )}
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">등록일자</label>
          <input type="date" value={form.registerDate || ""} className="w-full border mt-1 px-3 py-2 rounded bg-gray-100" readOnly />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">관리부서<span className="text-red-500">*</span></label>
          <select value={form.departmentName || "핵심역량센터"} onChange={(e) => handleChange("departmentName", e.target.value)} className="w-full border mt-1 px-3 py-2 rounded">
            <option value="핵심역량센터">핵심역량센터</option>
            <option value="학사지원처">학사지원처</option>
            <option value="학생복지처">학생복지처</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">진단 시작일 <span className="text-red-500">*</span></label>
          <input type="date" value={form.startDate || ""} onChange={(e) => handleChange("startDate", e.target.value)} className="w-full border mt-1 px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">진단 종료일 <span className="text-red-500">*</span></label>
          <input type="date" value={form.endDate || ""} onChange={(e) => handleChange("endDate", e.target.value)} className="w-full border mt-1 px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">학년도 <span className="text-red-500">*</span></label>
          <input type="text" value={form.academicYear ?? ""} onChange={(e) => handleChange("academicYear", e.target.value)} className="w-full border mt-1 px-3 py-2 rounded" placeholder="예: 2025" />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">학기</label>
          <select value={form.semesterCode || "1"} onChange={(e) => handleChange("semesterCode", e.target.value)} className="w-full border mt-1 px-3 py-2 rounded">
            <option value="1">1학기</option>
            <option value="2">2학기</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">온라인 실시 여부</label>
          <select value={form.onlineYn || "Y"} onChange={(e) => handleChange("onlineYn", e.target.value)} className="w-full border mt-1 px-3 py-2 rounded">
            <option value="Y">온라인</option>
            <option value="N">오프라인</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-gray-600 font-medium mb-1 text-[16px]">안내문</label>
          <textarea value={form.guideContent || ""} onChange={(e) => handleChange("guideContent", e.target.value)} className="w-full border mt-1 px-3 py-2 rounded h-32 resize-none" />
        </div>
      </div>

      <div className="flex items-center justify-end mt-8 pt-6 border-t border-gray-200">
        {!isCreating && (
          <button onClick={handleDeleteClick} className="bg-red-500 text-white font-bold py-2 px-6 rounded hover:bg-red-700 mr-auto">
            삭제
          </button>
        )}
        <button onClick={onCancel} className="bg-gray-400 text-white font-bold py-2 px-6 rounded hover:bg-gray-600 mr-2">
          취소
        </button>
        <button
          onClick={handleSaveClick}
          className="bg-indigo-500 text-white font-bold py-2 px-6 rounded hover:bg-indigo-700 disabled:opacity-50"
          disabled={saveDisabled}
          title={isDuplicateName ? "중복된 진단명은 저장할 수 없습니다." : undefined}
        >
          {isCreating ? "등록" : "저장"}
        </button>
      </div>
    </div>
  );
};

export default AdminAssessmentDetailPanel;
