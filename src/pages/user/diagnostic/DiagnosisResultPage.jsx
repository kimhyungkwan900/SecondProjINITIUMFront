import React from 'react';
import { useParams } from 'react-router-dom';
import DiagnosisResult from '../../../component/user/diagnostic/DiagnosisResult.jsx';
import DiagnosisResultChart from '../../../component/user/diagnostic/DiagnosisResultChart.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';

const DiagnosisResultPage = () => {
  const { resultId } = useParams(); // 🔹 URL 파라미터

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex justify-center items-start py-10">
      <MainHeader />
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
  );
};

export default DiagnosisResultPage;
