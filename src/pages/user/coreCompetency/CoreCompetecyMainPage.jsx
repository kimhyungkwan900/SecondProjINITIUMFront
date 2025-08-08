import MainHeader from "../../../features/user/mainpage/MainHeader";
import CoreCompetencyImage from "../../../features/user/coreCompetency/CoreCompetencyImage";
import CoreCompetencyTable from "../../../features/user/coreCompetency/CoreCompetencyTable";
import CoreCompetencySideBar from "../../../features/user/UserSideBar";
import CoreCompetencyNoticeComment from "../../../component/user/coreCompetency/CoreCompetencyNoticeComment";

export default function CoreCompetencyMainPage() {
    const navItems = [
        "핵심역량안내",
        {link: "/competency/notice", name: "핵심역량안내"},
        {link: "/competency/coreCompetency", name: "핵심역량진단"}
    ]

    return (
        <div className="bg-white min-h-screen border border-gray-300">
  <MainHeader />

  {/* 상단 회색 박스 */}
<div className="bg-gray-100 border-b border-gray-300">
  <div className="max-w-[1200px] mx-auto px-6 py-10 flex justify-between items-center">
    <h1 className="text-4xl font-semibold text-center">핵심역량안내</h1>
    <div className="text-1xl text-gray-600 whitespace-nowrap ml-auto">HOME &gt; 핵심역량안내</div>
  </div>
</div>

  {/* 본문 전체 중앙 정렬 */}
  <div className="flex justify-center px-12 py-10">
    <div className="flex w-[1200px]"> {/* 콘텐츠 전체 폭 고정 + flex */}
      {/* 좌측 사이드바 - 고정 너비 지정 */}
      <div className="w-[240px] flex-shrink-0">
        <CoreCompetencySideBar navItems={navItems}/>
      </div>

      {/* 우측 본문 콘텐츠 */}
      <div className="flex-1 ml-10">
        {/* 상단 블루탭 */}
        <div className="text-4xl text-black inline-block px-2 rounded mt-5 font-bold">
          ▣ EARTH 핵심역량 정의
        </div>

        {/* 도식화 영역 */}
        <div className="mt-6">
          <CoreCompetencyImage />
        </div>

        {/* 핵심 역량 안내 멘트 */}
        <div className="mt-20">
          <CoreCompetencyNoticeComment />
        </div>
        

        {/* 표 설명 영역 */}
        <div className="mt-20">
          <CoreCompetencyTable />
        </div>
      </div>
    </div>
  </div>
</div>
    );
}
