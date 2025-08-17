import { useState, useMemo } from "react";

const ScheduleList = ({ 
  scheduleList = [], 
  onSelectSchedule 
}) => {
  // 한 화면 높이 유지: 5행 기준 총 240px
  const ROWS_PER_PAGE = 5;
  const rowHeight = 240 / ROWS_PER_PAGE;

  const [selectedId, setSelectedId] = useState(null);

  const placeholders = useMemo(
    () => Math.max(0, ROWS_PER_PAGE - (scheduleList?.length || 0)),
    [scheduleList]
  );

  const handleRowClick = (schedule) => {
    setSelectedId(schedule.eduShdlId);
    onSelectSchedule?.(schedule.eduShdlId);
  };

  return (
    <div className="adm-card overflow-x-auto mt-6 p-0">
      <table className="w-full table-fixed border-collapse">
        {/* 고정 폭 지정 */}
        <colgroup>
          <col className="w-[15%]" />
          <col className="w-[15%]" />
          <col className="w-[35%]" />
          <col className="w-[35%]" />
        </colgroup>

        <thead className="text-center">
          <tr>
            <th className="adm-th">일정 ID</th>
            <th className="adm-th">프로그램 ID</th>
            <th className="adm-th">일정 날짜 시간</th>
            <th className="adm-th">종료 시간</th>
          </tr>
        </thead>

        <tbody>
          {(scheduleList?.length || 0) === 0 ? (
            <tr style={{ height: "240px" }}>
              <td colSpan={4} className="adm-td align-middle text-center text-gray-500">
                등록된 일정이 없습니다.
              </td>
            </tr>
          ) : (
            <>
              {scheduleList.map((schedule) => {
                const isSelected = selectedId === schedule.eduShdlId;
                return (
                  <tr
                    key={schedule.eduShdlId}
                    onClick={() => handleRowClick(schedule)}
                    aria-selected={isSelected}
                    className={`cursor-pointer border-t border-gray-200 hover:bg-gray-50 text-gray-700 even:bg-gray-50/50 ${isSelected ? "bg-[#E0E7E9] font-semibold" : ""
                      }`}
                    style={{ height: `${rowHeight}px` }}
                  >
                    <td className="adm-td align-middle">{schedule.eduShdlId}</td>
                    <td className="adm-td align-middle">{schedule.eduMngId}</td>
                    <td className="adm-td align-middle">
                      {schedule.eduDt ? String(schedule.eduDt).replace("T", " ") : "-"}
                    </td>
                    <td className="adm-td align-middle">{schedule.eduEndTm}</td>
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
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleList;