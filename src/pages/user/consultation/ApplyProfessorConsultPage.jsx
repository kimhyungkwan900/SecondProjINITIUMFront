import { useState } from "react"

import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import ConsultScheduleSelect from "../../../features/user/consultation/ConsultScheduleSelect";
import ConsultApplyForm from "../../../features/user/consultation/ConsultApplyForm";
import ConsultComplete from "../../../features/user/consultation/ConsultComplete";

const ApplyProfessorConsultPage = ({type})=>{

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
            <div className="bg-gray-100 px-12 py-10 border-b border-gray-300 flex justify-between items-center">
                <h1 className="text-3xl font-semibold">상담종합</h1>
                <div className="text-2xl text-gray-600">HOME &gt; 상담종합</div>
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
export default ApplyProfessorConsultPage;