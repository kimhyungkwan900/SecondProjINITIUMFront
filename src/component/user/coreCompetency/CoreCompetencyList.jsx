import CoreCompetencySideBar from "../../../features/user/coreCompetency/CoreCompetencySideBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import { getAllAssessments } from "../../../api/user/coreCompetency/coreCompetencyAssessmentApi";
import { useEffect, useState } from "react";



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
            <CoreCompetencySideBar/>
            <AssessmentListTable isLoggedIn={isLoggedIn} assessments={assessments}/>
        </div>
    );
};

export default CoreCompetencyList;