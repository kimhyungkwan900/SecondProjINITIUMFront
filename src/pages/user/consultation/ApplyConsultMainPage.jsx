import ApplyConsultBox from "../../../component/user/consultation/ApplyConsultBox"
import CoreCompetencySideBar from "../../../features/user/coreCompetency/CoreCompetencySideBar";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";

const ApplyConsultMainPage = ()=>{
    const navItems = [
        "상담종합",
        {link: "/consult", name: "상담신청"},
        {link: "/consult/list", name: "상담내역"}
    ]

    const applyItems = [
        {
            imgSrc: "",
            name: "지도교수 상담",
            description: "교수님과 상담을 원하는 학생은 상담을 신청해주세요.",
            type: "상담신청",
            link: "/consult/apply/professor"
        },
        {
            imgSrc: "",
            name: "진로취업 상담",
            description: "진로에 고민이 있거나 취업정보가 부족해 피드백이 필요한 학생은 상담을 신청해주세요.",
            type: "상담신청",
            link: "/consult/"
        },
        {
            imgSrc: "",
            name: "심리상담",
            description: "심리적 어려움이나 고민이 있는 학생은 상담을 신청해주세요.",
            type: "상담신청",
            link: "/consult/"
        },
        {
            imgSrc: "",
            name: "학습상담",
            description: "학습 방법이나 성적 향상에 대해 상담이 필요한 학생은 신청해주세요.",
            type: "상담신청",
            link: "/consult/"
        },
    ]

    return(
        <div className="bg-white min-h-screen border border-gray-300">
            <UserTopBar />
            <MainHeader />

            {/* 상단 회색 박스 */}
            <div className="bg-gray-100 px-12 py-10 border-b border-gray-300 flex justify-between items-center">
                <h1 className="text-3xl font-semibold">상담종합</h1>
                <div className="text-2xl text-gray-600">HOME &gt; 상담종합</div>
            </div>

            {/* 본문: 사이드바 + 콘텐츠 */}
            <div className="flex px-12 py-10">
                {/* 좌측 사이드바 */}
                <CoreCompetencySideBar navItems={navItems}/>

                {/* 우측 본문 콘텐츠 */}
                <div className="flex-1 flex-col ml-10">
                    {applyItems.map((item, idx)=>(
                        <ApplyConsultBox key={idx} info={item}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ApplyConsultMainPage;