import { useCallback, useMemo, useState } from "react";

export default function ProgramGridTableByEmpNo({
  columns = [],
  rows = [],
  rowKey = (row, idx) => idx,
  loading = false,
  emptyText = "표시할 데이터가 없습니다.",
  gridCols,                // 고정 템플릿을 직접 지정하고 싶을 때 "grid-cols-8" 등
  wrapperClassName = "",
  headerClassName = "",
  rowClassName = "",
  ellipsis = false,        // 전역 말줄임
  error = null,            // 선택: 에러 메시지
  striped = true,          // 지브라 스트라이프
  stickyHeader = true,     // 헤더 고정
  defaultSort,             // { key, dir: 'asc'|'desc' }
}) {
  // 1) visible columns
  const visibleColumns = useMemo(
    () => columns.filter((c) => c?.visible !== false),
    [columns]
  );

  // 2) grid template (flex와 width 조합 지원)
  const template = useMemo(() => {
    if (gridCols) return undefined;
    // width|minWidth 없으면 flex=1 로 취급 → 1fr
    const parts = visibleColumns.map((c) => {
      if (c?.width) return c.width; // ex) "160px" or "12rem"
      const fr = c?.flex ?? 1;
      return `minmax(${c?.minWidth || "8rem"}, ${fr}fr)`;
    });
    return parts.join(" ");
  }, [visibleColumns, gridCols]);

  // 3) 정렬 상태
  const [sort, setSort] = useState(() => {
    if (defaultSort?.key) return defaultSort;
    const firstSortable = visibleColumns.find((c) => c.sortable);
    return firstSortable ? { key: firstSortable.key, dir: "asc" } : null;
  });

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const col = visibleColumns.find((c) => c.key === sort.key);
    if (!col) return rows;

    const getter = (row) => {
      if (typeof col.valueGetter === "function") return col.valueGetter(row);
      return row?.[col.key];
    };
    const base = [...rows];
    base.sort((a, b) => {
      const va = getter(a);
      const vb = getter(b);
      if (va == null && vb == null) return 0;
      if (va == null) return sort.dir === "asc" ? -1 : 1;
      if (vb == null) return sort.dir === "asc" ? 1 : -1;
      // 숫자 우선 비교, 아니면 문자열 비교
      if (typeof va === "number" && typeof vb === "number") {
        return sort.dir === "asc" ? va - vb : vb - va;
      }
      const sa = String(va);
      const sb = String(vb);
      return sort.dir === "asc" ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });
    return base;
  }, [rows, sort, visibleColumns]);

  const toggleSort = useCallback((col) => {
    if (!col?.sortable) return;
    setSort((prev) => {
      if (!prev || prev.key !== col.key) return { key: col.key, dir: "asc" };
      return { key: col.key, dir: prev.dir === "asc" ? "desc" : "asc" };
    });
  }, []);

  const alignClass = (v) =>
    v === "right" ? "text-right" : v === "center" ? "text-center" : "text-left";

  const cellBaseCls = useMemo(
    () =>
      ellipsis
        ? "truncate"
        : "overflow-visible whitespace-normal break-keep",
    [ellipsis]
  );

  const cellStyle = useCallback((col) => {
    const s = {};
    if (col?.width) s.width = col.width;
    if (col?.minWidth) s.minWidth = col.minWidth;
    if (col?.maxWidth) s.maxWidth = col.maxWidth;
    if (!col?.width && !col?.minWidth) s.minWidth = "8rem";
    return s;
  }, []);

  return (
    <div
      className={`border border-gray-300 rounded-md overflow-hidden ${wrapperClassName}`}
      role="table"
      aria-label="프로그램 목록"
    >
      <div className="w-full overflow-x-auto">
        {/* Header */}
        <div
          className={`grid text-[#354649] text-sm font-semibold ${headerClassName} ${gridCols || ""} ${
            stickyHeader ? "sticky top-0 z-10" : ""
          }`}
          style={
            gridCols ? undefined : { gridTemplateColumns: template, minWidth: "720px" }
          }
          role="row"
        >
          {visibleColumns.map((col) => {
            const isSorted = sort?.key === col.key;
            return (
              <button
                key={`header-${col.key}`}
                type="button"
                onClick={() => toggleSort(col)}
                className={`px-4 py-2 bg-[#E0E7E9] border-b border-gray-300 ${alignClass(
                  col.headerAlign || col.align
                )} ${col.headerClassName || ""} ${col?.sortable ? "hover:bg-[#d6e0e2]" : ""}`}
                style={cellStyle(col)}
                title={
                  typeof col.header === "string"
                    ? col.header + (col?.sortable ? " (정렬)" : "")
                    : undefined
                }
                aria-sort={
                  col?.sortable
                    ? isSorted
                      ? sort.dir === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                    : undefined
                }
                role="columnheader"
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col?.sortable && (
                    <span className="text-[11px] opacity-70">
                      {isSorted ? (sort.dir === "asc" ? "▲" : "▼") : "↕"}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Body */}
        {error ? (
          <div className="text-center py-6 text-red-500" role="alert">
            {String(error)}
          </div>
        ) : loading ? (
          <div className="p-4 text-sm text-gray-500">로딩 중...</div>
        ) : sortedRows.length === 0 ? (
          <div className="text-center py-6 text-gray-500">{emptyText}</div>
        ) : (
          sortedRows.map((row, idx) => {
            const key =
              typeof rowKey === "function" ? rowKey(row, idx) : row?.[rowKey] ?? idx;
            return (
              <div
                key={key}
                className={`grid border-t border-gray-200 text-sm text-[#354649] ${
                  striped && idx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                } hover:bg-gray-50 ${rowClassName} ${gridCols || ""}`}
                style={
                  gridCols ? undefined : { gridTemplateColumns: template, minWidth: "720px" }
                }
                role="row"
              >
                {visibleColumns.map((col) => {
                  const rawVal =
                    typeof col.valueGetter === "function"
                      ? col.valueGetter(row)
                      : row?.[col.key];
                  const content =
                    typeof col.render === "function" ? col.render(row) : rawVal ?? "-";

                  const needEllipsis = col.ellipsis ?? ellipsis;
                  const titleAttr =
                    col.tooltip === false
                      ? undefined
                      : typeof col.tooltip === "function"
                      ? col.tooltip(row)
                      : needEllipsis
                      ? String(rawVal ?? content ?? "")
                      : undefined;

                  return (
                    <div
                      key={`${key}-${col.key}`}
                      className={`px-4 py-2 ${cellBaseCls} ${alignClass(
                        col.align
                      )} ${col.className || ""}`}
                      style={cellStyle(col)}
                      title={titleAttr}
                      role="cell"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}