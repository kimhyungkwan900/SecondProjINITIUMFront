import CoreCompetencySideBar from "../../../features/user/coreCompetency/CoreCompetencySideBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import { getAllAssessments } from "../../../api/user/coreCompetency/coreCompetencyAssessmentApi";
import { useEffect, useState } from "react";
import CoreCompetencyAssessmentListTable from "./coreCompetencyAssessmentListTable";
import DiagnosisTabButtons from "./DiagnosisTabButtons";



const CoreCompetencyList = () =>{

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
             {/* 상단 회색 헤더 */}
            <div className="bg-gray-100 px-12 py-10 border-b border-gray-300 flex justify-between items-center">
                <h1 className="text-4xl font-semibold">핵심역량진단</h1>
                <div className="text-2xl text-gray-600">HOME &gt; 핵심역량진단 &gt; 진단목록</div>
            </div>
            <div className="flex px-12 py-10">
                {/* 좌측 사이드바 */}
                <CoreCompetencySideBar />

                {/* 우측 본문 영역 */}
                <div className="flex-1 ml-10">
                    <DiagnosisTabButtons/>
                </div>
            </div>
            <CoreCompetencyAssessmentListTable isLoggedIn={isLoggedIn} assessments={assessments}/>
        </div>
    );
};

export default CoreCompetencyList;