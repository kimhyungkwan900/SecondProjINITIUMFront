import React from 'react';
import { useParams } from 'react-router-dom';
import DiagnosisResult from '../../../component/user/diagnostic/DiagnosisResult.jsx';
import DiagnosisResultChart from '../../../component/user/diagnostic/DiagnosisResultChart.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';
import UserTopBar from '../../../component/user/mainpage/UserTopBar.jsx';

const DiagnosisResultPage = () => {
  const { resultId } = useParams(); // URL 파라미터

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      {/* 상단 고정 헤더 */}
      <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
        <UserTopBar />
        <MainHeader />
      </div>

      {/* 콘텐츠 영역 (헤더 높이만큼 패딩 추가) */}
      <div className="flex justify-center items-start pt-60 pb-10">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8 space-y-8">
          <h1 className="text-3xl font-bold text-[#222E8D] mb-6 text-center">
            진단검사 결과
          </h1>

          {/* 결과 요약 */}
          <div className="bg-gray-50 rounded-xl p-6 shadow">
            <DiagnosisResult resultId={resultId} />
          </div>

          {/* 결과 차트 */}
          <div className="bg-gray-50 rounded-xl p-6 shadow">
            <DiagnosisResultChart resultId={resultId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResultPage;
