
import MainHeader from "../../../features/user/mainpage/MainHeader";
import CoreCompetencySideBar from "../../../features/user/coreCompetency/CoreCompetencySideBar";
import DiagnosisTabButtons from "../../../component/user/coreCompetency/DiagnosisTabButtons";

const CoreCompetencyAssessmentPage = () => {
    const navItems = [
        "핵심역량안내",
        { link: "/competency/notice", name: "핵심역량안내" },
        { link: "/competency/coreCompetency", name: "핵심역량진단" }
    ];
    
    return (
        <div className="bg-white min-h-screen border border-gray-300">
            <MainHeader />

            {/* 상단 회색 박스 */}
            <div className="bg-gray-100 border-b border-gray-300">
                <div className="max-w-[1200px] mx-auto px-6 py-10 flex justify-between items-center">
                    <h1 className="text-4xl font-semibold text-center">핵심역량진단</h1>
                    <div className="text-1xl text-gray-600 whitespace-nowrap ml-auto">HOME &gt; 핵심역량진단</div>
                </div>
            </div>

            <div className="flex px-12 py-10">
                {/* 좌측 사이드바 */}
                <CoreCompetencySideBar navItems={navItems}/>

                {/* 우측 본문 영역 */}
                <div className="flex-1 ml-10">
                    <DiagnosisTabButtons/>
                </div>
            </div>
        </div>
    );
};

export default CoreCompetencyAssessmentPage;
