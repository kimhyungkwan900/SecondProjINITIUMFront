import React from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '../../../features/user/mainpage/MainHeader';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 고정 헤더 */}
      <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
        <MainHeader />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-col items-center justify-center pt-48 px-4 text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-600 mb-6 max-w-lg">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-[#28B8B2] text-white rounded-lg font-medium hover:bg-[#1a807b] transition"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
