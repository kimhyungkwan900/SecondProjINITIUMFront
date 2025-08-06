import { useNavigate } from "react-router-dom";

const CoreCompetencyAssessmentListTable = ({ isLoggedIn, assessments }) => {
  const navigate = useNavigate();

  const isActive = (start, end) => {
    const now = new Date();
    return new Date(start) <= now && now <= new Date(end);
  };

  const handleTest = (id) => {
    navigate(`/competency/coreCompetency/test/${id}`);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="px-6 py-8">
      {isLoggedIn ? (
        <div className="overflow-x-auto shadow rounded-md border border-gray-300">
          <table className="w-full text-sm text-center">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 border">번호</th>
                <th className="px-4 py-3 border">진단명</th>
                <th className="px-4 py-3 border">진단기간</th>
                <th className="px-4 py-3 border">진단하기</th>
              </tr>
            </thead>
            <tbody>
              {assessments.length > 0 ? (
                assessments.map((a, idx) => {
                  const active = isActive(a.startDate, a.endDate);
                  return (
                    <tr key={a.id} className="border-t hover:bg-blue-50">
                      <td className="px-4 py-2 border">{assessments.length - idx}</td>
                      <td className="px-4 py-2 border">{a.assessmentName}</td>
                      <td className="px-4 py-2 border">
                        {a.startDate} ~ {a.endDate}
                      </td>
                      <td className="px-4 py-2 border">
                        {active ? (
                          <button
                            onClick={() => handleTest(a.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded shadow-sm transition"
                          >
                            진단하기
                          </button>
                        ) : (
                          <span className="bg-gray-400 text-white text-sm px-4 py-1.5 rounded inline-block">
                            기간 만료
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500 text-sm">
                    현재 진행 중인 진단 목록이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4 text-[20px]">로그인이 필요한 기능입니다.</p>
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow-sm transition text-[20px]"
          >
            로그인 하러가기
          </button>
        </div>
      )}
    </div>
  );
};

export default CoreCompetencyAssessmentListTable;
