import { useState, useContext } from "react"
import { UserContext } from "../../../App";

import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import ConsultScheduleSelect from "../../../features/user/consultation/ConsultScheduleSelect";
import ConsultApplyForm from "../../../features/user/consultation/ConsultApplyForm";
import ConsultComplete from "../../../features/user/consultation/ConsultComplete";
// import useRequireAuth from "../../../hooks/user/consult/useRequireAuth";

const ApplyConsultPage = ({type})=>{
    // const stnt = useRequireAuth("/login");

    // if (!stnt) return null;

    const { user } = useContext(UserContext);   //로그인 인원 정보 가져오기
    // const { student, loading, error } = useStudentInfo(user?.loginId);

    console.log(type);
    const [step, setStep] = useState(0);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
        setStep(1);
    };

    const handleFormSubmit = async () => {

        setStep(2);
    };

    const handleBack = () => {
        if (step === 1) {
        setStep(0);
        setSelectedSlot(null);
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
                    <ConsultScheduleSelect onSelect={handleSlotSelect}/>
                )}

                {step === 1 && (
                    <ConsultApplyForm slot={selectedSlot} onSubmit={handleFormSubmit} onBack={handleBack}/>
                )}

                {step === 2 && (
                    <ConsultComplete slot={selectedSlot}/>
                )}
            </div>
        </div>
    );
}
export default ApplyConsultPage;