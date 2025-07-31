//DiagnosisPage.jsx
import React from 'react';
import DiagnosisListFeature from '../../../features/user/diagnostic/DiagnosisListFeature.jsx';

const DiagnosisPage = () => {
  const studentNo = '1'; // 로그인한 학생 번호(형관님 파트)

  return (
    <div>
      <h1>내부 진단검사 페이지</h1>
      <DiagnosisListFeature studentNo={studentNo} />
    </div>
  );
};

export default DiagnosisPage;