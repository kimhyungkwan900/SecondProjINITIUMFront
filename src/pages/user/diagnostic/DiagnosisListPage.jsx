import React from 'react';
import { Link } from 'react-router-dom';
import DiagnosisListFeature from '../../../features/user/diagnostic/DiagnosisListFeature.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';

const DiagnosisListPage = () => {
  const studentNo = '1'; // 로그인 연동 후 수정 예정

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      {/* 상단 고정 헤더 */}
      <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
        <MainHeader />
      </div>

      {/* 콘텐츠 레이아웃 */}
      <div className="flex pt-24 pb-10 max-w-7xl mx-auto">
        {/* 왼쪽 사이드바 */}
        <aside className="w-64 bg-white shadow-lg rounded-2xl p-6 h-fit mr-6 sticky top-24">
          <h2 className="text-xl font-bold text-[#222E8D] mb-4">
            진단검사 메뉴
          </h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/diagnosis"
                className="block bg-[#28B8B2] text-white text-center py-2 rounded-lg font-medium hover:bg-[#1a807b] transition"
              >
                심리 진단검사
              </Link>
            </li>
            <li>
              <Link
                to="/external-diagnosis"
                className="block bg-[#28B8B2] text-white text-center py-2 rounded-lg font-medium hover:bg-[#1a807b] transition"
              >
                커리어넷 진단검사
              </Link>
            </li>
            <li>
              <Link
                to="/all-results"
                className="block bg-[#28B8B2] text-white text-center py-2 rounded-lg font-medium hover:bg-[#1a807b] transition"
              >
                내 진단검사 결과
              </Link>
            </li>
          </ul>
        </aside>

        {/* 오른쪽 메인 콘텐츠 */}
        <main className="flex-1 bg-white shadow-lg rounded-2xl p-8">
          <DiagnosisListFeature studentNo={studentNo} />
        </main>
      </div>
    </div>
  );
};

export default DiagnosisListPage;
