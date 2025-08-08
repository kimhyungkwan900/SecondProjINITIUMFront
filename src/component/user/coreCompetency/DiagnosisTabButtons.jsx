import { useNavigate, useLocation } from "react-router-dom";

const DiagnosisTabButtons = () => {
  const navigate = useNavigate();   // 페이지 이동을 위한 훅
  const location = useLocation();   // 현재 URL 경로를 가져오는 훅

  // 현재 경로가 진단목록 페이지인지 여부
  const isListPage = location.pathname.includes("/coreCompetency/list");

  // 현재 경로가 진단결과 페이지인지 여부
  const isResultPage = location.pathname.includes("/coreCompetency/result");

  return (
    // 버튼 그룹 외곽: 위아래 여백 + 가운데 정렬
    <div className="mt-5 mb-6 flex justify-center">
  <div className="inline-flex border border-gray-300 rounded-md overflow-hidden shadow-sm text-[17px] font-medium">

    {/* 진단목록 버튼 */}
    <button
      onClick={() => navigate("/competency/coreCompetency/list")}
      className={`px-[60px] py-[12px] text-base flex-shrink-0 transition duration-200 text-center ${
        isListPage
          ? "bg-white text-blue-700 font-semibold"
          : "bg-gray-100 text-gray-700 hover:bg-blue-50"
      }`}
      style={{ width: "500px" }} // 👈 고정 픽셀 단위로 설정
    >
      진단목록
    </button>

    {/* 진단결과 버튼 */}
    <button
      onClick={() => navigate("/competency/coreCompetency/result")}
      className={`px-[60px] py-[12px] text-base flex-shrink-0 transition duration-200 text-center ${
        isResultPage
          ? "bg-white text-blue-700 font-semibold"
          : "bg-gray-100 text-gray-700 hover:bg-blue-50"
      }`}
      style={{ width: "500px" }}
    >
      진단결과
    </button>
  </div>
</div>

  );
};

export default DiagnosisTabButtons;
