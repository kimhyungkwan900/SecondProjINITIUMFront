import MainHeader from "../../../features/user/mainpage/MainHeader";
import CoreCompetencyImage from "../../../features/user/coreCompetency/CoreCompetencyImage";
import CoreCompetencyTable from "../../../features/user/coreCompetency/CoreCompetencyTable";
import CoreCompetencySideBar from "../../../features/user/coreCompetency/CoreCompetencySideBar";

export default function CoreCompetencyMainPage() {

    return (
        <div className="bg-white min-h-screen border border-gray-300">
            <MainHeader />

            {/* 상단 회색 박스 */}
            <div className="bg-gray-100 px-12 py-10 border-b border-gray-300 flex justify-between items-center">
                <h1 className="text-3xl font-semibold">핵심역량안내</h1>
                <div className="text-2xl text-gray-600">HOME &gt; 핵심역량안내</div>
            </div>

            {/* 본문: 사이드바 + 콘텐츠 */}
            <div className="flex px-12 py-10">
                {/* 좌측 사이드바 */}
                <CoreCompetencySideBar />

                {/* 우측 본문 콘텐츠 */}
                <div className="flex-1 ml-10">
                    {/* 상단 블루탭 */}
                    <div className="text-4xl text-black inline-block px-3 py-1 rounded mt-5">
                        EARTH 핵심역량 정의
                    </div>

                    {/* 도식화 영역 */}
                    <div className="mt-6  text-center py-12 rounded">
                        <div className="mt-4">
                            <CoreCompetencyImage />
                        </div>
                    </div>

                    {/* 표 설명 영역 */}
                    <div className="mt-6 text-center py-12 rounded">
                        <div className="mt-4">
                            <CoreCompetencyTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
