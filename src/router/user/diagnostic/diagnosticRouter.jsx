// src/router/user/diagnostic/diagnosticRouter.jsx
import React from 'react';
import HomePage from '../../../pages/user/diagnostic/HomePage';
import DiagnosisResultPage from '../../../pages/user/diagnostic/DiagnosisResultPage';
import AllResultsPage from '../../../pages/user/diagnostic/AllResultsPage';
import ExternalResultListPage from '../../../pages/user/diagnostic/ExternalResultListPage';
import NotFoundPage from '../../../pages/user/diagnostic/NotFoundPage';
import DiagnosisConductPage from '../../../pages/user/diagnostic/DiagnosisConductPage';
import DiagnosisListPage from '../../../pages/user/diagnostic/DiagnosisListPage';
import ExternalDiagnosisListPage from '../../../pages/user/diagnostic/ExternalDiagnosisListPage';
import ExternalDiagnosisConductPage from '../../../pages/user/diagnostic/ExternalDiagnosisConductPage';
import DiagnosisAdminCreatePage from '../../../pages/admin/diagnostic/DiagnosisAdminCreatePage';
import DiagnosisAdminListPage from '../../../pages/admin/diagnostic/DiagnosisAdminListPage';
import DiagnosisAdminDashboardPage from '../../../pages/admin/diagnostic/DiagnosisAdminDashboardPage';
import RequireAdmin from '../../../component/admin/RequireAdmin';

export const diagnosticRoutes = [
  // 홈
  { path: '/diagnosis', element: <HomePage /> },

  // ✅ 내부 진단검사
  { path: '/diagnosis/internal', element: <DiagnosisListPage /> },            // 내부 검사 목록
  { path: '/diagnosis/internal/:testId', element: <DiagnosisConductPage /> }, // 내부 검사 실시
  { path: '/diagnosis/internal/result/:resultId', element: <DiagnosisResultPage /> }, // 내부 검사 결과

  // ✅ 외부 진단검사
  { path: '/external-diagnosis', element: <ExternalDiagnosisListPage /> }, // 외부 검사 목록
  { path: '/external-diagnosis/conduct/:testId', element: <ExternalDiagnosisConductPage /> }, // 외부 검사 실시
  { path: '/external-results', element: <ExternalResultListPage /> }, // 외부 검사 전체 결과 페이지

  // ✅ 전체 결과
  { path: '/diagnosis/all-results', element: <AllResultsPage /> },

  // 404
  { path: '*', element: <NotFoundPage /> }
];

