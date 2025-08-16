import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAssessmentList } from "../../../api/user/coreCompetency/UserAssessmentApi";
import { checkDuplicate } from "../../../api/admin/coreCompetency/AdminAssessmentApi";
import { useAuth } from "../../../hooks/useAuth.jsx";

const CoreCompetencyAssessmentListTable = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [assessments, setAssessments] = useState([]);
  const [attemptedById, setAttemptedById] = useState({});
  const [attemptLoading, setAttemptLoading] = useState(false);

  const hasStudentNo = !!user?.loginId;
  const hasEmployeeNo = !!user?.empNo;
  const canViewList = !!user && (hasStudentNo || hasEmployeeNo);
  const isStudent  = hasStudentNo && !hasEmployeeNo;
  const isEmployee = hasEmployeeNo;

  useEffect(() => {
    if (!canViewList) return;
    (async () => {
      try {
        const res = await getAllAssessmentList();
        setAssessments(res.data || []);
      } catch (err) {
        console.error("진단 목록 불러오기 실패:", err);
      }
    })();
  }, [canViewList]);

  const formatDateForComparison = (yyyymmdd) =>
    !yyyymmdd || yyyymmdd.length !== 8
      ? ""
      : `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;

  const formatDateForDisplay = (yyyymmdd) =>
    !yyyymmdd || yyyymmdd.length !== 8
      ? ""
      : `${yyyymmdd.slice(0, 4)}.${yyyymmdd.slice(4, 6)}.${yyyymmdd.slice(6, 8)}`;

  const getAssessmentStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(formatDateForComparison(start));
    const endDate = new Date(formatDateForComparison(end));
    endDate.setHours(23, 59, 59, 999);
    if (now < startDate) return "UPCOMING";
    if (now > endDate) return "EXPIRED";
    return "ACTIVE";
  };

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

  useEffect(() => {
    if (!isStudent || sortedAssessments.length === 0) {
      setAttemptedById({});
      return;
    }
    const studentNo = user.loginId;
    const toCheck = sortedAssessments
      .filter(a => getAssessmentStatus(a.startDate, a.endDate) === "ACTIVE")
      .map(a => a.id);

    if (toCheck.length === 0) {
      setAttemptedById({});
      return;
    }

    setAttemptLoading(true);
    Promise.allSettled(
      toCheck.map(id =>
        checkDuplicate(id, studentNo)
          .then(() => ({ id, attempted: false }))
          .catch(err => {
            const already = err?.response?.status === 409;
            return { id, attempted: !!already };
          })
      )
    )
      .then(results => {
        const map = {};
        results.forEach(r => {
          if (r.status === "fulfilled") map[r.value.id] = r.value.attempted;
          else if (r.status === "rejected") {
            const id = r.reason?.config?.url?.match(/\/check\/(\d+)\//)?.[1];
            if (id) map[Number(id)] = false;
          }
        });
        setAttemptedById(map);
      })
      .finally(() => setAttemptLoading(false));
  }, [isStudent, sortedAssessments, user?.loginId]);

  const handleTest = async (id) => {
    if (!isStudent) {
      navigate(`/competency/coreCompetency/test/${id}`);
      return;
    }
    try {
      await checkDuplicate(id, user.loginId);
      navigate(`/competency/coreCompetency/test/${id}`);
    } catch (err) {
      if (err?.response?.status === 409) {
        navigate(`/competency/coreCompetency/result`);
      } else {
        alert("진단 시작 확인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  const handleResult = () => navigate(`/competency/coreCompetency/result`);

  if (!user) {
    return (
      <div className="mt-6 max-w-3xl p-6 border rounded-md text-center text-sm text-gray-700">
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
  if (!canViewList) {
    return (
      <div className="mt-6 max-w-3xl p-6 border border-gray-200 rounded-md text-center text-sm text-gray-600">
        <p className="mb-2">접근 권한이 없습니다.</p>
      </div>
    );
  }

  const renderStatusUI = (status, id) => {
    if (isStudent) {
      const attempted = !!attemptedById[id];
      if (attempted) {
        return (
          <button
            onClick={handleResult}
            className="bg-green-600 hover:bg-emerald-700 text-white text-sm px-[35px] py-2 rounded shadow-sm transition"
          >
            응시완료
          </button>
        );
      }
      switch (status) {
        case "ACTIVE":
          return (
            <button
              onClick={() => handleTest(id)}
              disabled={attemptLoading}
              className={`text-sm px-[35px] py-2 rounded shadow-sm transition ${
                attemptLoading ? "bg-gray-300 text-gray-600" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              title={attemptLoading ? "확인 중..." : undefined}
            >
              진단하기
            </button>
          );
        case "UPCOMING":
          return <span className="bg-gray-600 text-white text-sm px-[35px] py-2 rounded inline-block">진단예정</span>;
        default:
          return <span className="bg-gray-400 text-white text-sm px-[35px] py-2 rounded inline-block">기간만료</span>
      }
    }

    if (isEmployee) {
      switch (status) {
        case "ACTIVE":
          return (
            <button
              onClick={() => navigate(`/competency/coreCompetency/test/${id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-[29px] py-2 rounded shadow-sm transition"
            >
              진단진행중
            </button>
          );
        case "UPCOMING":
          return <span className="bg-gray-600 text-white text-sm px-[35px] py-2 rounded inline-block">진단예정</span>;
        default:
          return <span className="bg-gray-400 text-white text-sm px-[35px] py-2 rounded inline-block">기간만료</span>;
      }
    }
    return null;
  };

  return (
    <div className="mt-2">
      {/* 가로 스크롤 허용 + 가변폭 테이블 */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="w-full table-auto text-sm text-center">
          <thead className="bg-gray-50 text-gray-700 font-semibold">
            <tr>
              <th className="px-3 sm:px-4 py-3 border">번호</th>
              <th className="px-3 sm:px-4 py-3 border">진단명</th>
              <th className="px-3 sm:px-4 py-3 border">진단기간</th>
              <th className="px-3 sm:px-4 py-3 border">진단하기</th>
            </tr>
          </thead>
          <tbody>
            {sortedAssessments.length > 0 ? (
              sortedAssessments.map((a, idx) => {
                const status = getAssessmentStatus(a.startDate, a.endDate);
                return (
                  <tr key={a.id} className="border-t hover:bg-blue-50">
                    <td className="px-3 sm:px-4 py-2 border">
                      {sortedAssessments.length - idx}
                    </td>
                    <td className="px-3 sm:px-4 py-2 border">{a.assessmentName}</td>
                    <td className="px-3 sm:px-4 py-2 border">
                      {formatDateForDisplay(a.startDate)} ~ {formatDateForDisplay(a.endDate)}
                    </td>
                    <td className="px-3 sm:px-4 py-2 border">
                      {renderStatusUI(status, a.id)}
                    </td>
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
