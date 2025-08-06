import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import CoreCompetencySideBar from "../../../features/user/coreCompetency/CoreCompetencySideBar";
import DiagnosisTabButtons from "./DiagnosisTabButtons";

const CoreCompetencyResult = () => {
  const navigate = useNavigate();

  // 로그인 여부 (임시. 실제로는 props 또는 context 등에서 받아와야 함)
  const [isLoggedIn] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="bg-white min-h-screen">
      <MainHeader />

      {/* 상단 회색 헤더 */}
      <div className="bg-gray-100 px-12 py-10 border-b border-gray-300 flex justify-between items-center">
        <h1 className="text-4xl font-semibold">핵심역량진단</h1>
        <div className="text-2xl text-gray-600">HOME &gt; 핵심역량진단 &gt; 진단결과</div>
      </div>

      {/* 본문 영역 (사이드바 + 탭 + 내용) */}
      <div className="flex px-12 py-10 gap-10">
        {/* 좌측 사이드바 */}
        <CoreCompetencySideBar />

        {/* 우측 본문 */}
        <div className="flex-1">
          {/* 탭 버튼 영역 (공통) */}
          <DiagnosisTabButtons />

          {/* 로그인 여부에 따른 결과 출력 */}
          {isLoggedIn ? (
            <div className="mt-10 text-center text-gray-700">
              <h2 className="text-lg font-semibold mb-2">진단 결과 목록</h2>
              <p className="text-sm">여기에 진단 결과 데이터를 출력합니다.</p>
            </div>
          ) : (
            <div className="text-center py-16">
                <p className="text-gray-600 mb-4 text-[20px]">로그인이 필요한 기능입니다.</p>
                    <button
                        onClick={handleLogin}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow-sm transition text-[20px]"
                    >
                        로그인 하러가기
                    </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoreCompetencyResult;
