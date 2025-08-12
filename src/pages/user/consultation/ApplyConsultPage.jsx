import { useState, useContext } from "react"
import { UserContext } from "../../../App";

import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import ConsultScheduleSelect from "../../../features/user/consultation/ConsultScheduleSelect";
import ConsultApplyForm from "../../../features/user/consultation/ConsultApplyForm";
import ConsultComplete from "../../../features/user/consultation/ConsultComplete";

import { getScheduleById, applyConsult } from "../../../api/user/consult/ConsultUserApi";
// import useRequireAuth from "../../../hooks/user/consult/useRequireAuth";

const ApplyConsultPage = ({type})=>{
    // const stnt = useRequireAuth("/login");
    // if (!stnt) return null;

    const { user } = useContext(UserContext);   //로그인 인원 정보 가져오기
    // const { student, loading, error } = useStudentInfo(user?.loginId);
    
    const [step, setStep] = useState(0);
    const [selectedSchedule, setSelectedSchedule] = useState({});

    const handleSlotSelect = async (dscsnDtId) => {
        const data = await getScheduleById(dscsnDtId);
        
        if(data.dscsnYn === "Y") {
            alert("이미 예약된 일정입니다.")
        } else{
            setSelectedSchedule(data);
            setStep(1);
        }
    };

    const handleSubmit = async (applyInfo) => {
        const result = await applyConsult(applyInfo)
        console.log(result);
        setStep(2);
    };

    const handleBack = () => {
        const isConfirmed = confirm("작성내용이 저장되지 않습니다. 뒤로 가시겠습니까?");

        if (isConfirmed && step === 1) {
            setStep(0);
            setSelectedSchedule(null);
        }
    };

    return(
        <div className="bg-white min-h-screen border border-gray-300">
            <UserTopBar />
            <MainHeader />

            {/* 상단 회색 박스 */}
            <div className="bg-gray-100 border-b border-gray-300">
                <div className="w-[1200px] mx-auto px-6 py-8">
                <div className="flex justify-between items-end">
                    <h1 className="ml-42 text-4xl font-semibold">상담종합</h1>
                    <div className="text-base text-gray-600 text-right">
                    HOME &gt; 상담신청
                    </div>
                </div>
                </div>
            </div>

            <div>
                {step === 0 && (
                    <ConsultScheduleSelect userInfo={user} type={type} onSelect={handleSlotSelect}/>
                )}

                {step === 1 && (
                    <ConsultApplyForm userInfo={user} type={type} schedule={selectedSchedule} onSubmit={handleSubmit} onBack={handleBack}/>
                )}

                {step === 2 && (
                    <ConsultComplete/>
                )}
            </div>
        </div>
    );
}
export default ApplyConsultPage;