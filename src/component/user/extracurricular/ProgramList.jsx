const ProgramList = ({ programs, loading }) => {
  if (loading) {
    return (
      <div className="text-center text-gray-400 py-8">
        로딩중...
      </div>
    );
  }

  if (!programs || programs.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        조회된 프로그램이 없습니다.
      </div>
    );
  } 

  const now = new Date();

  return (
    <div className="overflow-x-auto rounded-lg shadow-sm bg-white mt-4">
      <table className="w-full table-auto text-sm">
        <thead className="bg-gray-50 text-gray-700 font-semibold border-b">
          <tr>
            <th className="px-3 py-2 border-b border-gray-200 text-center">프로그램 이름</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">분류</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">수료 조건</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">교육 마지막일</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">수료 여부</th>
            <th className="px-3 py-2 border-b border-gray-200 text-center">설문 여부</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => {
            const eduEndDate = new Date(program.eduEndYmd);
            const showSurveyButton = (program.surveyYn === false && now >= eduEndDate);

            return (
                console.log(program),
              <tr key={program.eduMngId} className="hover:bg-gray-100 cursor-pointer">
                <td className="px-3 py-2 border-b border-gray-200 text-center">{program.eduNm}</td>
                <td className="px-3 py-2 border-b border-gray-200 text-center">{program.ctgryNm}</td>
                <td className="px-3 py-2 border-b border-gray-200 text-center">{program.cndCn} 이상</td>
                <td className="px-3 py-2 border-b border-gray-200 text-center">{program.eduEndYmd}</td>
                <td className="px-3 py-2 border-b border-gray-200 text-center">
                  {program.eduFnshYn === "Y" ? "수료" : "미수료"}
                </td>
                <td className="px-3 py-2 border-b border-gray-200 text-center">
                  {showSurveyButton ? <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">등록</button> : <>미등록</>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProgramList;