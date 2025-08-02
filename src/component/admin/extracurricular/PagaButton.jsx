

const PageButton =() => {
     return (
    <div className="flex justify-center items-center gap-3 mt-4 text-sm">
      {/* 이전 페이지 버튼 */}
      <button
        className="px-2 py-1 rounded hover:bg-gray-200 border border-gray-300"
        disabled // 페이지 1이라면 이전 버튼은 비활성화
      >
        &lt;
      </button>

      {/* 현재 페이지 번호 */}
      <span className="px-3 py-1 border border-gray-300 rounded bg-white">
        1
      </span>

      {/* 다음 페이지 버튼 */}
      <button
        className="px-2 py-1 rounded hover:bg-gray-200 border border-gray-300"
        disabled // 예시상 페이지 1개라 다음 버튼도 비활성화
      >
        &gt;
      </button>
    </div>
  );
};
export default PageButton;