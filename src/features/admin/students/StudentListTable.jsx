import { CodeDisplay } from "../../../component/common/CodeConverter/CodeSelect";


export default function StudentListTable({
  rows = [],
  loading = false,
  selectedNo = "",
  onRowClick,
  onSortChange,
  currentSort,
  variant = "card", // "bare"면 외곽 카드 없음
}) {
  // 정렬 상태
  let currentField = "", currentDir = "";
  if (currentSort) [currentField, currentDir] = currentSort.split(",");

  const handleHeaderClick = (field) => {
    if (!onSortChange) return;
    const nextDir = currentField === field && currentDir === "asc" ? "desc" : "asc";
    onSortChange(`${field},${nextDir}`);
  };

  // 헤더/바디 동일 열 정의(분수단위 고정)
  const COLS = "7fr 7fr 9fr 7fr 7fr 7fr 10fr 7fr";

  const Header = (
    <div
      className="grid bg-gray-100 border-b border-gray-200"
      style={{ gridTemplateColumns: COLS }}
    >
      {[
        ["studentNo", "학번"],
        ["name", "이름"],
        ["schoolSubjectCode", "학과"],
        ["studentStatusCode", "학적상태"],
        ["genderCode", "성별"],
        ["birthDate", "생년월일"],
        ["email", "이메일"],
        ["admissionDate", "입학일자"],
      ].map(([field, label]) => (
        <div
          key={field}
          className="px-3 py-3 text-sm font-medium text-gray-700 border-r last:border-r-0 border-gray-200 cursor-pointer select-none min-w-0"
          onClick={() => handleHeaderClick(field)}
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
        const isSelected = selectedNo === s.studentNo;
        return (
          <div
            key={s.studentNo || idx}
            className={
              "grid border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer " +
              (isSelected ? "bg-blue-50 ring-1 ring-blue-300" : "")
            }
            style={{ gridTemplateColumns: COLS }}
            onClick={() => onRowClick?.(s.studentNo)}
          >
            <div className="px-3 py-3 text-sm font-medium border-r last:border-r-0 border-gray-100 min-w-0">
              {s.studentNo}
            </div>
            <div className="px-3 py-3 text-sm font-medium border-r last:border-r-0 border-gray-100 min-w-0">
              {s.name}
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 min-w-0">
              <CodeDisplay category="SCHOOL_SUBJECT" code={s.schoolSubjectCode} />
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 min-w-0">
              <CodeDisplay category="STUDENT_STATUS" code={s.studentStatusCode} />
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 min-w-0">
              <CodeDisplay category="GENDER" code={s.genderCode} />
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 whitespace-nowrap min-w-0">
              {s.birthDate}
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 min-w-0">
              <div className="truncate" title={s.email}>{s.email}</div>
            </div>
            <div className="px-3 py-3 text-sm whitespace-nowrap min-w-0">
              {s.admissionDate}
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