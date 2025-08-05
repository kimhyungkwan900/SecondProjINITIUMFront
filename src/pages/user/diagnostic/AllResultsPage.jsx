import React from 'react';
import InternalResultsFeature from '../../../features/user/diagnostic/InternalResultsFeature.jsx';
import ExternalResultsFeature from '../../../features/user/diagnostic/ExternalResultsFeature.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';

const AllResultsPage = () => {
  const studentNo = '20250001'; // 로그인된 학생 번호 (형관님 파트)

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      {/* 상단 고정 헤더 */}
      <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
        <MainHeader />
      </div>

      {/* 콘텐츠 영역 (헤더 높이만큼 패딩 추가) */}
      <div className="flex justify-center items-start pt-24 pb-10">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-8 space-y-8">
          <h1 className="text-3xl font-bold text-[#222E8D] text-center mb-8">
            나의 진단검사 결과
          </h1>

          {/* 내부 진단검사 결과 */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
            <InternalResultsFeature studentNo={studentNo} />
          </section>

          {/* 외부 진단검사 결과 */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
            <ExternalResultsFeature studentNo={studentNo} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AllResultsPage;
