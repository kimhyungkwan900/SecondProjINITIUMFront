
import MainHeader from "../../../features/user/mainpage/MainHeader";
import CoreCompetencySideBar from "../../../features/user/UserSideBar";
import DiagnosisTabButtons from "../../../component/user/coreCompetency/DiagnosisTabButtons";

const CoreCompetencyResultPage = () => {
  const navItems = [
        "핵심역량안내",
        { link: "/competency/notice", name: "핵심역량안내" },
        { link: "/competency/coreCompetency", name: "핵심역량진단" }
    ];

  return (
    <div className="bg-white min-h-screen">
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
          <DiagnosisTabButtons/>

          {/* 진단 결과 출력 (로그인 여부 조건 제거) */}
          <div className="mt-10 text-center text-gray-700">
            <h2 className="text-lg font-semibold mb-2">진단 결과 목록</h2>
            <p className="text-sm">여기에 진단 결과 데이터를 출력합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreCompetencyResultPage;
