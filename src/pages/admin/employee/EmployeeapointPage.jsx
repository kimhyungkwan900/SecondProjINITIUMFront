
import React, { useMemo, useState } from "react";
import dayjs from "dayjs";
import { CODEBOOK } from "../../../component/common/CodeBook";
import { appointInstructor, appointProfessor, appointStaff } from "../../../api/user/auth/employeesApi";

/**
 * props:
 *  - type: 'professor' | 'instructor' | 'staff'
 */
const EmployeeAppointPage = ({ type = "professor" }) => {
  const [form, setForm] = useState({
    name: "",
    birthDate: "",       // yyyy-MM-dd
    gender: "",          // 코드
    email: "",
    tel: "",
    schoolSubjectNo: "", // 코드
    bankAccountNo: "",
    employeeStatus: "",  // 코드
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const title = useMemo(() => {
    if (type === "professor") return "교수 임용";
    if (type === "instructor") return "강사 임용";
    return "직원 임용";
  }, [type]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const SchoolSubjectOptions = Object.entries(CODEBOOK.schoolSubject || {}).map(([v, l]) => ({ value: v, label: l }));
  const GenderOptions = Object.entries(CODEBOOK.gender || {}).map(([v, l]) => ({ value: v, label: l }));
  const EmpStatusOptions = Object.entries(CODEBOOK.employeeStatus || {}).map(([v, l]) => ({ value: v, label: l }));

  const validate = () => {
    const req = {
      name: "이름",
      birthDate: "생년월일",
      gender: "성별",
      email: "이메일",
      tel: "전화번호",
      schoolSubjectNo: "소속",
      employeeStatus: "상태",
    };
    const missing = Object.entries(req).filter(([k]) => !form[k] || String(form[k]).trim() === "");
    if (missing.length) {
      return `${missing[0][1]}을(를) 입력하세요.`;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.birthDate) || !dayjs(form.birthDate, "YYYY-MM-DD", true).isValid()) {
      return "생년월일 형식이 올바르지 않습니다. (YYYY-MM-DD)";
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "이메일 형식이 올바르지 않습니다.";
    if (!/^\d{7,}$/.test(form.tel.replace(/\D/g, ""))) return "전화번호를 숫자만 7자리 이상 입력하세요.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    setSubmitting(true);
    try {
      const dto = {
        name: form.name,
        birthDate: form.birthDate, // LocalDate 형식에 맞춰 YYYY-MM-DD
        gender: form.gender,
        email: form.email,
        tel: form.tel,
        schoolSubjectNo: form.schoolSubjectNo,
        bankAccountNo: form.bankAccountNo || "",
        employeeStatus: form.employeeStatus,
      };
      let res;
      if (type === "professor") res = await appointProfessor(dto);
      else if (type === "instructor") res = await appointInstructor(dto);
      else res = await appointStaff(dto);

      alert(`임용 완료: ${res.name} (${res.empNo})`);
    } catch (err) {
      console.error(err);
      setError("임용 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          form="appoint-form"
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? "저장 중..." : "저장"}
        </button>
      </div>

      <form id="appoint-form" onSubmit={onSubmit} className="grid grid-cols-12 gap-4 bg-white p-5 rounded border">
        {/* 이름 */}
        <FormRow label="이름" required>
          <input name="name" value={form.name} onChange={onChange} className="input" />
        </FormRow>

        {/* 생년월일 */}
        <FormRow label="생년월일" required>
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={onChange}
            className="input"
          />
        </FormRow>

        {/* 성별 */}
        <FormRow label="성별" required>
          <select name="gender" value={form.gender} onChange={onChange} className="input">
            <option value="">선택</option>
            {GenderOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </FormRow>

        {/* 이메일 */}
        <FormRow label="E-mail" required>
          <input type="email" name="email" value={form.email} onChange={onChange} className="input" />
        </FormRow>

        {/* 전화번호 */}
        <FormRow label="전화번호" required>
          <input name="tel" value={form.tel} onChange={onChange} className="input" placeholder="01012345678" />
        </FormRow>

        {/* 소속 부서/학과 */}
        <FormRow label="소속" required>
          <select
            name="schoolSubjectNo"
            value={form.schoolSubjectNo}
            onChange={onChange}
            className="input"
          >
            <option value="">선택</option>
            {SchoolSubjectOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </FormRow>

        {/* 계좌번호 */}
        <FormRow label="계좌번호">
          <input name="bankAccountNo" value={form.bankAccountNo} onChange={onChange} className="input" />
        </FormRow>

        {/* 교직원 상태 */}
        <FormRow label="상태" required>
          <select
            name="employeeStatus"
            value={form.employeeStatus}
            onChange={onChange}
            className="input"
          >
            <option value="">선택</option>
            {EmpStatusOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </FormRow>

        {error && (
          <div className="col-span-12 text-red-600 font-medium">{error}</div>
        )}
      </form>
    </div>
  );
};

// 공용 필드 래퍼 (레이아웃 2열씩)
const FormRow = ({ label, required, span = 6, children }) => (
  <div className={`col-span-12 md:col-span-${span} flex items-center`}>
    <div className="w-32 text-sm font-semibold">
      {required ? <span className="text-red-600 mr-1">*</span> : null}
      {label}
    </div>
    <div className="flex-1">{children}</div>
    <style jsx global>{`
      .input {
        @apply w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500;
      }
    `}</style>
  </div>
);

export default EmployeeAppointPage;
