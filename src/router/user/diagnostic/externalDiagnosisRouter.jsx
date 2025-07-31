import React from 'react';

// 외부 진단검사 관련 페이지
import ExternalDiagnosisPage from '../../../pages/user/diagnostic/ExternalDiagnosisPage.jsx';
import ExternalResultPage from '../../../pages/user/diagnostic/ExternalResultPage.jsx';
import NotFoundPage from '../../../pages/user/diagnostic/NotFoundPage.jsx';

const externalDiagnosisRouter = [
  {
    path: '/external-diagnosis',
    element: <ExternalDiagnosisPage />,
  },
  {
    path: '/external-result',
    element: <ExternalResultPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default externalDiagnosisRouter;