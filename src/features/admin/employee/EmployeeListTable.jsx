import { CodeDisplay } from "../../../component/common/CodeConverter/CodeSelect";

export default function EmployeeListTable({
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

  const COLS = "7fr 7fr 9fr 7fr 7fr 10fr"; // empNo, name, subjectCode, employeeStatus, gender, email

  const Header = (
    <div
      className="grid bg-gray-100 border-b border-gray-200"
      style={{ gridTemplateColumns: COLS }}
    >
      {[
        ["empNo", "사번"],
        ["name", "이름"],
        ["subjectCode", "학과"],
        ["employeeStatus", "직원상태"],
        ["gender", "성별"],
        ["email", "이메일"],
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
      rows.map((r, idx) => {
        const isSelected = selectedNo === r.empNo;
        return (
          <div
            key={r.empNo || idx}
            className={
              "grid border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer " +
              (isSelected ? "bg-blue-50 ring-1 ring-blue-300" : "")
            }
            style={{ gridTemplateColumns: COLS }}
            onClick={() => onRowClick?.(r.empNo)}
          >
            <div className="px-3 py-3 text-sm font-medium border-r last:border-r-0 border-gray-100 min-w-0">
              {r.empNo}
            </div>
            <div className="px-3 py-3 text-sm font-medium border-r last:border-r-0 border-gray-100 min-w-0">
              {r.name}
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 min-w-0">
              <CodeDisplay category="SCHOOL_SUBJECT" code={r.subjectCode} />
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 min-w-0">
              <CodeDisplay category="EMPLOYEE_STATUS" code={r.employeeStatus || r.employeeStatusCode} />
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 min-w-0">
              <CodeDisplay category="GENDER" code={r.gender || r.genderCode} />
            </div>
            <div className="px-3 py-3 text-sm whitespace-nowrap min-w-0">
              <div className="truncate" title={r.email}>{r.email}</div>
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