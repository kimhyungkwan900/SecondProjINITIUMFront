import React, { useState } from 'react';
import DiagnosisForm from '../../../component/user/diagnostic/DiagnosisForm.jsx';
import { createAdminDiagnosticTest } from '../../../api/user/diagnostic/diagnosisAdminApi.jsx';

const DiagnosisAdminCreatePage = () => {
  const [resetKey, setResetKey] = useState(0); // 폼 리셋용 key

  const handleCreate = (dto) => {
    createAdminDiagnosticTest(dto)
      .then(() => {
        alert('검사 등록 완료');
        setResetKey(prev => prev + 1); // 폼 초기화
      })
      .catch((err) => {
        alert('등록 실패');
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* 메인 콘텐츠 */}
      <main className="flex-1 ml-64 p-8">
        {/* 제목 */}
        <h1 className="font-extrabold text-2xl text-gray-700 mb-2">
          <span className="inline-block w-1 h-5 bg-[#222E8D] mr-3 align-middle"></span>
          새로운 검사 등록
        </h1>
        <hr className="border-gray-300 mb-6" />

        {/* 등록 폼 */}
        <div className="max-w-4xl">
          <DiagnosisForm key={resetKey} onSubmit={handleCreate} />
        </div>
      </main>
    </div>
  );
};

export default DiagnosisAdminCreatePage;
