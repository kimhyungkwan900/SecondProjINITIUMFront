

const Schedule = ({ extracurricularSchedules = []}) => {
  if (!extracurricularSchedules.length) {
    return <div className="text-gray-500">등록된 일정이 없습니다.</div>;
  }

  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return "";
    return dateTimeString.split("T")[0];
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4 text-center">📅 프로그램 일정</h2>

      <table className="w-full text-center border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">날짜</th>
            <th className="border px-4 py-2">시작 시간</th>
            <th className="border px-4 py-2">종료 시간</th>
          </tr>
        </thead>

        <tbody>
          {extracurricularSchedules.map((schedule) => (
            <tr key={schedule.eduShdlId} className="bg-white hover:bg-gray-50">
              <td className="border px-4 py-2">
                {formatDate(schedule.eduDt)}
              </td>
              <td className="border px-4 py-2">
                {schedule.eduDt.split("T")[1]}
              </td>
              <td className="border px-4 py-2">
                {schedule.eduEndTm}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;