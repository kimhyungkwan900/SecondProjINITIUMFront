import React from 'react';
import ExternalTestListFeature from '../../../features/user/diagnostic/ExternalTestListFeature.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';
import UserTopBar from '../../../component/user/mainpage/UserTopBar.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import UserSideBar from '../../../features/user/UserSideBar.jsx';

const ExternalDiagnosisListPage = () => {
  const { user } = useAuth();
  const studentNo = user?.loginId;

  const diagnosisMenu = [
    '진단검사 메뉴',
    { name: '진단검사 안내', link: '/diagnosis' },
    { name: '심리 진단검사', link: '/diagnosis/internal' },
    { name: '커리어넷 진단검사', link: '/external-diagnosis' },
    { name: '내 진단검사 결과', link: '/diagnosis/all-results' },
  ];

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center">
      {/* 상단 고정 영역 */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <UserTopBar />
        <MainHeader />
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="w-[62.6%] min-w-[62.6%] m-auto pt-[220px]">
        <div className="flex gap-6 pb-10">
          {/* 왼쪽 사이드바 */}
          <div className="shrink-0">
            <UserSideBar navItems={diagnosisMenu} />
          </div>

          {/* 오른쪽 메인 콘텐츠 */}
          <main className="flex-1 bg-white shadow-lg rounded-2xl p-8">
            <ExternalTestListFeature studentNo={studentNo} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ExternalDiagnosisListPage;
