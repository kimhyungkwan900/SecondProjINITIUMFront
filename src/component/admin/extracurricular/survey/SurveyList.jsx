
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
       <div className="adm-card overflow-x-auto mt-4">
        <table className="w-full table-auto border-collapse">
            <thead className="text-center">
            <tr>
                <th className="adm-th">만족도</th>
                <th className="adm-th">학번</th>
                <th className="adm-th">이름</th>
                <th className="adm-th">응답내용</th>
            </tr>
            </thead>
            <tbody>
                <tr className="text-center border">
                    <td className="adm-td py-4 text-gray-500" colSpan={4}>선택된 프로그램에 등록된 설문이 없습니다.</td>
                </tr>
            </tbody>
        </table>
        </div>
    );
  }

  return (
    <div className="adm-card overflow-x-auto mt-4">
      <table className="w-full table-auto border-collapse">
        <thead className="text-center">
          <tr>
            <th className="adm-th">만족도</th>
            <th className="adm-th">학번</th>
            <th className="adm-th">이름</th>
            <th className="adm-th">응답내용</th>
          </tr>
        </thead>
        <tbody>
          {surveyData.map((item) => (
            <tr key={item.studentNo} className="adm-row">
              <td className="adm-td">{satisfactionMap[item.srvyDgstfnScr] || item.srvyDgstfnScr}</td>
              <td className="adm-td">{item.studentNo}</td>
              <td className="adm-td">{item.name}</td>
              <td className="adm-td text-left">{item.surveyResponseContent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SurveyList;