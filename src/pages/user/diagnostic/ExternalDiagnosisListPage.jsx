import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ExternalTestListFeature from '../../../features/user/diagnostic/ExternalTestListFeature.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';
import UserTopBar from '../../../component/user/mainpage/UserTopBar.jsx';
import { UserContext } from '../../../App.jsx';
import UserSideBar from '../../../features/user/UserSideBar.jsx';

const ExternalDiagnosisListPage = () => {
  const { user } = useContext(UserContext);
  const studentNo = user?.loginId;

  const diagnosisMenu = [
    '진단검사 메뉴',
    { name: '심리 진단검사', link: '/diagnosis/internal' },
    { name: '커리어넷 진단검사', link: '/external-diagnosis' },
    { name: '내 진단검사 결과', link: '/diagnosis/all-results' },
  ];

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      {/* 상단 고정 헤더 */}
      <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
        <UserTopBar />
        <MainHeader />
      </div>

      {/* 콘텐츠 레이아웃 */}
      <div className="flex pt-60 pb-10 max-w-7xl mx-auto">
        {/* 왼쪽 사이드바 */}
        <UserSideBar navItems={diagnosisMenu} />

        {/* 오른쪽 메인 콘텐츠 */}
        <main className="flex-1 bg-white shadow-lg rounded-2xl p-8">
          <ExternalTestListFeature studentNo={studentNo} />
        </main>
      </div>
    </div>
  );
};

export default ExternalDiagnosisListPage;
