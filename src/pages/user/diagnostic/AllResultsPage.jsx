import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InternalResultsFeature from '../../../features/user/diagnostic/InternalResultsFeature.jsx';
import ExternalResultsFeature from '../../../features/user/diagnostic/ExternalResultsFeature.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';
import UserTopBar from '../../../component/user/mainpage/UserTopBar.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import UserSideBar from '../../../features/user/UserSideBar.jsx';
import SectionTitle from '../../../component/common/SectionTitle.jsx';

const AllResultsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const studentNo = user?.loginId;

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

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
        <div className="flex gap-6">
          {/* 왼쪽 사이드바 */}
          <UserSideBar navItems={diagnosisMenu} />

          {/* 오른쪽 메인 컨텐츠 */}
          <main className="flex-1 bg-white shadow-lg rounded-2xl p-8 space-y-8">
            <h1 className="text-3xl font-bold text-[#222E8D] text-center">
              나의 진단검사 결과
            </h1>

            {/* 내부 진단검사 결과 */}
            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
              <InternalResultsFeature studentNo={studentNo} />
            </section>

            {/* 외부 진단검사 결과 */}
            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <SectionTitle size={22} showDivider>커리어넷 진단검사 결과</SectionTitle>
              </div>
              <ExternalResultsFeature studentNo={studentNo} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AllResultsPage;
