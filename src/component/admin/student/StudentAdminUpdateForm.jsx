import TextInput from "../../common/TextInput";
import CodeDisplay from "../../common/CodeConverter/CodeDisplay";
import { 
  GenderSelect, 
  StudentStatusSelect, 
  SchoolSubjectSelect, 
  BankSelect,
  GradeSelect 
} from "../../common/CodeConverter/CodeSelect";

export default function StudentAdminUpdateForm({
  value,
  onChange,
  disabled = false,
  readOnlyFields = [],
  className = "",
  mode = "edit" // 'create' | 'edit' | 'view'
}) {
  const update = (key) => (e) =>
    onChange((prev) => ({ ...prev, [key]: e.target.value }));

  const isRO = (key) => disabled || readOnlyFields.includes(key);
  const isCreateMode = mode === "create";

  // 유효성 검증
  const validateForm = () => {
    const errors = [];
    
    if (!value.name?.trim()) errors.push("이름은 필수입니다.");
    if (!value.email?.trim()) errors.push("이메일은 필수입니다.");
    if (value.email && !value.email.includes("@")) errors.push("올바른 이메일 형식이 아닙니다.");
    if (!value.birthDate) errors.push("생년월일은 필수입니다.");
    if (!value.admissionDate) errors.push("입학일자는 필수입니다.");
    if (!value.gender) errors.push("성별은 필수입니다.");
    if (!value.grade) errors.push("학년은 필수입니다.");
    if (!value.schoolSubjectCode) errors.push("학과는 필수입니다.");
    if (!value.studentStatusCode) errors.push("학적상태는 필수입니다.");
    
    return errors;
  };

  const validationErrors = validateForm();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 학번 - 등록 모드에서는 표시하지 않음 */}
      {!isCreateMode && (
        <div className="grid grid-cols-1">
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">학번</span>
            <div className="flex items-center justify-between">
              <TextInput
                value={value.studentNo || ""}
                disabled={true}
                placeholder="자동 생성됩니다"
                className="border rounded px-3 py-2 bg-gray-50 text-gray-600 flex-1"
              />
              {value.studentNo && (
                <span className="ml-2 text-xs text-green-600 font-medium">등록 완료</span>
              )}
            </div>
          </label>
        </div>
      )}

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
              {value.gender && (
                <span className="ml-2 text-xs text-gray-500">
                  (현재: <CodeDisplay category="gender" code={value.gender} />)
                </span>
              )}
            </span>
            <GenderSelect
              value={value.gender || ""}
              onChange={update("gender")}
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
                  (현재: <CodeDisplay category="schoolSubject" code={value.schoolSubjectCode} />)
                </span>
              )}
            </span>
            <SchoolSubjectSelect
              value={value.schoolSubjectCode || ""}
              onChange={update("schoolSubjectCode")}
              disabled={isRO("schoolSubjectCode")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>

          {/* 학적상태 */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">
              학적상태 <span className="text-red-500">*</span>
              {value.studentStatusCode && (
                <span className="ml-2 text-xs text-gray-500">
                  (현재: <CodeDisplay category="studentStatus" code={value.studentStatusCode} />)
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
              대학코드 <span className="text-red-500">*</span>
            </span>
            <TextInput
              value={value.universityCode || ""}
              onChange={update("universityCode")}
              placeholder="10"
              disabled={isRO("universityCode")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </label>

          {/* 동아리코드 */}
          <label className="flex flex-col text-sm">
            <span className="font-medium text-gray-700 mb-1">동아리코드</span>
            <TextInput
              value={value.clubCode || ""}
              onChange={update("clubCode")}
              placeholder="C1001"
              disabled={isRO("clubCode")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>

          {/* 지도교수ID */}
          <label className="flex flex-col text-sm col-span-2">
            <span className="font-medium text-gray-700 mb-1">지도교수ID</span>
            <TextInput
              value={value.advisorNo || ""}
              onChange={update("advisorNo")}
              placeholder="P141001"
              disabled={isRO("advisorNo")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <span className="font-medium text-gray-700 mb-1">
              은행
            </span>
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
              placeholder="000-0000-000000"
              disabled={isRO("bankAccountNo")}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>
      </div>
    </div>
  );
}