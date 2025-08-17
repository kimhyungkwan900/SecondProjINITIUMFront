import { useState } from "react";
import PageButton from "../PageButton.jsx";
const SurveyProgramList = ({ programs, currentPage, totalPages, onPageChange, onSelectProgram }) => {
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
    <div className="adm-card overflow-x-auto mt-6">
      <table className="w-full table-auto border-collapse" style={{ tableLayout: 'fixed' }}>
        <thead className="text-center">
          <tr>
            <th className="adm-th" style={{ width: "5%" }}>ID</th>
            <th className="adm-th text-left" style={{ width: "40%" }}>프로그램 명</th>
            <th className="adm-th" style={{ width: "5%" }}>타입</th>
            <th className="adm-th" style={{ width: "10%" }}>부서</th>
            <th className="adm-th" style={{ width: "15%" }}>교육종료일</th>
            <th className="adm-th" style={{ width: "10%" }}>등록된설문</th>
          </tr>
        </thead>
        <tbody>
          {programs.length === 0 ? (
            <tr style={{ height: '240px' }}>
              <td colSpan="6" className="adm-td p-4 text-center text-gray-500 align-middle">
                등록된 프로그램이 없습니다.
              </td>
            </tr>
          ) : (
            <>
              {programs.map((program) => (
                <tr
                  key={program.eduMngId}
                  className={`cursor-pointer adm-row ${ selectedId === program.eduMngId ? "bg-[#E0E7E9] font-semibold" : "hover:bg-gray-50 text-gray-700" }`}
                  style={{ height: `${rowHeight}px` }}
                  onClick={() => handleRowClick(program)}
                >
                  <td className="adm-td">{program.eduMngId}</td>
                  <td className="adm-td text-left">{program.eduNm}</td>
                  <td className="adm-td">{eduTypeMap[program.eduType] || program.eduType}</td>
                  <td className="adm-td">{program.subjectName}</td>
                  <td className="adm-td">{program.eduEndDt?.replace("T", " ") || "-"}</td>
                  <td className="adm-td">{program.totalSurvey}</td>
                </tr>
              ))}
              {/* 빈 행 추가로 높이 맞추기 */}
              {Array.from({ length: 5 - programs.length }).map((_, idx) => (
                <tr key={`empty-${idx}`} style={{ height: `${rowHeight}px` }}>
                  <td className="adm-td">&nbsp;</td>
                  <td className="adm-td"></td>
                  <td className="adm-td"></td>
                  <td className="adm-td"></td>
                  <td className="adm-td"></td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>

      {/* 하단 컨트롤 바 */}
      <div className="px-4 py-3 flex justify-end items-center border-t border-gray-200">
        <PageButton
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default SurveyProgramList;