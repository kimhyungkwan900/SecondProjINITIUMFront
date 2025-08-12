import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAssessmentList } from "../../../api/user/coreCompetency/UserAssessmentApi";
import { UserContext } from "../../../App";

const CoreCompetencyAssessmentListTable = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [assessments, setAssessments] = useState([]);

  // 권한 플래그
  const hasStudentNo = user?.loginId ; // 프로젝트 맞게 조정
  const hasEmployeeNo = !!user?.employeeNo;
  const canViewList = !!user && (hasStudentNo || hasEmployeeNo); // 리스트 접근 가능?
  const isStudent  = hasStudentNo && !hasEmployeeNo;
  const isEmployee = hasEmployeeNo;

  // ★ 훅은 최상단에서 호출하고, 내부에서 조건 체크
  useEffect(() => {
    if (!canViewList) return; // 권한 없으면 호출 안 함
    (async () => {
      try {
        const res = await getAllAssessmentList();
        setAssessments(res.data);
      } catch (err) {
        console.error("진단 목록 불러오기 실패:", err);
      }
    })();
  }, [canViewList]);

  // ★ 로그인 안 됐으면: 자동 이동 X, 버튼으로만 이동
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

  // 로그인은 했지만 학번/사번이 없으면 리스트 자체 숨김
  if (!canViewList) {
    return (
      <div className="max-w-[1000px] p-6 border border-gray-200 rounded-md text-center text-sm text-gray-600">
        <p className="mb-2">접근 권한이 없습니다.</p>
        <p className="text-gray-500">학생번호 또는 교직원번호가 필요한 화면입니다.</p>
      </div>
    );
  }

  const formatDateForComparison = (yyyymmdd) => {
    if (!yyyymmdd || yyyymmdd.length !== 8) return "";
    return `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;
  };

  const formatDateForDisplay = (yyyymmdd) => {
    if (!yyyymmdd || yyyymmdd.length !== 8) return "";
    return `${yyyymmdd.slice(0, 4)}.${yyyymmdd.slice(4, 6)}.${yyyymmdd.slice(6, 8)}`;
  };

  const getAssessmentStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(formatDateForComparison(start));
    const endDate = new Date(formatDateForComparison(end));
    endDate.setHours(23, 59, 59, 999);
    if (now < startDate) return "UPCOMING";
    if (now > endDate) return "EXPIRED";
    return "ACTIVE";
  };

  const sortedAssessments = [...assessments].sort((a, b) => {
    const statusPriority = { ACTIVE: 1, UPCOMING: 2, EXPIRED: 3 };
    const aStatus = getAssessmentStatus(a.startDate, a.endDate);
    const bStatus = getAssessmentStatus(b.startDate, b.endDate);
    const statusDiff = statusPriority[aStatus] - statusPriority[bStatus];
    if (statusDiff !== 0) return statusDiff;
    return Number(b.endDate) - Number(a.endDate);
  });

  const handleTest = (id) => {
    navigate(`/competency/coreCompetency/test/${id}`);
  };

  const renderStatusUI = (status, id) => {
    // 학생만 버튼/배지 노출, 아니면 가림
    // 학생: 클릭 가능한 버튼
  if (isStudent) {
    switch (status) {
      case "ACTIVE":
        return (
          <button
            onClick={() => handleTest(id)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-[27px] py-2 rounded shadow-sm transition"
          >
            진단하기
          </button>
        );
      case "UPCOMING":
        return (
          <span className="bg-gray-600 text-white text-sm px-[32px] py-2 rounded inline-block">
            대기 중
          </span>
        );
      default:
        return (
          <span className="bg-gray-400 text-white text-sm px-[25px] py-2 rounded inline-block">
            기간 만료
          </span>
        );
    }
  }

  // 교직원: 텍스트 배지(비클릭)
  if (isEmployee) {
    switch (status) {
      case "ACTIVE":
        return (
          <button
            onClick={() => handleTest(id)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-[25px] py-2 rounded shadow-sm transition"
          >
            진단진행중
          </button>
        );
      case "UPCOMING":
        return (
          <span className="bg-gray-600 text-white text-sm px-[39px] py-2 rounded inline-block">
            대기중
          </span>
        );
      default:
        return (
          <span className="bg-gray-400 text-white text-sm px-[32px] py-2 rounded inline-block">
            기간만료
          </span>
        );
    }
  }
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
                const status = getAssessmentStatus(a.startDate, a.endDate);
                return (
                  <tr key={a.id} className="border-t hover:bg-blue-50">
                    <td className="px-4 py-2 border">{sortedAssessments.length - idx}</td>
                    <td className="px-4 py-2 border">{a.assessmentName}</td>
                    <td className="px-4 py-2 border">
                      {formatDateForDisplay(a.startDate)} ~ {formatDateForDisplay(a.endDate)}
                    </td>
                    <td className="px-4 py-2 border">{renderStatusUI(status, a.id)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500 text-sm">
                  현재 등록된 진단 목록이 없습니다.
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
