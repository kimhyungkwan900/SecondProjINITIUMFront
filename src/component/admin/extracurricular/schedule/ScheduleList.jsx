const ScheduleList = ({ scheduleList, onSelectSchedule }) => {
  if (!scheduleList || scheduleList.length === 0) {
    return <div className="mt-4 overflow-auto ">
            <table className="min-w-full border-collapse border border-gray-300 bg-white">
                <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">일정 ID</th>
                    <th className="border border-gray-300 px-4 py-2">프로그램 ID</th>
                    <th className="border border-gray-300 px-4 py-2">일정 날짜 시간</th>
                    <th className="border border-gray-300 px-4 py-2">종료 시간</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2 text-center" colSpan={4}>
                        등록된 일정이 없습니다.
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
  }

  return (
    <div className="mt-4 overflow-auto ">
      <table className="min-w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">일정 ID</th>
            <th className="border border-gray-300 px-4 py-2">프로그램 ID</th>
            <th className="border border-gray-300 px-4 py-2">일정 날짜 시간</th>
            <th className="border border-gray-300 px-4 py-2">종료 시간</th>
          </tr>
        </thead>
        <tbody>
          {scheduleList.map((schedule) => (
            <tr
              key={schedule.eduShdlId}
              onClick={() => onSelectSchedule(schedule.eduShdlId)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border border-gray-300 px-4 py-2">{schedule.eduShdlId}</td>
              <td className="border border-gray-300 px-4 py-2">{schedule.eduMngId}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(schedule.eduDt).toLocaleString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{schedule.eduEndTm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleList;