import PageButton from "../PageButton.jsx";

const RequestList = ({
  programList = [],
  onSelect,
  currentPage,
  totalPages,
  onPageChange,
  selectedId,
}) => {
  const statusMap = {
    REQUESTED: "요청",
    APPROVED: "승인",
    REJECTED: "반려",
    IN_PROGRESS: "운영중",
    ENDED: "운영종료",
  };

  const eduTypeMap = { PERSONAL: "개인", TEAM: "팀" };

  // 표 높이 고정을 위한 행 높이 (페이지당 5행 가정)
  const ROWS_PER_PAGE = 5;
  const rowHeight = 240 / ROWS_PER_PAGE;
  const fillerCount = Math.max(0, ROWS_PER_PAGE - programList.length);

  return (
    <div className="adm-card mt-4 overflow-x-auto">
      <table className="w-full table-fixed border-collapse text-sm">
        <thead className="bg-[#F9FAFB] text-gray-700">
          <tr className="text-center">
            <th scope="col" className="adm-th" style={{ width: "8%" }}>
              ID
            </th>
            <th scope="col" className="adm-th text-left" style={{ width: "42%" }}>
              프로그램 명
            </th>
            <th scope="col" className="adm-th" style={{ width: "10%" }}>
              타입
            </th>
            <th scope="col" className="adm-th" style={{ width: "15%" }}>
              요청자
            </th>
            <th scope="col" className="adm-th" style={{ width: "15%" }}>
              부서
            </th>
            <th scope="col" className="adm-th" style={{ width: "10%" }}>
              상태
            </th>
          </tr>
        </thead>

        <tbody>
          {programList.length === 0 ? (
            <tr style={{ height: "240px" }}>
              <td colSpan={6} className="adm-td text-center text-gray-500 align-middle">
                등록된 프로그램이 없습니다.
              </td>
            </tr>
          ) : (
            <>
              {programList.map((program) => {
                const selected = selectedId === program.eduMngId;
                return (
                  <tr
                    key={program.eduMngId}
                    onClick={() => onSelect?.(program)}
                    aria-selected={selected ? "true" : "false"}
                    className={`cursor-pointer border-t border-gray-200 hover:bg-gray-50 even:bg-gray-50/50 ${selected ? "bg-[#E0E7E9] font-semibold" : "bg-white"
                      }`}
                    style={{ height: `${rowHeight}px` }}
                    title={program.eduNm}
                  >
                    <td className="adm-td text-center align-middle">{program.eduMngId}</td>
                    <td className="adm-td text-left align-middle truncate">{program.eduNm}</td>
                    <td className="adm-td text-center align-middle">
                      {eduTypeMap[program.eduType] || program.eduType}
                    </td>
                    <td className="adm-td text-center align-middle">{program.name}</td>
                    <td className="adm-td text-center align-middle">{program.subjectName}</td>
                    <td className="adm-td text-center align-middle">
                      {statusMap[program.eduSttsNm] || program.eduSttsNm}
                    </td>
                  </tr>
                );
              })}

              {/* 빈 행으로 표 높이 유지 */}
              {Array.from({ length: fillerCount }).map((_, idx) => (
                <tr key={`empty-${idx}`} style={{ height: `${rowHeight}px` }}>
                  <td className="adm-td">&nbsp;</td>
                  <td className="adm-td" />
                  <td className="adm-td" />
                  <td className="adm-td" />
                  <td className="adm-td" />
                  <td className="adm-td" />
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      {/* 하단 페이지네이션 바 */}
      <div className="px-4 py-3 flex items-center justify-end border-t border-gray-200">
        <PageButton
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default RequestList;
