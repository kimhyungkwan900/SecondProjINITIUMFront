import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ExternalTestListFeature from '../../../features/user/diagnostic/ExternalTestListFeature.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';
import UserTopBar from '../../../component/user/mainpage/UserTopBar.jsx';
import { UserContext } from '../../../App.jsx';

const ExternalDiagnosisListPage = () => {
  const { user } = useContext(UserContext);
  const studentNo = user?.loginId;

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
        <aside className="w-64 rounded-xl shadow-lg px-4 py-6 h-fit mr-6 sticky top-48 
                 bg-gradient-to-b from-[#0d47a1] to-[#42a5f5]">
          <h2 className="text-lg font-bold text-center text-white border-b border-white pb-3 mb-4">
            진단검사 메뉴
          </h2>
          <ul className="flex flex-col items-center space-y-3 text-sm p-0 m-0">
            <li className="w-full">
              <Link
                to="/diagnosis/internal"
                className="block w-full mx-auto text-center py-2 rounded-lg font-medium
                           bg-white/10 text-white no-underline
                           hover:bg-white hover:!text-[#0d47a1] transition"
              >
                심리 진단검사
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/external-diagnosis"
                className="block w-full mx-auto text-center py-2 rounded-lg font-medium
                           bg-white/10 text-white no-underline
                           hover:bg-white hover:!text-[#0d47a1] transition"
              >
                커리어넷 진단검사
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/diagnosis/all-results"
                className="block w-full mx-auto text-center py-2 rounded-lg font-medium
                           bg-white/10 text-white no-underline
                           hover:bg-white hover:!text-[#0d47a1] transition"
              >
                내 진단검사 결과
              </Link>
            </li>
          </ul>
        </aside>

        {/* 오른쪽 메인 콘텐츠 */}
        <main className="flex-1 bg-white shadow-lg rounded-2xl p-8">
          <ExternalTestListFeature studentNo={studentNo} />
        </main>
      </div>
    </div>
  );
};

export default ExternalDiagnosisListPage;
