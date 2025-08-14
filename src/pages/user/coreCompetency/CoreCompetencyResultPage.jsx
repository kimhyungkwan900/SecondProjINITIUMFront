import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import CoreCompetencySideBar from "../../../features/user/UserSideBar";
import CoreCompetencyDiagnosisTabButtons from "../../../component/user/coreCompetency/CoreCompetencyDiagnosisTabButtons";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import { UserContext } from "../../../App";
import CoreCompetencyResultList from "../../../component/user/coreCompetency/result/CoreCompetencyResultList";


const CoreCompetencyResultPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const navItems = [
    "핵심역량안내",
    { link: "/competency/notice", name: "핵심역량안내" },
    { link: "/competency/coreCompetency", name: "핵심역량진단" },
  ];

  // 권한 플래그 (리스트/결과 열람: 학생번호 or 교직원번호 보유자)
  const hasStudentNo = user?.loginId;
  const hasEmployeeNo = !!user?.empNo;
  const canViewPage = !!user && (hasStudentNo || hasEmployeeNo);

  return (
    <div className="bg-white min-h-screen">
      <UserTopBar />
      <MainHeader />

      {/* 상단 회색 영역 */}
      <div className="bg-gray-100 border-b border-gray-300">
        <div className="w-[1200px] mx-auto px-6 py-8">
          <div className="flex justify-between items-end">
            <h1 className="ml-42 text-4xl font-semibold">핵심역량진단</h1>
            <div className="text-base text-gray-600 text-right">
              HOME &gt; 핵심역량진단 &gt; 진단결과
            </div>
          </div>
        </div>
      </div>

      {/* 본문 영역 (사이드바 + 탭 + 내용) */}
      <div className="flex px-12 py-10 gap-10">
        {/* 좌측 사이드바 */}
        <CoreCompetencySideBar navItems={navItems} />

        {/* 우측 본문 */}
        <div className="flex-1">
          {/* 탭 버튼 영역 (공통) */}
          <CoreCompetencyDiagnosisTabButtons />

          {/* ===== 권한 분기 ===== */}
          {/* 1) 로그인 X: 버튼으로 로그인 이동 */}
          {!user && (
            <div className="mt-10 max-w-[1000px] p-6 border rounded-md text-center text-sm text-gray-700">
              <p className="mb-3">이 화면은 로그인한 사용자만 볼 수 있습니다.</p>
              <button
                onClick={() => navigate("/login", { replace: true })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                로그인 하러가기
              </button>
            </div>
          )}

          {/* 2) 로그인은 했지만 학번/사번 없음: 접근 불가 메시지 */}
          {user && !canViewPage && (
            <div className="mt-10 max-w-[1000px] p-6 border border-gray-200 rounded-md text-center text-sm text-gray-600">
              <p className="mb-2">접근 권한이 없습니다.</p>
              <p className="text-gray-500">
                학생번호 또는 교직원번호가 필요한 화면입니다.
              </p>
            </div>
          )}

          {/* 3) 정상 접근: 결과 영역 렌더 */}
          {canViewPage && (
            <div className="mt-10 text-center text-gray-700">
              <CoreCompetencyResultList/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoreCompetencyResultPage;
