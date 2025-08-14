export default function EmployeeListToolBar({
  onSearch,
  loading = false,
  onReset,   // 선택
  onCreate,  // 선택: 생성(임용) 버튼 표시용
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <button
          className="bg-[#222E8D] text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-800 transition disabled:opacity-50"
          onClick={onSearch}
          disabled={loading}
        >
          {loading ? "조회중..." : "조회"}
        </button>

        {typeof onCreate === "function" && (
          <button
            className="px-3 py-1 rounded text-sm font-semibold border hover:bg-gray-50 disabled:opacity-50"
            onClick={onCreate}
            disabled={loading}
          >
            생성(임용)
          </button>
        )}

        {typeof onReset === "function" && (
          <button
            className="px-3 py-1 rounded text-sm font-semibold hover:bg-gray-100 disabled:opacity-50"
            onClick={onReset}
            disabled={loading}
          >
            초기화
          </button>
        )}
      </div>
    </div>
  );
}