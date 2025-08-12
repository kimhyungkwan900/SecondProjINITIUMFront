import { useCallback } from "react";
import TextInput from "../../common/TextInput";
import EmployeeSelect from "../../common/CodeConverter/EmployeeSelect";
import { BankSelect, CodeDisplay, GenderSelect, GradeSelect, SchoolSubjectSelect, StudentStatusSelect } from "../../common/CodeConverter/CodeSelect";
import UniversitySelect from "../../common/CodeConverter/UniversitySelect";

export default function StudentAdminUpdateForm({
  value,
  onChange,
  disabled = false,
  readOnlyFields = [],
  className = "",
  onSubmit,            // 폼 내부 제출 버튼 클릭/엔터시 호출
  submitting = false,  // 제출 중 스피너/비활성화
  showSubmit = true,   // 하단 제출 버튼 표시 여부
  submitText,          // 버튼 라벨 커스텀 (미지정시 mode에 따라 자동)
  mode = "edit",       // 'create' | 'edit' (부모가 내려주던 값 그대로)
}) {
  const update = (key) => (e) =>
    onChange((prev) => ({ ...prev, [key]: e.target.value }));

  const isRO = (key) => disabled || readOnlyFields.includes(key);

  // 유효성 검증
  const validateForm = () => {
    const errors = [];
    if (!value.name?.trim()) errors.push("이름은 필수입니다.");
    if (!value.email?.trim()) errors.push("이메일은 필수입니다.");
    if (value.email && !value.email.includes("@")) errors.push("올바른 이메일 형식이 아닙니다.");
    if (!value.birthDate) errors.push("생년월일은 필수입니다.");
    if (!value.admissionDate) errors.push("입학일자는 필수입니다.");
    if (!value.genderCode) errors.push("성별은 필수입니다.");
    if (!value.grade) errors.push("학년은 필수입니다.");
    if (!value.schoolSubjectCode) errors.push("학과는 필수입니다.");
    if (!value.studentStatusCode) errors.push("학적상태는 필수입니다.");
    return errors;
  };

  const handleSubmit = useCallback((e) => {
    if (e) e.preventDefault();
    if (disabled || submitting) return;
    const errs = validateForm();
    if (errs.length > 0) {
      alert(errs[0]);
      return;
    }
    if (typeof onSubmit === "function") onSubmit(value);
  }, [disabled, submitting, onSubmit, value]);

  const handleKeyDown = (e) => {
    // Ctrl/Cmd + Enter 로 제출
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const finalSubmitText = submitText ?? (mode === "create" ? "등록" : "저장");

  return (
    <form
      className={`space-y-4 ${className}`}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      {/* 기본 정보 섹션 */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">기본 정보</h4>
        <div className="grid grid-cols-2 gap-3">
          {/* 이름 */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">
              이름 <span className="text-red-500">*</span>
            </span>
            <TextInput
              value={value.name || ""}
              onChange={update("name")}
              placeholder="홍길동"
              disabled={isRO("name")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>

          {/* 이메일 */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">
              이메일 <span className="text-red-500">*</span>
            </span>
            <TextInput
              type="email"
              value={value.email || ""}
              onChange={update("email")}
              placeholder="user@univ.ac.kr"
              disabled={isRO("email")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>

          {/* 생년월일 */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">
              생년월일 <span className="text-red-500">*</span>
            </span>
            <TextInput
              type="date"
              value={value.birthDate || ""}
              onChange={update("birthDate")}
              disabled={isRO("birthDate")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>

          {/* 입학일자 */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">
              입학일자 <span className="text-red-500">*</span>
            </span>
            <TextInput
              type="date"
              value={value.admissionDate || ""}
              onChange={update("admissionDate")}
              disabled={isRO("admissionDate")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>

          {/* 성별 */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">
              성별 <span className="text-red-500">*</span>
              {value.genderCode && (
                <span className="ml-2 text-xs text-gray-500">
                  (현재: <CodeDisplay category="GENDER" code={value.genderCode} />)
                </span>
              )}
            </span>
            <GenderSelect
              value={value.genderCode || ""}
              onChange={update("genderCode")}
              disabled={isRO("gender")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>

          {/* 학년 */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">
              학년 <span className="text-red-500">*</span>
              {value.grade && (
                <span className="ml-2 text-xs text-gray-500">
                  (현재: {value.grade}학년)
                </span>
              )}
            </span>
            <GradeSelect
              value={value.grade || ""}
              onChange={update("grade")}
              disabled={isRO("grade")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>
        </div>
      </div>

      {/* 학사 정보 섹션 */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">학사 정보</h4>
        <div className="grid grid-cols-2 gap-3">
          {/* 학과 */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">
              학과 <span className="text-red-500">*</span>
              {value.schoolSubjectCode && (
                <span className="ml-2 text-xs text-gray-500">
                  (현재: <CodeDisplay category="SCHOOL_SUBJECT" code={value.schoolSubjectCode} />)
                </span>
              )}
            </span>
            <SchoolSubjectSelect
              value={value.schoolSubjectCode || ""}
              onChange={update("schoolSubjectCode")}
              disabled={isRO("schoolSubjectCode")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              filterByAcademicOnly={true}
            />
          </label>

          {/* 학적상태 */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">
              학적상태 <span className="text-red-500">*</span>
              {value.studentStatusCode && (
                <span className="ml-2 text-xs text-gray-500">
                  (현재: <CodeDisplay category="STUDENT_STATUS" code={value.studentStatusCode} />)
                </span>
              )}
            </span>
            <StudentStatusSelect
              value={value.studentStatusCode || ""}
              onChange={update("studentStatusCode")}
              disabled={isRO("studentStatusCode")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>

          {/* 대학코드 */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">
              대학명 <span className="text-red-500">*</span>
            </span>
            <UniversitySelect
              value={value.universityCode || ""}
              onChange={update("universityCode")}
              disabled={isRO("universityCode")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>

          {/* 지도교수ID */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">지도교수명</span>
            <EmployeeSelect
              value={value.advisorNo || ""}
              onChange={update("advisorNo")}
              disabled={isRO("advisorNo")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              filterByProfessorOnly={true}
              filterByDeptCode={value.schoolSubjectCode}
            />
          </label>
        </div>
      </div>

      {/* 계좌 정보 섹션 */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">계좌 정보</h4>
        <div className="grid grid-cols-2 gap-3">
          {/* 은행 */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">은행</span>
            <BankSelect
              value={value.bankCode || ""}
              onChange={update("bankCode")}
              disabled={isRO("bankCode")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>

          {/* 계좌번호 */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">계좌번호</span>
            <TextInput
              value={value.bankAccountNo || ""}
              onChange={update("bankAccountNo")}
              placeholder="000-000-000000"
              disabled={isRO("bankAccountNo")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>
      </div>

      {/* ▼ 폼 제출 버튼 */}
      {showSubmit && (
        <div className="pt-3 border-t">
          <button
            type="submit"
            className="w-full bg-[#222E8D] text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 transition disabled:opacity-50"
            disabled={disabled || submitting}
          >
            {submitting ? "저장중..." : finalSubmitText}
          </button>
        </div>
      )}
    </form>
  );
}