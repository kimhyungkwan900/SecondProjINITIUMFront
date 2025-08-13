export default function PageButton({
  totalPages,
  currentPage,
  onPageChange,
  disabled = false,
  maxVisible = 10,
  className = "",
}) {
  const tp = Math.max(1, Math.floor(totalPages || 1));
  const cp = clamp(currentPage, 1, tp);

  const chunkStart = Math.floor((cp - 1) / maxVisible) * maxVisible + 1;
  const chunkEnd = Math.min(chunkStart + maxVisible - 1, tp);

  const pages = [];
  for (let p = chunkStart; p <= chunkEnd; p++) pages.push(p);

  const canPrev = cp > 1;
  const canNext = cp < tp;
  const hasLeftMore = chunkStart > 1;
  const hasRightMore = chunkEnd < tp;

  const go = (p) => {
    if (disabled) return;
    const next = clamp(p, 1, tp);
    if (next !== cp) onPageChange(next); // 1-based 그대로 콜백
  };

  const btnBase =
    "min-w-9 h-9 px-3 inline-flex items-center justify-center rounded border text-sm transition";
  const btnGhost =
    "border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none";
  const btnActive =
    "border-blue-600 bg-blue-50 text-blue-700 font-medium hover:bg-blue-100";
  const iconBtn =
    "min-w-9 h-9 px-2 inline-flex items-center justify-center rounded border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none";

  return (
    <nav className={`flex items-center gap-1 select-none ${className}`} aria-label="Pagination">
      {/* First / Prev */}
      <button
        type="button"
        className={iconBtn}
        onClick={() => go(1)}
        disabled={!canPrev || disabled}
        aria-label="첫 페이지"
      >
        «
      </button>
      <button
        type="button"
        className={iconBtn}
        onClick={() => go(cp - 1)}
        disabled={!canPrev || disabled}
        aria-label="이전 페이지"
      >
        ‹
      </button>

      {/* 왼쪽 … (이전 청크) */}
      {hasLeftMore && (
        <>
          <button
            type="button"
            className={`${btnBase} ${btnGhost}`}
            onClick={() => go(1)}
            disabled={disabled}
            aria-label="1 페이지로 이동"
          >
            1
          </button>
          <button
            type="button"
            className={iconBtn}
            onClick={() => go(chunkStart - 1)}
            disabled={disabled}
            aria-label="이전 10페이지로 이동"
            title="이전 10페이지"
          >
            …
          </button>
        </>
      )}

      {/* 현재 청크 (최대 10개) */}
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`${btnBase} ${p === cp ? btnActive : btnGhost}`}
          onClick={() => go(p)}
          aria-current={p === cp ? "page" : undefined}
          disabled={disabled}
        >
          {p}
        </button>
      ))}

      {/* 오른쪽 … (다음 청크) */}
      {hasRightMore && (
        <>
          <button
            type="button"
            className={iconBtn}
            onClick={() => go(chunkEnd + 1)}
            disabled={disabled}
            aria-label="다음 10페이지로 이동"
            title="다음 10페이지"
          >
            …
          </button>
          <button
            type="button"
            className={`${btnBase} ${btnGhost}`}
            onClick={() => go(tp)}
            disabled={disabled}
            aria-label={`${tp} 페이지로 이동`}
          >
            {tp}
          </button>
        </>
      )}

      {/* Next / Last */}
      <button
        type="button"
        className={iconBtn}
        onClick={() => go(cp + 1)}
        disabled={!canNext || disabled}
        aria-label="다음 페이지"
      >
        ›
      </button>
      <button
        type="button"
        className={iconBtn}
        onClick={() => go(tp)}
        disabled={!canNext || disabled}
        aria-label="마지막 페이지"
      >
        »
      </button>
    </nav>
  );
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}