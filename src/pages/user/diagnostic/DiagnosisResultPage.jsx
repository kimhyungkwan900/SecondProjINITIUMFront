import React from 'react';
import { useParams } from 'react-router-dom';
import DiagnosisResult from '../../../component/user/diagnostic/DiagnosisResult.jsx';
import DiagnosisResultChart from '../../../component/user/diagnostic/DiagnosisResultChart.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';
import UserTopBar from '../../../component/user/mainpage/UserTopBar.jsx';
import SectionTitle from '../../../component/common/SectionTitle.jsx';

const DiagnosisResultPage = () => {
  const { resultId } = useParams(); // URL 파라미터

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center">
      {/* 상단 고정 영역 */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <UserTopBar />
        <MainHeader />
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="w-[62.6%] min-w-[62.6%] m-auto pt-[220px] pb-10">
        <main className="bg-white shadow-lg rounded-2xl p-8 space-y-8">
          <h1 className="text-3xl font-bold text-[#222E8D] text-center">
            진단검사 결과
          </h1>

          {/* 결과 요약 */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <SectionTitle size={22} showDivider>결과 요약</SectionTitle>
            </div>
            <DiagnosisResult resultId={resultId} />
          </section>

          {/* 결과 차트 */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <SectionTitle size={22} showDivider>결과 차트</SectionTitle>
            </div>
            <DiagnosisResultChart resultId={resultId} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default DiagnosisResultPage;
