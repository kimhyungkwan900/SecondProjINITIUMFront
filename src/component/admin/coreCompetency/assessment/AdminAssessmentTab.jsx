import { useEffect, useState } from "react";

// 진단 상세정보 및 문항/기준/참여자 관리 컴포넌트 import
import AdminAssessmentDetailPanel from "./AdminAssessmentDetailPanel";
import AdminCoreCompetencyQuestionPage from "../../../../pages/admin/coreCompetency/assessment/AdminCoreCompetencyQuestionPage";
import AdminCoreCompetencyCategory from "../../../../pages/admin/coreCompetency/assessment/AdminCoreCompetencyCategory";
import AdminCoreCompetencyMapping from "../../../../pages/admin/coreCompetency/assessment/AdminCoreCompetencyMapping";
import AdminCoreCompetencyParticipant from "../../../../pages/admin/coreCompetency/assessment/AdminCoreCompetencyParticipant";

// 진단 평가 상세보기 탭 컴포넌트
const AdminAssessmentTab = ({ selectedAssessment }) => {
  // 현재 활성화된 탭 상태 (기본: "view" → 초기화 후 "basicInfo"로 전환됨)
  const [activeTab, setActiveTab] = useState("view");

  // 새로운 진단이 선택되면 기본정보 탭으로 자동 전환
  useEffect(() => {
    if (selectedAssessment) {
      console.log("assessment : ", selectedAssessment);
      setActiveTab("basicInfo");
    }
  }, [selectedAssessment]);

  return (
    <div className="mt-6 border p-6 rounded bg-white shadow">
      {/* 탭 버튼 그룹 */}
      <div className="flex gap-4 mb-4 border-b pb-2">
        {/* 기본정보 탭 */}
        <button
          className={activeTab === "basicInfo" ? "font-bold border-b-2" : ""}
          onClick={() => setActiveTab("basicInfo")}
        >
          기본정보
        </button>

        {/* 문항정보 탭 */}
        <button
          className={activeTab === "questionInfo" ? "font-bold border-b-2" : ""}
          onClick={() => setActiveTab("questionInfo")}
        >
          문항정보
        </button>

        {/* 분석기준 탭 */}
        <button
          className={activeTab === "analysis" ? "font-bold border-b-2" : ""}
          onClick={() => setActiveTab("analysis")}
        >
          분석기준
        </button>

        {/* 분석기준항목 탭 */}
        <button
          className={activeTab === "analysisItems" ? "font-bold border-b-2" : ""}
          onClick={() => setActiveTab("analysisItems")}
        >
          분석기준항목
        </button>

        {/* 참여자정보 탭 */}
        <button
          className={activeTab === "participant" ? "font-bold border-b-2" : ""}
          onClick={() => setActiveTab("participant")}
        >
          참여자정보
        </button>
      </div>

      {/* 탭별 콘텐츠 렌더링 */}
      <div>
        {activeTab === "basicInfo" && (
          <AdminAssessmentDetailPanel assessment={selectedAssessment} />
        )}
        {activeTab === "questionInfo" && (
          <AdminCoreCompetencyQuestionPage/>
        )}
        {activeTab === "analysis" && (
          <AdminCoreCompetencyCategory assessment={selectedAssessment?.id}/>
        )}
        {activeTab === "analysisItems" && (
          <AdminCoreCompetencyMapping assessment={selectedAssessment?.id}/>
        )}
        {activeTab === "participant" && (
          <AdminCoreCompetencyParticipant />
        )}
      </div>
    </div>
  );
};

export default AdminAssessmentTab;
