import { useEffect, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAssessmentList } from "../../../api/user/coreCompetency/UserAssessmentApi";
import { checkDuplicate } from "../../../api/admin/coreCompetency/AdminAssessmentApi";
import { UserContext } from "../../../App";

const CoreCompetencyAssessmentListTable = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [assessments, setAssessments] = useState([]);
  const [attemptedById, setAttemptedById] = useState({}); // { [id]: true/false }
  const [attemptLoading, setAttemptLoading] = useState(false);

  const hasStudentNo = !!user?.loginId;
  const hasEmployeeNo = !!user?.employeeNo;
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

  // 날짜/상태 유틸
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

  // 학생일 때만, ACTIVE 항목에 대해 선조회(이미 응시 여부)
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
          .then(() => ({ id, attempted: false })) // 204 OK → 응시 가능
          .catch(err => {
            const already = err?.response?.status === 409; // 409 → 이미 응시
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
            if (id) map[Number(id)] = false; // 실패 시 보수적으로 응시 가능 처리
          }
        });
        setAttemptedById(map);
      })
      .finally(() => setAttemptLoading(false));
  }, [isStudent, sortedAssessments, user?.studentNo]);

  // 진단 시작(미응시인 경우만)
  const handleTest = async (id) => {
    if (!isStudent) {
      navigate(`/competency/coreCompetency/test/${id}`);
      return;
    }
    try {
      await checkDuplicate(id, user.studentNo); // 204면 통과
      navigate(`/competency/coreCompetency/test/${id}`);
    } catch (err) {
      if (err?.response?.status === 409) {
        // 이미 응시 → 결과보기로
        navigate(`/competency/coreCompetency/result`);
      } else {
        alert("진단 시작 확인에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
  };

  // 결과 보기(이미 응시 시)
  const handleResult = (/* id */) => {
    // 요구사항: 특정 평가 id 전달 없이 공통 결과 페이지로 이동
    navigate(`/competency/coreCompetency/result`);
  };

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

  if (!canViewList) {
    return (
      <div className="max-w-[1000px] p-6 border border-gray-200 rounded-md text-center text-sm text-gray-600">
        <p className="mb-2">접근 권한이 없습니다.</p>
      </div>
    );
  }

  const renderStatusUI = (status, id) => {
    if (isStudent) {
      const attempted = !!attemptedById[id];

      // ✅ 이미 응시했다면 어떤 상태든 결과보기 버튼
      if (attempted) {
        return (
          <button
            onClick={() => handleResult(id)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm px-[27px] py-2 rounded shadow-sm transition"
          >
            응시완료
          </button>
        );
      }

      // 미응시일 때만 상태별로
      switch (status) {
        case "ACTIVE":
          return (
            <button
              onClick={() => handleTest(id)}
              disabled={attemptLoading}
              className={`text-sm px-[27px] py-2 rounded shadow-sm transition ${
                attemptLoading ? "bg-gray-300 text-gray-600" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              title={attemptLoading ? "확인 중..." : undefined}
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

    // 교직원은 기존 로직 유지
    if (isEmployee) {
      switch (status) {
        case "ACTIVE":
          return (
            <button
              onClick={() => navigate(`/competency/coreCompetency/test/${id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-[25px] py-2 rounded shadow-sm transition"
            >
              진단진행중
            </button>
          );
        case "UPCOMING":
          return <span className="bg-gray-600 text-white text-sm px-[39px] py-2 rounded inline-block">대기중</span>;
        default:
          return <span className="bg-gray-400 text-white text-sm px-[32px] py-2 rounded inline-block">기간만료</span>;
      }
    }
    return null;
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
