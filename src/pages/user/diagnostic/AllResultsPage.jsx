// src/pages/user/diagnostic/AllResultsPage.jsx
import React from 'react';
import InternalResultsFeature from '../../../features/user/diagnostic/InternalResultsFeature.jsx';
import ExternalResultsFeature from '../../../features/user/diagnostic/ExternalResultsFeature.jsx';

const AllResultsPage = () => {
  const studentNo = '20250001'; // 로그인된 학생 번호 (형관님 파트)

  return (
    <div>
      <h1>나의 진단검사 결과</h1>
      <InternalResultsFeature studentNo={studentNo} />
      <ExternalResultsFeature studentNo={studentNo} />
    </div>
  );
};

export default AllResultsPage;
