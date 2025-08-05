import React from 'react';
import DiagnosisListFeature from '../../../features/user/diagnostic/DiagnosisListFeature.jsx';

const DiagnosisPage = () => {
  const studentNo = '1'; // 로그인한 학생 번호(형관님 파트)

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex justify-center items-start py-10">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-[#222E8D] mb-6 text-center">
          내부 진단검사 페이지
        </h1>
        <DiagnosisListFeature studentNo={studentNo} />
      </div>
    </div>
  );
};

export default DiagnosisPage;
