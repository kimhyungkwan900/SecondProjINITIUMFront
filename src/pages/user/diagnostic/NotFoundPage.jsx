import React from 'react';
import { Link } from 'react-router-dom';
import UserTopBar from '../../../component/user/mainpage/UserTopBar';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      {/* 상단 고정 헤더 */}
      <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
        <UserTopBar />
      </div>

      {/* 콘텐츠 영역 (헤더 높이 보정) */}
      <div className="flex flex-col items-center justify-center pt-60 pb-10 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full text-center">
          <h1 className="text-6xl font-extrabold text-[#222E8D] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            요청하신 페이지가 존재하지 않거나 경로가 변경되었을 수 있습니다. 
            아래 버튼을 클릭하여 홈으로 돌아가 주세요.
          </p>
          <Link
            to="/"
            className="block w-full bg-[#28B8B2] text-white text-center py-3 rounded-lg font-medium hover:bg-[#1a807b] transition"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
