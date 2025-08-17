
export default function EmployeeConsultListGrid({
  columns = [],
  rows = [],
  rowKey = (row, idx) => idx,
  loading = false,
  emptyText = "표시할 데이터가 없습니다.",
  wrapperClassName = "",
  headerClassName = "",
  rowClassName = "",
  ellipsis = false, 
}) {
  const visibleColumns = columns.filter((c) => c?.visible !== false);
  const template = `repeat(${visibleColumns.length}, minmax(0, 1fr))`;
  const cellTextCls = ellipsis ? "truncate" : "overflow-visible whitespace-normal";

  const colStyle = (col) => {
    const style = {};
    if (col?.width) style.width = col.width;
    if (col?.minWidth) style.minWidth = col.minWidth;
    if (!col?.width && !col?.minWidth) style.minWidth = "10rem";
    return style;
   
  };

  return (
    <div className={`border border-gray-300 rounded-md overflow-hidden ${wrapperClassName}`}>
      <div className="w-full overflow-x-auto">
        {/* Header */}
        <div
          className={`grid bg-[#E0E7E9] text-[#354649] text-sm font-semibold ${headerClassName}`}
          style={{ gridTemplateColumns: template, minWidth: "640px" }}
        >
          {visibleColumns.map((col) => (
            <div
              key={`header-${col.key}`}
              className={`px-4 py-2 ${col.headerClassName || ""}`}
              style={colStyle(col)}
              title={typeof col.header === "string" ? col.header : undefined}
            >
              {col.header}
            </div>
          ))}
        </div>

        {/* Body */}
        {loading ? (
          <div className="text-center py-6 text-gray-500">로딩 중...</div>
        ) : rows.length === 0 ? (
          <div className="text-center py-6 text-gray-500">{emptyText}</div>
        ) : (
          rows.map((row, idx) => {
            const key = typeof rowKey === "function" ? rowKey(row, idx) : row?.[rowKey] ?? idx;
            return (
              <div
                key={key}
                className={`grid border-t border-gray-200 text-sm text-[#354649] hover:bg-gray-50 ${rowClassName}`}
                style={{ gridTemplateColumns: template, minWidth: "640px" }}
              >
                {visibleColumns.map((col) => (
                  <div
                    key={`${key}-${col.key}`}
                    className={`px-4 py-2 ${cellTextCls} ${col.className || ""}`}
                    style={colStyle(col)}
                    title={ellipsis ? String(col.render ? col.render(row) : row?.[col.key] ?? "") : undefined}
                  >
                    {typeof col.render === "function" ? col.render(row) : (row?.[col.key] ?? "-")}
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
