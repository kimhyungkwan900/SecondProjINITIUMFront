import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../App";

const CoreCompetencyDiagnosisTabButtons = () => {
  const navigate = useNavigate();   // 페이지 이동을 위한 훅
  const location = useLocation();   // 현재 URL 경로를 가져오는 훅

    const { user } = useContext(UserContext);

  // 역할 플래그
  const isEmployee = !!user?.empNo;
  const isStudent  = !!user?.loginId && !isEmployee;

  // 현재 경로가 진단목록 페이지인지 여부
  const isListPage = location.pathname.includes("/coreCompetency/list");

  // 현재 경로가 진단결과 페이지인지 여부
  const isResultPage = location.pathname.includes("/coreCompetency/result");

  return (
 <div className="mt-5 mb-6 flex justify-center">
      {/* 컨테이너 폭 고정 → 버튼이 flex-1로 나눠가짐 (1개면 전폭) */}
      <div className="w-[1000px] inline-flex border border-gray-300 rounded-md overflow-hidden shadow-sm text-[17px] font-medium">
        
        {/* 진단목록: 공통 */}
        <button
          onClick={() => navigate("/competency/coreCompetency/list")}
          className={`flex-1 px-[60px] py-[12px] text-base transition duration-200 text-center ${
            isListPage ? "bg-white text-blue-700 font-semibold"
                       : "bg-gray-100 text-gray-700 hover:bg-blue-50"
          }`}
          aria-current={isListPage ? "page" : undefined}
        >
          진단목록
        </button>

        {/* 진단결과: 학생만 */}
        {isStudent && (
          <button
            onClick={() => navigate("/competency/coreCompetency/result")}
            className={`flex-1 px-[60px] py-[12px] text-base transition duration-200 text-center ${
              isResultPage ? "bg-white text-blue-700 font-semibold"
                           : "bg-gray-100 text-gray-700 hover:bg-blue-50"
            }`}
            aria-current={isResultPage ? "page" : undefined}
          >
            진단결과
          </button>
        )}
      </div>
    </div>

  );
};

export default CoreCompetencyDiagnosisTabButtons;
