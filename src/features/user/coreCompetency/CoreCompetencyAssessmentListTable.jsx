import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAssessmentList } from "../../../api/user/coreCompetency/UserAssessmentApi";

const CoreCompetencyAssessmentListTable = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);

  // 1. 컴포넌트 마운트 시 데이터 불러오기
  useEffect(() => {
    const getAllAssessment = async() =>{
      try{
        const res = await getAllAssessmentList();
        setAssessments(res.data);
      }catch(err){
        console.error("진단 목록 불러오기 실패:", err);
      }
    };
    getAllAssessment();
  }, []);

  // 2. 날짜 포맷 함수
  const formatDateForComparison = (yyyymmdd) => {
    if (!yyyymmdd || yyyymmdd.length !== 8) return "";
    return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
  };

  const formatDateForDisplay = (yyyymmdd) => {
    if (!yyyymmdd || yyyymmdd.length !== 8) return "";
    return `${yyyymmdd.slice(0, 4)}.${yyyymmdd.slice(4, 6)}.${yyyymmdd.slice(6, 8)}`;
  };

  // 3. 현재 날짜 기준 진단 가능 여부 판단
  const isActive = (start, end) => {
    const now = new Date();
    const startDate = new Date(formatDateForComparison(start));
    const endDate = new Date(formatDateForComparison(end));
    return startDate <= now && now <= endDate;
  };

  // 4. 진단 페이지로 이동
  const handleTest = (id) => {
    navigate(`/competency/coreCompetency/test/${id}`);
  };

  // 5. 테이블 렌더링
  return (
    <div className="px-6 py-8">
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
                      {formatDateForDisplay(a.startDate)} ~ {formatDateForDisplay(a.endDate)}
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
    </div>
  );
};

export default CoreCompetencyAssessmentListTable;
