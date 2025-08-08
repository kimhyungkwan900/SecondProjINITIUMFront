import RequireAdmin from "../../component/admin/RequireAdmin";
import AdminLayout from "../../layouts/admin/AdminLayout";
import AdminMainPage from "../../pages/admin/adminMainPage";
import AdminCoreCompetencyAssessment from "../../pages/admin/coreCompetency/assessment/AdminCoreCompetencyAssessment";
import AdminCoreCompetencyResult from "../../pages/admin/coreCompetency/result/AdminCoreCompetencyResult";
import DiagnosisAdminCreatePage from "../../pages/admin/diagnostic/DiagnosisAdminCreatePage";
import DiagnosisAdminDashboardPage from "../../pages/admin/diagnostic/DiagnosisAdminDashboardPage";
import DiagnosisAdminListPage from "../../pages/admin/diagnostic/DiagnosisAdminListPage";
import StudentListPage from "../../pages/admin/students/StudentListPage";


const adminMainRouter = [
  {
    path: "/admin",
    element: <RequireAdmin />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          // 학생
          { path: "", element: <AdminMainPage /> },
          { path: "students/student-list", element: <StudentListPage /> },

          // 진단평가
          { path: 'diagnosis/dashboard', element: <DiagnosisAdminDashboardPage /> },
          { path: 'diagnosis/create', element: <DiagnosisAdminCreatePage /> },
          { path: 'diagnosis/list', element: <DiagnosisAdminListPage /> },

          // 핵심역량진단
          { path: "coreCompetency/assessment", element: <AdminCoreCompetencyAssessment /> },
          { path: "coreCompetency/assessment/result", element: <AdminCoreCompetencyResult /> }
        ]
      }
    ]
  }
];

export default adminMainRouter;