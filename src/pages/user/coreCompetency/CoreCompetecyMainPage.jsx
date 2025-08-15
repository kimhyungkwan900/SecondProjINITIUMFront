import MainHeader from "../../../features/user/mainpage/MainHeader";
import CoreCompetencyImage from "../../../features/user/coreCompetency/CoreCompetencyImage";
import CoreCompetencyTable from "../../../features/user/coreCompetency/CoreCompetencyTable";
import CoreCompetencySideBar from "../../../features/user/UserSideBar";
import CoreCompetencyNoticeComment from "../../../component/user/coreCompetency/CoreCompetencyNoticeComment";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";

export default function CoreCompetencyMainPage() {
  const navItems = [
    "핵심역량안내",
    { link: "/competency/notice", name: "핵심역량안내" },
    { link: "/competency/coreCompetency", name: "핵심역량진단" },
  ];

  return (
    <div className="bg-white min-h-screen border border-gray-300">
      <UserTopBar />
      <MainHeader />

      {/* 상단 회색 영역 */}
      <div className="bg-gray-100 border-b border-gray-300">
        <div className="w-[1200px] mx-auto px-6 py-8">
          {/* 세로 중앙 정렬, 좌/우 배치 */}
          <div className="flex justify-between items-center">
            {/* 불필요 여백 제거 및 좌측 정렬 명시 */}
            <h1 className="text-4xl font-semibold text-left ml-3">핵심역량안내</h1>
            <div className="text-base text-gray-600 text-right mt-3">
              HOME &gt; 핵심역량안내
            </div>
          </div>
        </div>
      </div>

      {/* 본문 영역 */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 ">
          <div className="grid grid-cols-1 gap-9 lg:grid-cols-[260px,1fr]">
             {/* 좌측 사이드바 */}
              <div className="flex-shrink-0">
                <CoreCompetencySideBar navItems={navItems} />
              </div>

              {/* 우측 본문 콘텐츠 */}
              <div className="flex-1">
                {/* 제목 좌측 정렬 명시 */}
                <div className="text-[36px] text-black font-bold mt-5 text-left">
                  ▣ EARTH 핵심역량 정의
                </div>

                <div className="mt-28">
                  <CoreCompetencyImage />
                </div>

                <div className="mt-40">
                  <CoreCompetencyNoticeComment />
                </div>

                <div className="mt-32">
                  <CoreCompetencyTable />
                </div>
            </div>
          </div>
        </main>
    </div>
  );
}
