import MainHeader from "../../../features/user/mainpage/MainHeader";
import CoreCompetencySideBar from "../../../features/user/UserSideBar";
import CoreCompetencyDiagnosisTabButtons from "../../../component/user/coreCompetency/CoreCompetencyDiagnosisTabButtons";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";

const CoreCompetencyAssessmentPage = () => {
  // 문자열 항목 제거(사이드바 렌더 오류 예방)
  const navItems = [
    "핵심역량안내",
    { link: "/competency/notice", name: "핵심역량안내" },
    { link: "/competency/coreCompetency", name: "핵심역량진단" },
  ];

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
              HOME &gt; 핵심역량진단
            </div>
          </div>
        </div>
      </div>

      {/* 본문: 사이드바와 본문을 '형제'로 배치, 고정폭 제거 */}
      <main className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-8 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px,1fr]">
          {/* 좌측 사이드바 */}
          <aside className="lg:sticky lg:top-20 self-start">
            <CoreCompetencySideBar navItems={navItems} />
          </aside>

          {/* 우측 본문 */}
          <section className="min-w-0">
            <CoreCompetencyDiagnosisTabButtons />
          </section>
        </div>
      </main>
    </div>
  );
};

export default CoreCompetencyAssessmentPage;
