import { useState } from "react";

// 하단 3개는 핵심역량 진단결과 관련 컴포넌트들
import AdminAssessmentResultTab from "../../../../component/admin/coreCompetency/result/AdminAssessmentResultTab";
import AdminAssessmentResultSearchBar from "../../../../component/admin/coreCompetency/result/AdminAssessmentResultSearchBar";
import AdminAssessmentResultListTable from "../../../../component/admin/coreCompetency/result/AdminAssessmentResultListTable";
import AdminSectionHeader from "../../../../component/admin/AdminSectionHeader";

// 핵심역량 진단결과 페이지 (관리자용) — CSS만 정리
const AdminCoreCompetencyResult = () => {
  const [assessmentList, setAssessmentList] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* 상단 헤더 */}
      <div className="pt-6">
        <AdminSectionHeader title="핵심 역량 결과" />
      </div>

      {/* 검색바 카드 */}
      <section className="adm-card p-4 mt-4">
        <AdminAssessmentResultSearchBar setAssessmentList={setAssessmentList} />
      </section>

      {/* 목록 카드 */}
      <section className="adm-card">
        <AdminAssessmentResultListTable
          assessmentList={assessmentList}
          selectedAssessment={selectedAssessment}
          setSelectedAssessment={setSelectedAssessment}
        />
      </section>

      {/* 상세 탭 카드 (선택 시 표시) */}
      {selectedAssessment && (
        <section className="adm-card p-6">
          <AdminAssessmentResultTab selectedAssessment={selectedAssessment} />
        </section>
      )}
    </div>
  );
};

export default AdminCoreCompetencyResult;
