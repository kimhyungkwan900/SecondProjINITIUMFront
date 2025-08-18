import { useEffect, useState } from "react";
import AdminStudentRadarResult from "./AdminStudentRadarResult";
import AdminCoreCompetencyGetResultPage from "../../../../pages/admin/coreCompetency/result/AdminCoreCompetencyGetResultPage";


const AdminAssessmentResultTab = ({selectedAssessment}) => {
  const [activeTab, setActiveTab] = useState("result"); // 기본값: 결과조회

  //진단 선택 시 기본정보 탭으로 전환
  useEffect(()=>{
    if(selectedAssessment){
        setActiveTab("result");
    }
  },[selectedAssessment]);
  
  if (!selectedAssessment) {
      return null;
  }

  
  return (
    <div className="mt-6 p-4 border border-gray-200 rounded-md bg-white">
      {/* 탭 버튼 */}
      <div className="flex gap-4 mb-4 border-b pb-2">
        <button 
          className={`px-4 py-2 rounded-md text-sm font-semibold ${activeTab === "result" ?  "font-bold border-b-2" : ""}`}
          onClick={() => setActiveTab("result")}
        >
          결과분석
        </button>
        <button 
          className={`px-4 py-2 rounded-md text-sm font-semibold ${activeTab === "getResult" ?  "font-bold border-b-2" : ""}`}
          onClick={() => setActiveTab("getResult")}
        >
          결과조회
        </button>
      </div>

      {/* 내용 렌더링 */}
      <div>
        {activeTab === "result" && <AdminStudentRadarResult assessmentNo={selectedAssessment?.assessmentNo}/>}
        {activeTab === "getResult" && <AdminCoreCompetencyGetResultPage assessmentNo={selectedAssessment?.assessmentNo}/>}
      </div>
    </div>
  );
};

export default AdminAssessmentResultTab;