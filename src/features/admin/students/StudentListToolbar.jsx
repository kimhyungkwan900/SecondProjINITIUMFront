export default function StudentListToolbar({
  onSearch,
  size,
  onSizeChange,
  loading = false,
  totalElements = 0,
  hasSearchCondition = false,
  onReset, // 선택
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="text-sm text-gray-600">
        검색결과: <b>{totalElements.toLocaleString()}</b>건
        {hasSearchCondition && (
          <span className="ml-2 inline-flex items-center text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
            조건 적용됨
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        
        <button
          className="bg-[#222E8D] text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-800 transition disabled:opacity-50"
          onClick={onSearch}
          disabled={loading}
        >
          {loading ? "조회중..." : "조회"}
        </button>

        {typeof onReset === "function" && (
          <button
            className="px-3 py-1 rounded text-sm font-semibold hover:bg-gray-100 disabled:opacity-50"
            onClick={onReset}
            disabled={loading}
          >
            초기화
          </button>
        )}

        <div className="flex items-center ml-2">
          <span className="mr-2 text-sm">표시개수</span>
          <select
            className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={size}
            onChange={onSizeChange}
            disabled={loading}
          >
            {[10, 15, 20, 30, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}