//diagnosisRouter.jsx
import React from 'react';

import DiagnosisPage from '../../../pages/user/diagnostic/DiagnosisPage.jsx';
import DiagnosisResultPage from '../../../pages/user/diagnostic/DiagnosisResultPage.jsx';
import NotFoundPage from '../../../pages/user/diagnostic/NotFoundPage.jsx';

const diagnosisRouter = [
  {
    path: '/diagnosis',
    element: <DiagnosisPage />,
  },
  {
    path: '/diagnosis/result/:resultId',
    element: <DiagnosisResultPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default diagnosisRouter;