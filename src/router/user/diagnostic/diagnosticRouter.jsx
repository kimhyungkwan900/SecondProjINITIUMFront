// src/router/user/diagnostic/diagnosticRouter.jsx
import HomePage from '../../../pages/user/diagnostic/HomePage';
import DiagnosisResultPage from '../../../pages/user/diagnostic/DiagnosisResultPage';
import AllResultsPage from '../../../pages/user/diagnostic/AllResultsPage';
import ExternalResultListPage from '../../../pages/user/diagnostic/ExternalResultListPage';
import DiagnosisConductPage from '../../../pages/user/diagnostic/DiagnosisConductPage';
import DiagnosisListPage from '../../../pages/user/diagnostic/DiagnosisListPage';
import ExternalDiagnosisListPage from '../../../pages/user/diagnostic/ExternalDiagnosisListPage';
import ExternalDiagnosisConductPage from '../../../pages/user/diagnostic/ExternalDiagnosisConductPage';
import DiagnosisAdminEditPage from '../../../pages/admin/diagnostic/DiagnosisAdminEditPage';

export const diagnosticRoutes = [
  // 홈
  { path: '/diagnosis', element: <HomePage /> },

  // ✅ 내부 진단검사
  { path: '/diagnosis/internal', element: <DiagnosisListPage /> },            // 내부 검사 목록
  { path: '/diagnosis/internal/:testId', element: <DiagnosisConductPage /> }, // 내부 검사 실시
  { path: '/diagnosis/internal/result/:resultId', element: <DiagnosisResultPage /> }, // 내부 검사 결과
  { path: "/admin/diagnosis/edit/:id", element: <DiagnosisAdminEditPage />},

  // ✅ 외부 진단검사
  { path: '/external-diagnosis', element: <ExternalDiagnosisListPage /> }, // 외부 검사 목록
  { path: '/external-diagnosis/conduct/:testId', element: <ExternalDiagnosisConductPage /> }, // 외부 검사 실시
  { path: '/external-results', element: <ExternalResultListPage /> }, // 외부 검사 전체 결과 페이지

  // ✅ 전체 결과
  { path: '/diagnosis/all-results', element: <AllResultsPage /> },

];

