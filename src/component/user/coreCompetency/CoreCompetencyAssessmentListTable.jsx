import { useNavigate } from "react-router-dom";

const CoreCompetencyAssessmentListTable = ({ isLoggedIn, assessments }) => {
  const navigate = useNavigate();

  // 현재 날짜가 진단 기간에 포함되는지 판단
  const isActive = (start, end) => {
    const now = new Date();
    return new Date(start) <= now && now <= new Date(end);
  };

  // 진단 시작 페이지로 이동
  const handleTest = (id) => {
    navigate(`/competency/coreCompetency/test/${id}`);
  };

  //로그인 페이지로 이동
  const handlePage = () =>{
    navigate('/login');
  }

  return (
    <div className="p-4">
      {isLoggedIn ? (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">번호</th>
              <th className="border px-4 py-2">진단명</th>
              <th className="border px-4 py-2">진단기간</th>
              <th className="border px-4 py-2">진단하기</th>
            </tr>
          </thead>
          <tbody>
            {assessments.length > 0 ? (
              assessments.map((a, idx) => {
                const active = isActive(a.startDate, a.endDate);
                return (
                  <tr key={a.id} className="text-center">
                    <td className="border px-4 py-2">{assessments.length - idx}</td>
                    <td className="border px-4 py-2">{a.assessmentName}</td>
                    <td className="border px-4 py-2">
                      {a.startDate} ~ {a.endDate}
                    </td>
                    <td className="border px-4 py-2">
                      {active ? (
                        <button
                          onClick={() => handleTest(a.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          진단하기
                        </button>
                      ) : (
                        <span className="bg-gray-400 text-white px-3 py-1 rounded">
                          기간 만료
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  현재 진행 중인 진단 목록이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <div>
            <div className="text-center text-gray-600 p-6">
            로그인이 필요한 기능입니다.
            </div>
            <button onClick={handlePage}>로그인 하러가기</button>
        </div>
        
      )}
    </div>
  );
};

export default CoreCompetencyAssessmentListTable;
