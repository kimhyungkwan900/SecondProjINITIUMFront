// src/router/user/diagnostic/diagnosticRouter.jsx
import React from 'react';
import HomePage from '../../../pages/user/diagnostic/HomePage';
import DiagnosisResultPage from '../../../pages/user/diagnostic/DiagnosisResultPage';
import AllResultsPage from '../../../pages/user/diagnostic/AllResultsPage';
import ExternalResultListPage from '../../../pages/user/diagnostic/ExternalResultListPage';
import DiagnosisAdminPage from '../../../pages/user/diagnostic/DiagnosisAdminPage';
import NotFoundPage from '../../../pages/user/diagnostic/NotFoundPage';
import DiagnosisConductPage from '../../../pages/user/diagnostic/DiagnosisConductPage';
import DiagnosisListPage from '../../../pages/user/diagnostic/DiagnosisListPage';
import ExternalDiagnosisListPage from '../../../pages/user/diagnostic/ExternalDiagnosisListPage';
import ExternalDiagnosisConductPage from '../../../pages/user/diagnostic/ExternalDiagnosisConductPage';

export const diagnosticRoutes = [
  // 홈
  { path: '/diagnosis-home', element: <HomePage /> },

  // ✅ 내부 진단검사
  { path: '/diagnosis', element: <DiagnosisListPage /> },            // 내부 검사 목록
  { path: '/diagnosis/:testId', element: <DiagnosisConductPage /> }, // 내부 검사 실시
  { path: '/diagnosis/result/:resultId', element: <DiagnosisResultPage /> }, // 내부 검사 결과

  // ✅ 외부 진단검사
  { path: '/external-diagnosis', element: <ExternalDiagnosisListPage /> }, // 외부 검사 목록
  { path: '/external-diagnosis/conduct/:testId', element: <ExternalDiagnosisConductPage /> }, // 외부 검사 실시
  { path: '/external-results', element: <ExternalResultListPage /> }, // 외부 검사 전체 결과 페이지

  // ✅ 전체 결과
  { path: '/all-results', element: <AllResultsPage /> },

  // ✅ 관리자
  { path: '/admin/diagnosis', element: <DiagnosisAdminPage /> },

  // 404
  { path: '*', element: <NotFoundPage /> }
];

