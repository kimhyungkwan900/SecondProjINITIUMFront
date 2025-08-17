import { useNavigate } from "react-router-dom";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import CoreCompetencySideBar from "../../../features/user/UserSideBar";
import CoreCompetencyDiagnosisTabButtons from "../../../component/user/coreCompetency/CoreCompetencyDiagnosisTabButtons";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import { useAuth } from "../../../hooks/useAuth.jsx";
import CoreCompetencyResultList from "../../../component/user/coreCompetency/result/CoreCompetencyResultList";

const CoreCompetencyResultPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    "핵심역량안내",
    { link: "/competency/notice", name: "핵심역량안내" },
    { link: "/competency/coreCompetency", name: "핵심역량진단" },
  ];

  // 권한 플래그 (리스트/결과 열람: 학생번호 or 교직원번호 보유자)
  const hasStudentNo = !!user?.loginId;
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

      {/* 본문: 사이드바/본문 형제 그리드 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px,1fr]">
          {/* 좌측 사이드바 */}
          <aside className="lg:sticky lg:top-20 self-start">
            <CoreCompetencySideBar navItems={navItems} />
          </aside>

          {/* 우측 본문 */}
          <section className="min-w-0">
            {/* 탭 버튼 */}
            <div className="mb-6">
              <CoreCompetencyDiagnosisTabButtons />
            </div>

            {/* 권한 분기 */}
            {!user && (
              <div className="mt-4 w-full rounded-xl border border-gray-200 bg-white p-8 shadow-sm
                              flex flex-col items-center text-center">
                <p className="mb-4 text-sm text-gray-700">
                  이 화면은 로그인한 사용자만 볼 수 있습니다.
                </p>
                <button
                  onClick={() => navigate("/login", { replace: true })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  로그인 하러가기
                </button>
              </div>
            )}

            {user && !canViewPage && (
              <div className="mt-4 w-full rounded-xl border border-gray-200 bg-white p-8 shadow-sm
                              flex flex-col items-center text-center">
                <p className="mb-2 text-sm text-gray-700">접근 권한이 없습니다.</p>
                <p className="text-sm text-gray-500">
                  학생번호 또는 교직원번호가 필요한 화면입니다.
                </p>
              </div>
            )}

            {canViewPage && (
              <div className="mt-2">
                <CoreCompetencyResultList />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CoreCompetencyResultPage;
