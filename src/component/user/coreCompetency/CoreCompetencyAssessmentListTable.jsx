import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAssessmentList } from "../../../api/user/coreCompetency/UserAssessmentApi";

const CoreCompetencyAssessmentListTable = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]); // 진단 평가 목록 상태 변수

  // 1. 컴포넌트 마운트 시 진단 목록 데이터를 불러옴
  useEffect(() => {
    const getAllAssessment = async () => {
      try {
        const res = await getAllAssessmentList(); // API 호출
        setAssessments(res.data); // 상태에 저장
      } catch (err) {
        console.error("진단 목록 불러오기 실패:", err);
      }
    };
    getAllAssessment();
  }, []);

  // 2. 날짜 포맷 함수 (비교용: yyyy-mm-dd 형식)
  const formatDateForComparison = (yyyymmdd) => {
    if (!yyyymmdd || yyyymmdd.length !== 8) return "";
    return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
  };

  // 3. 날짜 포맷 함수 (화면 표시용: yyyy.mm.dd 형식)
  const formatDateForDisplay = (yyyymmdd) => {
    if (!yyyymmdd || yyyymmdd.length !== 8) return "";
    return `${yyyymmdd.slice(0, 4)}.${yyyymmdd.slice(4, 6)}.${yyyymmdd.slice(6, 8)}`;
  };

  // 4. 현재 날짜가 진단 기간(start ~ end) 사이에 있는지 여부 반환
  const isActive = (start, end) => {
    const now = new Date();
    const startDate = new Date(formatDateForComparison(start));
    const endDate = new Date(formatDateForComparison(end));
    return startDate <= now && now <= endDate;
  };

  // 5. 진단 가능 여부 및 종료일 기준으로 정렬
  const sortedAssessments = [...assessments].sort((a, b) => {
    const aActive = isActive(a.startDate, a.endDate);
    const bActive = isActive(b.startDate, b.endDate);

    //두 항목의 진단 가능 여부가 다를 경우( ex ) a-진단가능, b-기간만료)
    if (aActive !== bActive) {
      return aActive ? -1 : 1; // 진단 가능한 항목이 먼저 오도록 정렬
    }

    // 둘 다 같은 상태(가능/불가)라면, 종료일 기준으로 내림차순 정렬
    return Number(b.endDate) - Number(a.endDate);
  });

  // 6. 진단하기 버튼 클릭 시 해당 진단 페이지로 이동
  const handleTest = (id) => {
    navigate(`/competency/coreCompetency/test/${id}`);
  };

  return (
    <div className="">
      <div className="table-fixed max-w-[1000px] shadow rounded-md border border-gray-300">
        <table className="table-fixed min-w-[1000px] text-sm text-center">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3 border">번호</th>
              <th className="px-4 py-3 border">진단명</th>
              <th className="px-4 py-3 border">진단기간</th>
              <th className="px-4 py-3 border">진단하기</th>
            </tr>
          </thead>
          <tbody>
            {sortedAssessments.length > 0 ? (
              sortedAssessments.map((a, idx) => {
                const active = isActive(a.startDate, a.endDate);
                return (
                  <tr key={a.id} className="border-t hover:bg-blue-50">
                    {/* 진단번호는 최신 항목이 위로 오도록 계산 */}
                    <td className="px-4 py-2 border">{assessments.length - idx}</td>
                    <td className="px-4 py-2 border">{a.assessmentName}</td>
                    <td className="px-4 py-2 border">
                      {formatDateForDisplay(a.startDate)} ~ {formatDateForDisplay(a.endDate)}
                    </td>
                    <td className="px-4 py-2 border">
                      {active ? (
                        // 진단 가능 시 버튼 표시
                        <button
                          onClick={() => handleTest(a.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded shadow-sm transition"
                        >
                          진단하기
                        </button>
                      ) : (
                        // 진단 불가(기간 만료) 시 회색 표시
                        <span className="bg-gray-400 text-white text-sm px-4 py-1.5 rounded inline-block">
                          기간 만료
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              // 진단 항목이 없을 경우
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
