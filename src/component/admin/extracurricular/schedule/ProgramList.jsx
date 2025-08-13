import { useState } from "react";
import PageButton from "../PagaButton";
const ProgramList = ({ programs, currentPage, totalPages, onPageChange, onSelectProgram }) => {
  const eduTypeMap = {
    PERSONAL: "개인",
    TEAM: "팀",
  };

  const rowHeight = 240 / 5; // 5행 기준 높이 조절

  const [selectedId, setSelectedId] = useState(null);

  const handleRowClick = (program) => {
    setSelectedId(program.eduMngId);
    onSelectProgram(program);
  };

  return (
    <div className="w-full overflow-x-auto mt-6 bg-white border rounded p-4">
      <table className="w-full table-auto border-collapse border" style={{ tableLayout: 'fixed' }}>
        <thead className="bg-gray-100 text-center">
          <tr>
            <th className="border p-2" style={{ width: "5%" }}>ID</th>
            <th className="border p-2 text-left" style={{ width: "40%" }}>프로그램 명</th>
            <th className="border p-2" style={{ width: "5%" }}>타입</th>
            <th className="border p-2" style={{ width: "10%" }}>부서</th>
            <th className="border p-2" style={{ width: "15%" }}>마감 시간</th>
            <th className="border p-2" style={{ width: "5%" }}>인원</th>
          </tr>
        </thead>
        <tbody>
          {programs.length === 0 ? (
            <tr style={{ height: '240px' }}>
              <td colSpan="6" className="border p-4 text-center text-gray-500 align-middle">
                등록된 프로그램이 없습니다.
              </td>
            </tr>
          ) : (
            <>
              {programs.map((program) => (
                <tr
                  key={program.eduMngId}
                  className={`cursor-pointer border-t text-center ${
                    selectedId === program.eduMngId
                      ? " t font-bold"
                      : "hover:bg-gray-200 text-gray-700"
                  }`}
                  style={{ height: `${rowHeight}px` }}
                  onClick={() => handleRowClick(program)}
                >
                  <td className="border p-2">{program.eduMngId}</td>
                  <td className="border p-2 text-left">{program.eduNm}</td>
                  <td className="border p-2">{eduTypeMap[program.eduType] || program.eduType}</td>
                  <td className="border p-2">{program.subjectName}</td>
                  <td className="border p-2">{program.eduAplyEndDt?.replace("T", " ") || "-"}</td>
                  <td className="border">{program.accept}/{program.eduPtcpNope}</td>
                </tr>
              ))}
              {/* 빈 행 추가로 높이 맞추기 */}
              {Array.from({ length: 5 - programs.length }).map((_, idx) => (
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

export default ProgramList;