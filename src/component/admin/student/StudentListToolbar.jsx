export default function StudentListToolbar({
  onSearch,
  loading = false,
  totalElements = 0,
  onReset,
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      {/* 검색 결과가 왼쪽에 있음 */}
      <div className="text-sm text-gray-600">
        검색결과: <b>{totalElements.toLocaleString()}</b>건
      </div>

      {/* 버튼과 설정이 오른쪽에 있음 */}
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
        </div>
      </div>
    </div>
  );
}