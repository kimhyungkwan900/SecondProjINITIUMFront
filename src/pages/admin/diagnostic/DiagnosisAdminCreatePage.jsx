import React, { useState } from 'react';
import DiagnosisForm from '../../../component/user/diagnostic/DiagnosisForm.jsx';
import { createAdminDiagnosticTest } from '../../../api/user/diagnostic/diagnosisAdminApi.jsx';
import Sidebar from '../../../layouts/admin/extracurricular/Sidebar.jsx';

const DiagnosisAdminCreatePage = () => {
  const [resetKey, setResetKey] = useState(0); // 🔹 폼 리셋을 위한 key

  const handleCreate = (dto) => {
    createAdminDiagnosticTest(dto)
      .then(() => {
        alert('검사 등록 완료');
        setResetKey(prev => prev + 1); // 🔹 폼 초기화 트리거
      })
      .catch((err) => {
        alert('등록 실패');
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* 콘텐츠 영역 */}
      <main className="flex-1 p-10 ml-64"> 
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-[#222E8D] mb-6 text-center">
            📌 새로운 검사 등록
          </h1>
          <DiagnosisForm key={resetKey} onSubmit={handleCreate} /> 
        </div>
      </main>
    </div>
  );
};

export default DiagnosisAdminCreatePage;
