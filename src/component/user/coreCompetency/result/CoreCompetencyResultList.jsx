import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../App";
import { getMyRespondedAssessmentDetails } from "../../../../api/user/coreCompetency/UserAssessmentApi";

const CoreCompetencyResultList = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(false);

  // 권한 플래그
  const studentNo = user?.loginId;
  const hasEmployeeNo = !!user?.empNo;
  const canViewList = !!user && (studentNo || hasEmployeeNo);
  const isStudent = !!studentNo && !hasEmployeeNo;

  // 데이터 로드 훅 (항상 호출)
  useEffect(() => {
    if (!canViewList || !isStudent) return;
    (async () => {
      try {
        setLoading(true);
        const res = await getMyRespondedAssessmentDetails(studentNo);
        setAssessments(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        console.error("응답한 진단 목록 불러오기 실패:", err);
        setAssessments([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [canViewList, isStudent, studentNo]);

  // 유틸 함수
  const formatDateForComparison = (yyyymmdd) => {
    if (!yyyymmdd || String(yyyymmdd).length !== 8) return "";
    const s = String(yyyymmdd);
    return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
  };
  const formatDateForDisplay = (yyyymmdd) => {
    if (!yyyymmdd || String(yyyymmdd).length !== 8) return "";
    const s = String(yyyymmdd);
    return `${s.slice(0, 4)}.${s.slice(4, 6)}.${s.slice(6, 8)}`;
  };
  const getAssessmentStatus = (start, end) => {
    const endDate = new Date(formatDateForComparison(end));
    endDate.setHours(23, 59, 59, 999);
    return "ACTIVE";
  };

  // 정렬 훅
  const sortedAssessments = useMemo(() => {
    const statusPriority = { ACTIVE: 1, UPCOMING: 2, EXPIRED: 3 };
    return [...assessments].sort((a, b) => {
      const aStatus = getAssessmentStatus(a.startDate, a.endDate);
      const bStatus = getAssessmentStatus(b.startDate, b.endDate);
      const statusDiff = statusPriority[aStatus] - statusPriority[bStatus];
      if (statusDiff !== 0) return statusDiff;
      return Number(b.endDate) - Number(a.endDate);
    });
  }, [assessments]);

  console.table(
  sortedAssessments.map(a => ({
    no: a.id,
    assessmentNo : a.assessmentNo,
    name: a.assessmentName,
    start: a.startDate,
    end: a.endDate,
    status: getAssessmentStatus(a.startDate, a.endDate),
  }))
);

  // 여기서부터 조건부 렌더링(훅 없음)
  if (!user) {
    return (
      <div className="max-w-[1000px] mt-10 p-6 border rounded-md text-center text-sm text-gray-700">
        <p className="mb-3">이 화면은 로그인한 사용자만 볼 수 있습니다.</p>
        <button
          onClick={() => navigate("/login", { replace: true })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          로그인 하러가기
        </button>
      </div>
    );
  }

  if (!canViewList || !isStudent) {
    return (
      <div className="max-w-[1000px] p-6 border border-gray-200 rounded-md text-center text-sm text-gray-600">
        <p className="mb-2">접근 권한이 없습니다.</p>
        <p className="text-gray-500">학생 사용자만 열람할 수 있는 화면입니다.</p>
      </div>
    );
  }

  const goResult = (assessmentNo) => {
    console.log("assessmentNo : ", assessmentNo);
    navigate(`/competency/coreCompetency/result/${studentNo}/${assessmentNo}`);
  };

  const renderAction = (assessmentNo) => {
    if (!isStudent) return null;
    return (
      <button
        onClick={() => goResult(assessmentNo)}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-[27px] py-2 rounded shadow-sm transition disabled:opacity-60"
        disabled={loading}
      >
        결과보기
      </button>
    );
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
              <th className="px-4 py-3 border">결과보기</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500 text-sm">
                  불러오는 중입니다…
                </td>
              </tr>
            ) : sortedAssessments.length > 0 ? (
              sortedAssessments.map((a, idx) => (
                <tr key={a.assessmentNo} className="border-t hover:bg-blue-50">
                  <td className="px-4 py-2 border">{idx + 1}</td>
                  <td className="px-4 py-2 border">{a.assessmentName}</td>
                  <td className="px-4 py-2 border">
                    {formatDateForDisplay(a.startDate)} ~ {formatDateForDisplay(a.endDate)}
                  </td>
                  <td className="px-4 py-2 border">{renderAction(a.assessmentNo)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500 text-sm">
                  현재 등록된 진단 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoreCompetencyResultList;
