import PageButton from "../PagaButton";

const RequestList = ({ 
  programList, 
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

  const eduTypeMap = {
    PERSONAL: "개인",
    TEAM: "팀",
  };

  const rowHeight = 240 / 5; 

  return (
    <div className="mt-4 border rounded p-4">
      <table className="w-full table-auto border-collapse border" style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border p-2" style={{ width: "5%" }}>ID</th>
            <th className="border p-2 text-left" style={{ width: "40%" }}>프로그램 명</th>
            <th className="border p-2" style={{ width: "5%" }}>타입</th>
            <th className="border p-2" style={{ width: "10%" }}>요청자</th>
            <th className="border p-2" style={{ width: "10%" }}>부서</th>
            <th className="border p-2" style={{ width: "10%" }}>상태</th>
          </tr>
        </thead>
        <tbody>
          {programList.length === 0 ? (
            <tr style={{ height: '240px' }}>
              <td colSpan="6" className="border p-4 text-center text-gray-500 align-middle">
                등록된 프로그램이 없습니다.
              </td>
            </tr>
          ) : (
            <>
              {programList.map((program) => (
                <tr
                  key={program.eduMngId}
                  className={`cursor-pointer hover:bg-gray-200 ${selectedId === program.eduMngId ? 'bg-gray-100 font-bold' : ''}`}
                  onClick={() => onSelect(program)}
                  style={{ height: `${rowHeight}px` }}
                >
                  <td className="border p-2 text-center">{program.eduMngId}</td>
                  <td className="border p-2 text-left">{program.eduNm}</td>
                  <td className="border p-2 text-center">
                    {eduTypeMap[program.eduType] || program.eduType}
                  </td>
                  <td className="border p-2 text-center">{program.name}</td>
                  <td className="border p-2 text-center">{program.subjectName}</td>
                  <td className="border p-2 text-center">
                    {statusMap[program.eduSttsNm] || program.eduSttsNm}
                  </td>
                </tr>
              ))}

              {/* 빈 행 채우기 */}
              {Array.from({ length: 5 - programList.length }).map((_, idx) => (
                <tr key={`empty-${idx}`} style={{ height: `${rowHeight}px` }}>
                  <td className="border p-2">&nbsp;</td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                  <td className="border p-2"></td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      <PageButton 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default RequestList;