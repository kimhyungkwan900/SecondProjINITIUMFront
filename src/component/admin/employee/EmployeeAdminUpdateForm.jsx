import { useCallback } from "react";
import TextInput from "../../common/TextInput";
import CodeSelect, { BankSelect, CodeDisplay, GenderSelect } from "../../common/CodeConverter/CodeSelect";
import SchoolSubjectSelect from "../../common/CodeConverter/SchoolSubjectSelect";


export default function EmployeeAdminUpdateForm({
  value,
  onChange,
  disabled = false,
  readOnlyFields = [],
  className = "",
  onSubmit,
  submitting = false,
  showSubmit = true,
  submitText,
  mode = "edit",          // "create" | "edit"
  requiredTel = false,    // 임용 시 전화 필수로 쓰고 싶으면 true
}) {
  const update = (key) => (e) =>
    onChange((prev) => ({ ...prev, [key]: e?.target ? e.target.value : e }));

  const isRO = (key) => disabled || readOnlyFields.includes(key);
  const finalSubmitText = submitText ?? (mode === "create" ? "임용" : "저장");

  const validateForm = () => {
    const errors = [];
    if (!value?.name?.trim()) errors.push("이름은 필수입니다.");
    if (!value?.birthDate) errors.push("생년월일은 필수입니다.");
    if (!value?.gender) errors.push("성별은 필수입니다.");
    if (!value?.email?.trim()) errors.push("이메일은 필수입니다.");
    if (value?.email && !/^\S+@\S+\.\S+$/.test(value.email)) errors.push("올바른 이메일 형식이 아닙니다.");
    if (requiredTel && !value?.tel?.trim()) errors.push("전화번호는 필수입니다.");
    if (!value?.subjectCode) errors.push("소속(학과/부서)은 필수입니다.");
    if (!value?.employeeStatus) errors.push("직원상태는 필수입니다.");
    return errors;
  };

  const handleSubmit = useCallback((e) => {
    if (e) e.preventDefault();
    if (disabled || submitting) return;
    const errs = validateForm();
    if (errs.length > 0) return alert(errs[0]);
    if (typeof onSubmit === "function") onSubmit(value);
  }, [disabled, submitting, onSubmit, value]);

  const labelCls = "font-medium text-gray-700 mb-1";
  const inputCls = "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400";
  const gridCls  = "grid grid-cols-2 gap-3";

  return (
    <form className={`space-y-4 ${className}`} onSubmit={handleSubmit}>
      {/* 기본 정보 */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">기본 정보</h4>
        <div className={gridCls}>
          {/* 이름 */}
          <label className="flex flex-col text-sm">
            <span className={labelCls}>이름 <span className="text-red-500">*</span></span>
            <TextInput value={value?.name || ""} onChange={update("name")} disabled={isRO("name")} className={inputCls} required />
          </label>

          {/* 생년월일 */}
          <label className="flex flex-col text-sm">
            <span className={labelCls}>생년월일 <span className="text-red-500">*</span></span>
            <TextInput type="date" value={value?.birthDate || ""} onChange={update("birthDate")} disabled={isRO("birthDate")} className={inputCls} required />
          </label>

          {/* 이메일 */}
          <label className="flex flex-col text-sm">
            <span className={labelCls}>이메일 <span className="text-red-500">*</span></span>
            <TextInput type="email" value={value?.email || ""} onChange={update("email")} disabled={isRO("email")} className={inputCls} required />
          </label>

          {/* 휴대전화 */}
          <label className="flex flex-col text-sm">
            <span className={labelCls}>
              휴대전화 {requiredTel && <span className="text-red-500">*</span>}
              {!requiredTel && <span className="ml-2 text-xs text-gray-500">(선택)</span>}
            </span>
            <TextInput value={value?.tel || ""} onChange={update("tel")} disabled={isRO("tel")} className={inputCls} />
          </label>

          {/* 성별 */}
          <label className="flex flex-col text-sm">
            <span className={labelCls}>
              성별 <span className="text-red-500">*</span>
            </span>
            <GenderSelect value={value?.gender || ""} onChange={update("gender")} disabled={isRO("gender")} className={inputCls} required />
          </label>
        </div>
      </div>

      {/* 소속/상태 */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">소속 / 상태</h4>
        <div className={gridCls}>
          {/* 소속(학과/부서) */}
          <label className="flex flex-col text-sm">
            <span className={labelCls}>소속(학과/부서) <span className="text-red-500">*</span></span>
            <SchoolSubjectSelect value={value?.subjectCode || ""} onChange={update("subjectCode")} disabled={isRO("subjectCode")} className={inputCls} required />
          </label>

          {/* 직원상태 */}
          <label className="flex flex-col text-sm">
            <span className={labelCls}>
              직원상태 <span className="text-red-500">*</span>
            </span>
            <CodeSelect
              value={value?.employeeStatus || ""}
              onChange={update("employeeStatus")}
              disabled={isRO("employeeStatus")}
              className={inputCls}
              category="EMPLOYEE_STATUS"
              required
            />
          </label>
        </div>
      </div>

      {/* 계좌 정보 */}
      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-3">계좌 정보</h4>
        <div className={gridCls}>
          {/* 은행코드 */}
          <label className="flex flex-col text-sm">
            <span className={labelCls}>은행</span>
            <BankSelect
              value={value?.bankCode || ""}
              onChange={update("bankCode")}
              disabled={isRO("bankCode")}
              className={inputCls}
            />
          </label>

          {/* 계좌번호 */}
          <label className="flex flex-col text-sm">
            <span className={labelCls}>계좌번호 <span className="ml-2 text-xs text-gray-500">(선택)</span></span>
            <TextInput
              value={value?.bankAccountNo || ""}
              onChange={update("bankAccountNo")}
              placeholder="000-000-000000"
              disabled={isRO("bankAccountNo")}
              className={inputCls}
            />
          </label>
        </div>
      </div>

      {/* 제출 버튼(필요 시 숨김 가능) */}
      {showSubmit && (
        <div className="pt-3 border-t">
          <button
            type="submit"
            className="w-full bg-[#222E8D] text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 transition disabled:opacity-50"
            disabled={disabled || submitting}
          >
            {submitting ? (mode === "create" ? "임용 처리중..." : "저장중...") : finalSubmitText}
          </button>
        </div>
      )}
    </form>
  );
}