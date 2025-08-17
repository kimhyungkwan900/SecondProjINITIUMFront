import { useState, useMemo } from "react";
import PageButton from "../PageButton.jsx";

const SurveyProgramList = ({ 
  programs = [], 
  currentPage, 
  totalPages, 
  onPageChange, 
  onSelectProgram 
}) => {
  const eduTypeMap = { PERSONAL: "개인", TEAM: "팀" };

  // 한 화면 높이 유지: 5행 기준 총 240px
  const ROWS_PER_PAGE = 5;
  const rowHeight = 240 / ROWS_PER_PAGE;

  const [selectedId, setSelectedId] = useState(null);

  const placeholders = useMemo(
    () => Math.max(0, ROWS_PER_PAGE - (programs?.length || 0)),
    [programs]
  );

  const handleRowClick = (program) => {
    setSelectedId(program.eduMngId);
    onSelectProgram?.(program);
  };

  return (
    <div className="adm-card overflow-x-auto mt-6 p-0">
      <table className="w-full table-fixed border-collapse">
        {/* 고정 폭 지정 */}
        <colgroup>
          <col className="w-[5%]" />
          <col className="w-[40%]" />
          <col className="w-[5%]" />
          <col className="w-[10%]" />
          <col className="w-[15%]" />
          <col className="w-[25%]" />
        </colgroup>

        <thead className="text-center">
          <tr>
            <th className="adm-th">ID</th>
            <th className="adm-th text-left">프로그램 명</th>
            <th className="adm-th">타입</th>
            <th className="adm-th">부서</th>
            <th className="adm-th">교육종료일</th>
            <th className="adm-th">등록된설문</th>
          </tr>
        </thead>
        <tbody>
          {(programs?.length || 0) === 0 ? (
            <tr style={{ height: "240px" }}>
              <td colSpan={6} className="adm-td align-middle text-center text-gray-500">
                등록된 프로그램이 없습니다.
              </td>
            </tr>
          ) : (
            <>
              {programs.map((program) => {
                const isSelected = selectedId === program.eduMngId;
                return (
                  <tr
                    key={program.eduMngId}
                    onClick={() => handleRowClick(program)}
                    aria-selected={isSelected}
                    className={`cursor-pointer border-t border-gray-200 hover:bg-gray-50 text-gray-700 even:bg-gray-50/50 ${isSelected ? "bg-[#E0E7E9] font-semibold" : ""
                      }`}
                    style={{ height: `${rowHeight}px` }}
                  >
                    <td className="adm-td align-middle">{program.eduMngId}</td>
                    <td className="adm-td align-middle text-left">{program.eduNm}</td>
                    <td className="adm-td align-middle">
                      {eduTypeMap[program.eduType] || program.eduType}
                    </td>
                    <td className="adm-td align-middle">{program.subjectName}</td>
                    <td className="adm-td align-middle">
                      {program.eduEndDt ? String(program.eduEndDt).replace("T", " ") : "-"}
                    </td>
                    <td className="adm-td align-middle">{program.totalSurvey}</td>
                  </tr>
                );
              })}

              {/* 빈 행으로 240px 높이 유지 */}
              {Array.from({ length: placeholders }).map((_, idx) => (
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