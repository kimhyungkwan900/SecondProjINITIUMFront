import React from 'react';
import ExternalTestListFeature from '../../../features/user/diagnostic/ExternalTestListFeature.jsx';

const ExternalDiagnosisPage = () => {
  const studentNo = '1'; // 형관님 파트

  return (
    <div>
      <h1>외부 진단검사 페이지</h1>
      <ExternalTestListFeature studentNo={studentNo} />
    </div>
  );
};

export default ExternalDiagnosisPage;