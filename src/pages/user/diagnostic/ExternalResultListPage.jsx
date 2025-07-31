import React from 'react';
import ExternalResultsFeature from '../../../features/user/diagnostic/ExternalResultsFeature.jsx';

const ExternalResultListPage = () => {
  const studentNo = '1'; // 로그인한 학생 번호(형관님 파트)

  return (
    <div>
      <h1>외부 진단검사 전체 결과 페이지</h1>
      <ExternalResultsFeature studentNo={studentNo} />
    </div>
  );
};

export default ExternalResultListPage;