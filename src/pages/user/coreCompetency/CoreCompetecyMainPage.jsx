import MainHeader from "../../../features/user/mainpage/MainHeader";
import CoreCompetencyImage from "../../../features/user/coreCompetency/CoreCompetencyImage";
import CoreCompetencyTable from "../../../features/user/coreCompetency/CoreCompetencyTable";
import CoreCompetencySideBar from "../../../features/user/UserSideBar";
import CoreCompetencyNoticeComment from "../../../component/user/coreCompetency/CoreCompetencyNoticeComment";

export default function CoreCompetencyMainPage() {
  const navItems = [
    "핵심역량안내",
    { link: "/competency/notice", name: "핵심역량안내" },
    { link: "/competency/coreCompetency", name: "핵심역량진단" },
  ];

  return (
    <div className="bg-white min-h-screen border border-gray-300">
      <MainHeader />

      {/* 상단 회색 영역 */}
      <div className="bg-gray-100 border-b border-gray-300">
        <div className="w-[1200px] mx-auto px-6 py-8">
          <div className="flex justify-between items-end">
            <h1 className="ml-42 text-4xl font-semibold">핵심역량안내</h1>
            <div className="text-base text-gray-600 text-right">
              HOME &gt; 핵심역량안내
            </div>
          </div>
        </div>
      </div>

     {/* 본문 영역 */}
<div className="w-full max-w-screen-xl mx-auto flex px-6 py-10 gap-8">
  {/* 좌측 사이드바 */}
  <div className="w-[260px] flex-shrink-0">
    <CoreCompetencySideBar navItems={navItems} />
  </div>

  {/* 우측 본문 콘텐츠 */}
  <div className="flex-1">
    <div className="text-4xl text-black font-bold mt-4">
      ▣ EARTH 핵심역량 정의
    </div>

    <div className="mt-16">
      <CoreCompetencyImage />
    </div>

    <div className="mt-16">
      <CoreCompetencyNoticeComment />
    </div>

    <div className="mt-20">
      <CoreCompetencyTable />
    </div>
  </div>
</div>


    </div>
  );
}
