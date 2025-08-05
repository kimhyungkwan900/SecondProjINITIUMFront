import { useNavigate } from "react-router-dom";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import CoreCompetencySideBar from "../../../features/user/coreCompetency/CoreCompetencySideBar";

const CoreCompetencyAssessmentPage = () =>{

    const navigate = useNavigate();

    const handleList = () =>{
        navigate('/competency/coreCompetency/list');
    }

    const handleResult = () =>{
        navigate('/competency/coreCompentecy/result');
    }

    return(
        <div>
            <MainHeader/>
            <CoreCompetencySideBar/>
            <div>
                <button
                    onClick={handleList}>
                        진단목록
                </button>
                <button
                    onClick={handleResult}>
                    진단결과
                </button>
            </div>
        </div>
    );
};

export default CoreCompetencyAssessmentPage;