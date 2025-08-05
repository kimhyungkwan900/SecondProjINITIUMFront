import React from 'react';
import ExternalTestListFeature from '../../../features/user/diagnostic/ExternalTestListFeature.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';

const ExternalDiagnosisPage = () => {
  const studentNo = '1'; // 형관님 파트

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      {/* 상단 고정 헤더 */}
      <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
        <MainHeader />
      </div>

      {/* 콘텐츠 영역 (헤더 높이만큼 패딩 추가) */}
      <div className="flex justify-center items-start pt-24 pb-10">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-[#222E8D] mb-6 text-center">
            외부 진단검사 페이지
          </h1>
          <ExternalTestListFeature studentNo={studentNo} />
        </div>
      </div>
    </div>
  );
};

export default ExternalDiagnosisPage;
