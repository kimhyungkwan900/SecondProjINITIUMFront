export default function ConsultListTable({
  rows = [],
  loading = false,
  onCancel,
  variant = "card", // "bare"면 외곽 카드 없음
}) {
  // 정렬 상태
  let currentField = "", currentDir = "";

  // 헤더/바디 동일 열 정의(분수단위 고정)
  const COLS = [
  'minmax(120px, max-content)',
  'minmax(140px, max-content)',
  'minmax(120px, max-content)',
  'minmax(120px, max-content)',
  'minmax(120px, max-content)',
  'minmax(120px, max-content)',
  'minmax(120px, max-content)',
  'minmax(100px, max-content)',
  'minmax(120px, max-content)',
  'minmax(140px, max-content)',
  'minmax(160px, max-content)',
  'minmax(120px, max-content)',
  'minmax(200px, max-content)',
  'minmax(200px, max-content)',
].join(' ');

  const Header = (
    <div
      className="inline-grid w-max bg-gray-100 border-b border-gray-200"
      style={{ gridTemplateColumns: COLS }}
    >
      {[
        ["scheduleDate", "상담일"],
        ["startTime", "상담시간"],
        ["empName", "상담자명"],
        ["dscsnTypeName", "상담구분"],
        ["dscsnStatus", "상담상태"],
        ["applyCancel", "상담취소"],
        ["name", "이름"],
        ["studentNo", "학번"],
        ["schoolSubject", "소속"],
        ["studentTelno", "연락처"],
        ["email", "이메일"],
        ["dscsnKindName", "상담유형"],
        ["dscsnApplyCn", "상담신청내용"],
        ["dscsnResultCn", "상담결과내용"],
      ].map(([field, label]) => (
        <div
          key={field}
          className="px-3 py-3 text-sm font-medium text-gray-700 border-r last:border-r-0 border-gray-200 cursor-pointer select-none min-w-0"
          title={label}
        >
          <span>{label}</span>{" "}
          {currentField === field && <span>{currentDir === "asc" ? "▲" : "▼"}</span>}
        </div>
      ))}
    </div>
  );

  const Body =
    loading ? (
      <div className="py-6 text-center text-gray-400 border-b border-gray-200">
        로딩 중...
      </div>
    ) : rows.length === 0 ? (
      <div className="py-6 text-center text-gray-400 border-b border-gray-200">
        데이터가 없습니다
      </div>
    ) : (
      rows.map((s, idx) => {
        const scheduleDate = s.dscsnApplyDto.dscsnScheduleDto.scheduleDate;
        const startTime = s.dscsnApplyDto.dscsnScheduleDto.startTime;
        const empName = s.dscsnApplyDto.dscsnScheduleDto.empName;
        const dscsnTypeName = s.dscsnApplyDto.dscsnKindDto.dscsnTypeName;
        const name = s.dscsnApplyDto.studentDto.name;
        const studentNo = s.dscsnApplyDto.studentDto.studentNo;
        const schoolSubject = s.dscsnApplyDto.studentDto.schoolSubject;
        const studentTelno = s.dscsnApplyDto.studentTelno;
        const email = s.dscsnApplyDto.studentDto.email;
        const dscsnKindName = s.dscsnApplyDto.dscsnKindDto.dscsnKindName;
        const dscsnApplyCn = s.dscsnApplyDto.dscsnApplyCn;
        const dscsnResultCn = s.dscsnApplyDto.dscsnResultCn;

        return (
            <div
                key={s.dscsnInfoId || idx}
                className={
                "grid border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer "
                }
                style={{ gridTemplateColumns: COLS }}
            >
            <div className="px-3 py-3 text-sm font-medium border-r last:border-r-0 border-gray-100 min-w-0">
                {`${scheduleDate.slice(0,4)}-${scheduleDate.slice(4,6)}-${scheduleDate.slice(6)}`}
            </div>
            <div className="px-3 py-3 text-sm font-medium border-r last:border-r-0 border-gray-100 min-w-0">
                {`${startTime.slice(0,2)}:${startTime.slice(2)}`}
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 whitespace-nowrap min-w-0 overflow-auto">
                {empName}
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 whitespace-nowrap min-w-0">
                {dscsnTypeName}
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 whitespace-nowrap min-w-0">
                {s.dscsnStatus}
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 whitespace-nowrap min-w-0">
                <button onClick={()=> onCancel(s.dscsnInfoId)} className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-3 py-1 rounded">취소</button>
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 whitespace-nowrap min-w-0">
                {name}
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 whitespace-nowrap min-w-0">
                {studentNo}
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 whitespace-nowrap min-w-0">
                {schoolSubject}
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 whitespace-nowrap min-w-0">
                {studentTelno}
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 min-w-0">
                <div className="truncate" title={email}>{email}</div>
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 whitespace-nowrap min-w-0">
                {dscsnKindName}
            </div>
            <div className="px-3 py-3 text-sm whitespace-nowrap min-w-0">
                {dscsnApplyCn}
            </div>
            <div className="px-3 py-3 text-sm whitespace-nowrap min-w-0">
                {dscsnResultCn}
            </div>
          </div>
        );
      })
    );
    
  const Inner = (
    <div className="overflow-x-auto">
      <div className="min-w-[980px]">
        {Header}
        {Body}
      </div>
    </div>
  );

  if (variant === "bare") return <div className="w-full">{Inner}</div>;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {Inner}
    </div>
  );
}