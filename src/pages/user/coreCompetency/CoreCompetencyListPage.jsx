import CoreCompetencySideBar from "../../../features/user/coreCompetency/CoreCompetencySideBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import { getAllAssessments } from "../../../api/admin/coreCompetency/AdminAssessmentApi";
import { useEffect, useState } from "react";
import DiagnosisTabButtons from "../../../component/user/coreCompetency/DiagnosisTabButtons";
import CoreCompetencyAssessmentListTable from "../../../component/user/coreCompetency/CoreCompetencyAssessmentListTable";



const CoreCompetencyListPage = () =>{
    const navItems = [
        "핵심역량안내",
        { link: "/competency/notice", name: "핵심역량안내" },
        { link: "/competency/coreCompetency", name: "핵심역량진단" }
    ];

    // 로그인 여부 판단 수정 예정
    const [assessments, setAssessment] = useState([]);
    const[isLoggedIn] = useState();

    useEffect(()=>{
        if(isLoggedIn){
            getAllAssessments()
            .then((res)=>{setAssessment(res.data)})
            .catch((err)=>console.log('진단 목록 불러오기 실패:', err))
        };
    },[isLoggedIn]);

    return(
        <div>
            <MainHeader/>
            {/* 상단 회색 박스 */}
            <div className="bg-gray-100 border-b border-gray-300">
                <div className="max-w-[1200px] mx-auto px-6 py-10 flex justify-between items-center">
                    <h1 className="text-4xl font-semibold text-center">핵심역량진단</h1>
                    <div className="text-1xl text-gray-600 whitespace-nowrap ml-auto">HOME &gt; 핵심역량진단 &gt; 진단목록</div>
                </div>
            </div>

            <div className="flex px-12 py-10">
                {/* 좌측 사이드바 */}
                <CoreCompetencySideBar navItems={navItems}/>

                {/* 우측 본문 영역 */}
                <div className="flex-1 ml-10">
                    <DiagnosisTabButtons/>
                    <CoreCompetencyAssessmentListTable assessments={assessments}/>
                </div>
            </div>
        </div>
    );
};

export default CoreCompetencyListPage;