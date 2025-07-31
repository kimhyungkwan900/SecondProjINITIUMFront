import React from 'react';
import ExternalTestListFeature from '../../../features/user/diagnostic/ExternalTestListFeature.jsx';

const ExternalDiagnosisPage = () => {
  const studentNo = '20250001'; // 로그인한 학생 번호

  return (
    <div>
      <h1>외부 진단검사 페이지</h1>
      <ExternalTestListFeature studentNo={studentNo} />
    </div>
  );
};

export default ExternalDiagnosisPage;