export default function AdminListToolbar({
  onSearch,
  loading = false,
  onReset,
  onCreate,
  searchButtonText = "조회",
  createButtonText = "생성",
  resetButtonText = "초기화",
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {/* 조회 버튼 */}
        <button
          className="bg-[#222E8D] text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-800 transition disabled:opacity-50"
          onClick={onSearch}
          disabled={loading}
        >
          {loading ? "조회중..." : searchButtonText}
        </button>

        {/* 생성 버튼 (onCreate 함수가 있을 때만 렌더링) */}
        {typeof onCreate === "function" && (
          <button
            className="px-3 py-1 rounded text-sm font-semibold border hover:bg-gray-50 disabled:opacity-50"
            onClick={onCreate}
            disabled={loading}
          >
            {createButtonText}
          </button>
        )}

        {/* 초기화 버튼 (onReset 함수가 있을 때만 렌더링) */}
        {typeof onReset === "function" && (
          <button
            className="px-3 py-1 rounded text-sm font-semibold hover:bg-gray-100 disabled:opacity-50"
            onClick={onReset}
            disabled={loading}
          >
            {resetButtonText}
          </button>
        )}
      </div>
    </div>
  );
}