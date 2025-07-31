import React from 'react';
import ExternalResultFeature from '../../../features/user/diagnostic/ExternalResultFeature.jsx';

const ExternalResultPage = () => {
  const studentNo = '1'; // 로그인한 학생 번호(형관님 파트)

  return (
    <div>
      <h1>외부 진단검사 결과 페이지</h1>
      <ExternalResultFeature studentNo={studentNo} />
    </div>
  );
};

export default ExternalResultPage;