import React from "react";

export default function Pagination({ page, totalPages, onChange }) {
  // 페이지가 1페이지뿐이면 버튼 표시 안 함
  if (totalPages <= 1) return null;

  // 페이지 이동 함수
  const go = (p) => {
    // 범위 벗어나면 무시
    if (p < 1 || p > totalPages) return;
    // 부모에서 넘겨준 onChange 실행 → 보통 setPage 연결됨
    onChange(p);
  };

  // 페이지 번호 리스트 생성 (현재 페이지 기준 양쪽 버튼 개수 조절)
  const getPageNumbers = () => {
    const width = 5; // 한 번에 표시할 페이지 버튼 개수
    const half = Math.floor(width / 2);
    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + width - 1);
    start = Math.max(1, end - width + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="inline-flex items-center gap-1 mt-4">
      {/* 처음 페이지로 */}
      <button
        onClick={() => go(1)}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        «
      </button>

      {/* 이전 페이지 */}
      <button
        onClick={() => go(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        ‹
      </button>

      {/* 페이지 번호 버튼 */}
      {getPageNumbers().map((n) => (
        <button
          key={n}
          onClick={() => go(n)}
          className={`px-3 py-1 border rounded ${
            n === page ? "bg-blue-600 text-white" : ""
          }`}
        >
          {n}
        </button>
      ))}

      {/* 다음 페이지 */}
      <button
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        ›
      </button>

      {/* 마지막 페이지 */}
      <button
        onClick={() => go(totalPages)}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        »
      </button>
    </div>
  );
}
