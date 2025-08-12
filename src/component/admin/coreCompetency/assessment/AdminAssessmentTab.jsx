import { useEffect, useState } from "react";
import AdminAssessmentDetailPanel from "./AdminAssessmentDetailPanel";
import AdminCoreCompetencyQuestionPage from "../../../../pages/admin/coreCompetency/assessment/AdminCoreCompetencyQuestionPage";
import AdminCoreCompetencyCategory from "../../../../pages/admin/coreCompetency/assessment/AdminCoreCompetencyCategory";
import AdminCoreCompetencyMapping from "../../../../pages/admin/coreCompetency/assessment/AdminCoreCompetencyMapping";
import AdminCoreCompetencyParticipant from "../../../../pages/admin/coreCompetency/assessment/AdminCoreCompetencyParticipant";

// onSave, onDelete, onCancel 함수를 props로 받습니다.
const AdminAssessmentTab = ({ selectedAssessment, onSave, onDelete, onCancel }) => {
    const [activeTab, setActiveTab] = useState("basicInfo");

    useEffect(() => {
        if (selectedAssessment) {
            setActiveTab("basicInfo");
        }
    }, [selectedAssessment]);

    // 선택된 항목이 없으면 아무것도 렌더링하지 않음
    if (!selectedAssessment) {
        return null;
    }

    return (
        <div className="mt-6 border p-6 rounded bg-white shadow">
            <div className="flex gap-4 mb-4 border-b pb-2">
                {/* 탭 버튼들*/}
                <button className={activeTab === "basicInfo" ? "font-bold border-b-2" : ""} onClick={() => setActiveTab("basicInfo")}>기본정보</button>
                <button className={activeTab === "questionInfo" ? "font-bold border-b-2" : ""} onClick={() => setActiveTab("questionInfo")}>문항정보</button>
                <button className={activeTab === "analysis" ? "font-bold border-b-2" : ""} onClick={() => setActiveTab("analysis")}>분석기준</button>
                <button className={activeTab === "analysisItems" ? "font-bold border-b-2" : ""} onClick={() => setActiveTab("analysisItems")}>분석기준항목</button>
                <button className={activeTab === "participant" ? "font-bold border-b-2" : ""} onClick={() => setActiveTab("participant")}>참여자정보</button>
            </div>
            <div>
                {activeTab === "basicInfo" && (
                    // 받은 함수들을 AdminAssessmentDetailPanel에 그대로 전달
                    <AdminAssessmentDetailPanel
                        initialAssessment={selectedAssessment}
                        onSave={onSave}
                        onDelete={onDelete}
                        onCancel={onCancel}
                    />
                )}
                {activeTab === "questionInfo" && <AdminCoreCompetencyQuestionPage assessmentId={selectedAssessment?.id} />}
                {activeTab === "analysis" && <AdminCoreCompetencyCategory assessmentId={selectedAssessment?.id} />}
                {activeTab === "analysisItems" && <AdminCoreCompetencyMapping assessmentId={selectedAssessment?.id} />}
                {activeTab === "participant" && <AdminCoreCompetencyParticipant assessmentNo={selectedAssessment?.assessmentNo}/>}
            </div>
        </div>
    );
};

export default AdminAssessmentTab;