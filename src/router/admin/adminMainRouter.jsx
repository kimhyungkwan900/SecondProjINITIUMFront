import RequireRole from "../../component/common/Require/RequireRole";
import AdminLayout from "../../layouts/admin/AdminLayout";
import AdminMainPage from "../../pages/admin/adminMainPage";
import AdminCoreCompetencyAssessment from "../../pages/admin/coreCompetency/assessment/AdminCoreCompetencyAssessment";
import AdminCoreCompetencyResult from "../../pages/admin/coreCompetency/result/AdminCoreCompetencyResult";
import DiagnosisAdminCreatePage from "../../pages/admin/diagnostic/DiagnosisAdminCreatePage";
import DiagnosisAdminDashboardPage from "../../pages/admin/diagnostic/DiagnosisAdminDashboardPage";
import DiagnosisAdminListPage from "../../pages/admin/diagnostic/DiagnosisAdminListPage";
import StudentListPage from "../../pages/admin/students/StudentListPage";

import ExtracurricularCategoryPage from "../../pages/admin/Extracurricular/ExtracurricularCategoryPage";
import ExtracurricularProgramAplicationPage from "../../pages/admin/Extracurricular/ExtracurricularProgramAplicationPage";
import ExtracurricularProgramRequestPage from "../../pages/admin/Extracurricular/ExtracurricularProgramReqeustPage";
import ExtracurricularProgramApplyPage from "../../pages/admin/Extracurricular/ExtracurricularProgramApplyPage";

const adminMainRouter = [
  {
    path: "/admin",
    element: <RequireRole allow={["A"]} />,
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
          { path: "coreCompetency/assessment/result", element: <AdminCoreCompetencyResult /> },

          // 프로그램
          { path : "extracurricular/cateogry", element : <ExtracurricularCategoryPage/>},
          { path : "extracurricular/program/aplication", element : <ExtracurricularProgramAplicationPage/> },
          { path : "extracurricular/program/request", element : <ExtracurricularProgramRequestPage/>},
          { path : "extracurricular/program/apply", element : <ExtracurricularProgramApplyPage/>}
        ]
      }
    ]
  }
];

export default adminMainRouter;