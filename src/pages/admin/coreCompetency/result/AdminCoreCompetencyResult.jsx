import Sidebar from "../../../../layouts/admin/extracurricular/Sidebar";
import { useState } from "react";

// 하단 3개는 핵심역량 진단결과 관련 컴포넌트들
import AdminAssessmentResultTab from "../../../../component/admin/coreCompetency/result/AdminAssessmentResultTab";
import AdminAssessmentResultSearchBar from "../../../../component/admin/coreCompetency/result/AdminAssessmentResultSearchBar";
import AdminAssessmentResultListTable from "../../../../component/admin/coreCompetency/result/AdminAssessmentResultListTable";

// 핵심역량 진단결과 페이지 (관리자용)
const AdminCoreCompetencyResult = () => {
  // 진단 목록 상태 (검색결과 리스트)
  const [assessmentList, setAssessmentList] = useState([]);

  // 선택된 진단 평가 항목 (하단 상세 탭에서 활용됨)
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  return (
    <div>
      {/* 좌측 관리자 사이드바 */}
      <Sidebar />

      {/* 페이지 제목 */}
      <div className="flex items-center ml-[265px] mt-16 gap-2">
        <span className="text-[26px] text-blue-600">▐</span>
        <span className="text-[26px] font-semibold">핵심역량진단결과</span>
      </div>

      {/* 구분선 */}
      <hr />

      {/* 검색 바 컴포넌트: setAssessmentList를 통해 검색 결과 상태 업데이트 */}
      <AdminAssessmentResultSearchBar setAssessmentList={setAssessmentList} />

      {/* 진단 목록 테이블: 클릭 시 setSelectedAssessment 호출 */}
      <AdminAssessmentResultListTable
        assessmentList={assessmentList}
        setSelectedAssessment={setSelectedAssessment}
      />

      {/* 상세 정보 탭: 진단 선택되면 하단에 탭 렌더링 */}
      <AdminAssessmentResultTab selectedAssessment={selectedAssessment} />
    </div>
  );
};

export default AdminCoreCompetencyResult;
