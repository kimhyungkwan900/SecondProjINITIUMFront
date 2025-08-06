import React from 'react';
import Sidebar from '../../../layouts/admin/extracurricular/Sidebar';

const DiagnosisAdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#f6f9fc] flex">
      {/* 관리자 사이드바 */}
      <Sidebar />

      {/* 콘텐츠 영역 */}
      <main className="flex-1 ml-64 flex items-center justify-center">
        {/* 🔹 중앙 정렬을 위해 flex + items-center + justify-center */}
        <div className="bg-white shadow-lg rounded-2xl p-10 max-w-4xl w-full mx-auto">
          <h1 className="text-3xl font-bold text-[#222E8D] mb-6 text-center">
            진단검사 관리자 기능 안내
          </h1>

          <p className="text-gray-700 leading-relaxed mb-4">
            관리자 페이지에서는 학생들에게 제공되는 진단검사를 효율적으로 등록하고 관리할 수 있습니다. 아래는 제공되는 주요 기능들입니다.
          </p>

          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              <strong>📝 진단검사 등록:</strong> 새 심리검사를 등록할 수 있습니다.
            </li>
            <li>
              <strong>📋 진단검사 목록 확인:</strong> 등록된 모든 진단검사들을 조회하고 삭제할 수 있습니다.
            </li>
            <li>
              <strong>📊 결과 통계 확인:</strong> 검사 결과를 기반으로 한 학생들의 통계 데이터를 시각화하여 확인할 수 있습니다.
            </li>
            <li>
              <strong>📥 결과 PDF 출력:</strong> 학생 개별 결과를 PDF로 저장 및 출력할 수 있습니다.
            </li>
            <li>
              <strong>🔍 검색 및 필터링:</strong> 검사명, 활성화 여부 등을 기준으로 진단검사를 빠르게 검색할 수 있습니다.
            </li>
          </ul>

          <p className="text-sm text-gray-500 mt-6 text-center">
            좌측 사이드바에서 원하는 기능을 선택하여 진단검사 관리 업무를 시작하세요.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DiagnosisAdminDashboardPage;
