export default function StudentDetailPanel({
  value,
  onChange,
  disabled = false,
  readOnlyFields = [],
  title = "상세정보",
  className = "",
}) {
  const update = (key) => (e) =>
    onChange((prev) => ({ ...prev, [key]: e.target.value }));

  const isRO = (key) => disabled || readOnlyFields.includes(key);

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-3 ${className}`}>
      <div className="text-sm font-semibold text-gray-700 mb-2">{title}</div>

      {/* 라벨 고정폭 + 인풋 풀폭 레이아웃 */}
      <div className="space-y-2">
        {/* 학번(표시용) */}
        {value?.studentNo !== undefined && (
          <div className="grid grid-cols-[120px_1fr] items-center gap-2">
            <div className="text-sm text-gray-600">학번</div>
            <TextInput value={value.studentNo || ""} disabled className="px-2 py-1" />
          </div>
        )}

        {/* 이름 */}
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <div className="text-sm text-gray-600">이름</div>
          <TextInput
            value={value.name || ""}
            onChange={update("name")}
            disabled={isRO("name")}
            placeholder="홍길동"
            className="px-2 py-1"
          />
        </div>

        {/* 이메일 */}
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <div className="text-sm text-gray-600">이메일</div>
          <TextInput
            value={value.email || ""}
            onChange={update("email")}
            disabled={isRO("email")}
            placeholder="user@univ.ac.kr"
            className="px-2 py-1"
          />
        </div>

        {/* 생년월일 / 입학일자 */}
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <div className="text-sm text-gray-600">생년월일</div>
          <TextInput
            value={value.birthDate || ""}
            onChange={update("birthDate")}
            disabled={isRO("birthDate")}
            placeholder="YYYY-MM-DD"
            className="px-2 py-1"
          />
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <div className="text-sm text-gray-600">입학일자</div>
          <TextInput
            value={value.admissionDate || ""}
            onChange={update("admissionDate")}
            disabled={isRO("admissionDate")}
            placeholder="YYYY-MM-DD"
            className="px-2 py-1"
          />
        </div>

        {/* 성별 / 학년 */}
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <div className="text-sm text-gray-600">성별코드</div>
          <TextInput
            value={value.gender || ""}
            onChange={update("gender")}
            disabled={isRO("gender")}
            placeholder="10/20"
            className="px-2 py-1"
          />
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <div className="text-sm text-gray-600">학년</div>
          <TextInput
            value={value.grade || ""}
            onChange={update("grade")}
            disabled={isRO("grade")}
            placeholder="1~4"
            className="px-2 py-1"
          />
        </div>

        {/* 동아리 / 대학 / 학과 */}
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <div className="text-sm text-gray-600">동아리코드</div>
          <TextInput
            value={value.clubCode || ""}
            onChange={update("clubCode")}
            disabled={isRO("clubCode")}
            placeholder="C1001"
            className="px-2 py-1"
          />
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <div className="text-sm text-gray-600">대학코드</div>
          <TextInput
            value={value.universityCode || ""}
            onChange={update("universityCode")}
            disabled={isRO("universityCode")}
            placeholder="10"
            className="px-2 py-1"
          />
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <div className="text-sm text-gray-600">학과코드</div>
          <TextInput
            value={value.schoolSubjectCode || ""}
            onChange={update("schoolSubjectCode")}
            disabled={isRO("schoolSubjectCode")}
            placeholder="141101"
            className="px-2 py-1"
          />
        </div>

        {/* 지도교수 / 계좌번호 / 학적상태 */}
        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <div className="text-sm text-gray-600">지도교수ID</div>
          <TextInput
            value={value.advisorNo || ""}
            onChange={update("advisorNo")}
            disabled={isRO("advisorNo")}
            placeholder="P141001"
            className="px-2 py-1"
          />
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <div className="text-sm text-gray-600">계좌번호</div>
          <TextInput
            value={value.bankAccountNo || ""}
            onChange={update("bankAccountNo")}
            disabled={isRO("bankAccountNo")}
            placeholder="000-0000-000000"
            className="px-2 py-1"
          />
        </div>

        <div className="grid grid-cols-[120px_1fr] items-center gap-2">
          <div className="text-sm text-gray-600">학적상태코드</div>
          <TextInput
            value={value.studentStatusCode || ""}
            onChange={update("studentStatusCode")}
            disabled={isRO("studentStatusCode")}
            placeholder="10/20/40/50"
            className="px-2 py-1"
          />
        </div>
      </div>
    </div>
  );
}