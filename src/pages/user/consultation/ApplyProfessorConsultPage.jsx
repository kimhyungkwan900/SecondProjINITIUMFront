import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";

const ApplyProfessorConsultPage = ()=>{
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
                
                {/* <div className="flex-1 flex-col ml-10">
                    상담일정 선택 넣기
                </div> */}
            </div>
        </div>
    );
}
export default ApplyProfessorConsultPage;