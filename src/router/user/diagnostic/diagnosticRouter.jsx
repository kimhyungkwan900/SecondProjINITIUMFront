// src/router/user/diagnostic/diagnosticRouter.jsx
import React from 'react';
import HomePage from '../../../pages/user/diagnostic/HomePage';
import DiagnosisPage from '../../../pages/user/diagnostic/DiagnosisPage';
import DiagnosisResultPage from '../../../pages/user/diagnostic/DiagnosisResultPage';
import ExternalDiagnosisPage from '../../../pages/user/diagnostic/ExternalDiagnosisPage';
import AllResultsPage from '../../../pages/user/diagnostic/AllResultsPage';
import ExternalResultListPage from '../../../pages/user/diagnostic/ExternalResultListPage';
import DiagnosisAdminPage from '../../../pages/user/diagnostic/DiagnosisAdminPage';
import NotFoundPage from '../../../pages/user/diagnostic/NotFoundPage';

export const diagnosticRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/diagnosis', element: <DiagnosisPage /> },
  { path: '/diagnosis/result/:resultId', element: <DiagnosisResultPage /> },
  { path: '/external-diagnosis', element: <ExternalDiagnosisPage /> },
  { path: '/all-results', element: <AllResultsPage /> },
  { path: '/external-results', element: <ExternalResultListPage /> },
  { path: '/admin/diagnosis', element: <DiagnosisAdminPage /> },
  { path: '*', element: <NotFoundPage /> }
];
