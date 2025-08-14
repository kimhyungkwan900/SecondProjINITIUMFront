

export default function ConsultKindListTable({
  rows = [],
  loading = false,
  variant = "card", // "bare"면 외곽 카드 없음
}) {
  // 정렬 상태
  let currentField = "", currentDir = "";

  // 헤더/바디 동일 열 정의(분수단위 고정)
  const COLS = [
  'minmax(120px, max-content)',
  'minmax(140px, max-content)',
  'minmax(120px, max-content)',
].join(' ');

  const Header = (
    <div
      className="inline-grid w-max bg-gray-100 border-b border-gray-200"
      style={{ gridTemplateColumns: COLS }}
    >
      {[
        ["dscsnKindId", "상담항목 코드"],
        ["dscsnKindName", "상담항목명"],
        ["dscsnType", "상담종류"],
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
        return (
            <div
                key={s.dscsnInfoId || idx}
                className={
                "grid border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer "
                }
                style={{ gridTemplateColumns: COLS }}
            >
            <div className="px-3 py-3 text-sm font-medium border-r last:border-r-0 border-gray-100 min-w-0">
                {s.dscsnKindId}
            </div>
            <div className="px-3 py-3 text-sm font-medium border-r last:border-r-0 border-gray-100 min-w-0">
                {s.dscsnKindName}
            </div>
            <div className="px-3 py-3 text-sm border-r last:border-r-0 border-gray-100 whitespace-nowrap min-w-0 overflow-auto">
                {s.dscsnType}
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