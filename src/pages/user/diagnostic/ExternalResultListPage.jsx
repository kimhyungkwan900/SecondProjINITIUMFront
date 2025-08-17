import React from 'react';
import ExternalResultsFeature from '../../../features/user/diagnostic/ExternalResultsFeature.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';
import UserTopBar from '../../../component/user/mainpage/UserTopBar.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import SectionTitle from '../../../component/common/SectionTitle.jsx';

const ExternalResultListPage = () => {
  const { user } = useAuth();
  const studentNo = user?.loginId;

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center">
      {/* 상단 고정 영역 */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <UserTopBar />
        <MainHeader />
      </div>

      {/* 메인 컨텐츠 영역: 62.6% 폭 + 상단 패딩(겹침 방지) */}
      <div className="w-[62.6%] min-w-[62.6%] m-auto pt-[220px] pb-10">
        <main className="bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-[#222E8D] text-center mb-6">
            외부 진단검사 전체 결과
          </h1>

          {/* 섹션 헤더(파란 막대 + 제목) */}
          <div className="flex items-center gap-2 mb-4">
            <SectionTitle size={22} showDivider>결과 목록</SectionTitle>
          </div>

          <ExternalResultsFeature studentNo={studentNo} />
        </main>
      </div>
    </div>
  );
};

export default ExternalResultListPage;
