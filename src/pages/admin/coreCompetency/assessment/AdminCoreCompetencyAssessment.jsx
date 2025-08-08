import AdminAssessmentSearchBar from "../../../../component/admin/coreCompetency/assessment/AdminAssessmentSearchBar";
import AdminAssessmentListTable from "../../../../component/admin/coreCompetency/assessment/AdminAssessmentListTable";
import { useState } from "react";
import AdminAssessmentTab from "../../../../component/admin/coreCompetency/assessment/AdminAssessmentTab";

// 관리자 핵심역량 진단 평가 관리 페이지
const AdminCoreCompetencyAssessment = () => {
  //  진단 목록 (검색 결과 리스트)
  const [assessmentList, setAssessmentList] = useState([]);

  //  선택된 진단 (상세 탭에 넘겨줌)
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  return (
    <div>
      {/*  상단 제목 영역 */}
      <div>
        <div className="flex items-center mt-16 gap-2">
        <span className="text-[26px] text-blue-600">▐</span>
        <span className="text-[26px] font-semibold">핵심역량진단</span>
      </div>

      {/* 구분선 */}
      <hr />

      {/*  진단 검색바 (검색 조건에 따라 setAssessmentList 업데이트) */}
      <AdminAssessmentSearchBar setAssessmentList={setAssessmentList} />

      {/*  진단 목록 테이블 (assessmentList 렌더링 + 행 클릭 시 setSelectedAssessment 호출) */}
      <AdminAssessmentListTable 
        assessmentList={assessmentList} 
        setSelectedAssessment={setSelectedAssessment} 
      />

      {/*  진단 상세 탭 패널 (선택된 진단 정보에 따라 상세 탭 렌더링) */}
      <AdminAssessmentTab selectedAssessment={selectedAssessment} />
    </div>
      </div>
  );
};

export default AdminCoreCompetencyAssessment;
