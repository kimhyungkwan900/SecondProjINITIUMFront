
const SurveyList = ({ surveyData }) => {
    const satisfactionMap = {
    1: "매우 불만족",
    2: "불만족",
    3: "보통",
    4: "만족",
    5: "매우 만족",
  };

  if (!surveyData || surveyData.length === 0) {
    return (
       <div className="overflow-x-auto mt-4 bg-white p-4 rounded border">
        <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-center">
            <tr>
                <th className="border p-2">만족도</th>
                <th className="border p-2">학번</th>
                <th className="border p-2">이름</th>
                <th className="border p-2">응답내용</th>
            </tr>
            </thead>
            <tbody>
                <tr className="text-center border">
                    <td className="border py-4" colSpan={4}>선택된 프로그램에 등록된 설문이 없습니다.</td>
                </tr>
            </tbody>
        </table>
        </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-4 bg-white p-4 rounded border">
      <table className="w-full table-auto border-collapse border">
        <thead className="bg-gray-100 text-center">
          <tr>
            <th className="border p-2">만족도</th>
            <th className="border p-2">학번</th>
            <th className="border p-2">이름</th>
            <th className="border p-2">응답내용</th>
          </tr>
        </thead>
        <tbody>
          {surveyData.map((item) => (
            <tr key={item.studentNo} className="text-center border-t">
              <td className="border p-2">{satisfactionMap[item.srvyDgstfnScr] || item.srvyDgstfnScr}</td>
              <td className="border p-2">{item.studentNo}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2 text-left">{item.surveyResponseContent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurveyList;