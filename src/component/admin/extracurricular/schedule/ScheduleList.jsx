const ScheduleList = ({ scheduleList, onSelectSchedule }) => {
  if (!scheduleList || scheduleList.length === 0) {
    return <div className="adm-card mt-4 overflow-auto">
            <table className="min-w-full border-collapse">
                <thead>
                <tr>
                    <th className="adm-th">일정 ID</th>
                    <th className="adm-th">프로그램 ID</th>
                    <th className="adm-th">일정 날짜 시간</th>
                    <th className="adm-th">종료 시간</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="adm-td text-center text-gray-500" colSpan={4}>
                        등록된 일정이 없습니다.
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
  }

  return (
    <div className="adm-card mt-4 overflow-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="adm-th">일정 ID</th>
            <th className="adm-th">프로그램 ID</th>
            <th className="adm-th">일정 날짜 시간</th>
            <th className="adm-th">종료 시간</th>
          </tr>
        </thead>
        <tbody>
          {scheduleList.map((schedule) => (
            <tr
              key={schedule.eduShdlId}
              onClick={() => onSelectSchedule(schedule.eduShdlId)}
              className="cursor-pointer adm-row"
            >
              <td className="adm-td">{schedule.eduShdlId}</td>
              <td className="adm-td">{schedule.eduMngId}</td>
              <td className="adm-td">
                  {schedule.eduDt?.replace("T", " ") || "-"}
              </td>
              <td className="adm-td">{schedule.eduEndTm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleList;