// src/router/index.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../../../pages/user/diagnostic/HomePage';
import DiagnosisPage from '../../../pages/user/diagnostic/DiagnosisPage';
import DiagnosisResult from '../../../component/user/diagnostic/DiagnosisResult';
import ExternalDiagnosisPage from '../../../pages/user/diagnostic/ExternalDiagnosisPage';
import AllResultsPage from '../../../pages/user/diagnostic/AllResultsPage';
import ExternalResultListPage from '../../../pages/user/diagnostic/ExternalResultListPage';
import DiagnosisAdminPage from '../../../pages/user/diagnostic/DiagnosisAdminPage';
import NotFoundPage from '../../../pages/user/diagnostic/NotFoundPage';



export const diagnosticRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/diagnosis',
    element: <DiagnosisPage />
  },
  {
    path: '/diagnosis/result/:resultId',
    element: <DiagnosisResult />
  },
  {
    path: '/external-diagnosis',
    element: <ExternalDiagnosisPage />
  },
  {
    path: '/all-results',
    element: <AllResultsPage />
  },
  {
    path: '/external-results',
    element: <ExternalResultListPage />
  },
  {
    path: '/admin/diagnosis',
    element: <DiagnosisAdminPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);
