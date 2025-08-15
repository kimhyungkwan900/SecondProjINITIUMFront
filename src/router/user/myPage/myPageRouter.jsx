import { employeeMyPageMenus } from "../../../constants/user/employeeMyPageMenus";
import { studentMyPageMenus } from "../../../constants/user/studentMyPageMenus";
import MyPageLayout from "../../../layouts/user/myPage/MyPageLayout";
import StudentMyPageHome from "../../../pages/user/MyPage/StudentMyPageHome";
import NavigatorPage from "../../../pages/user/MyPage/NavigatorPage";
import StudentConsultListFullPage from "../../../pages/user/MyPage/StudentConsultListFullPage";
import EmployeeMyPageHome from "../../../pages/user/MyPage/EmployeeMyPageHome";
import StudentUpdateMyInfo from "../../../pages/user/MyPage/StudentUpdateMyInfo";
import RequireRole from "../../../component/common/Require/RequireRole";
import ExtracurricularProgramMyPage from "../../../pages/user/extracurricular/ExtracurricularProgramMyPage";
import MyMileagePage from "../../../pages/user/mileage/MyMileagePage";
import ScholarshipApplyPage from "../../../pages/user/mileage/ScholarshipApplyPage";
import ScholarshipStatusPage from "../../../pages/user/mileage/ScholarshipStatusPage";
import StudentRadarChart from "../../../component/admin/coreCompetency/result/StudentRadarChart";
import ExtracurricularProgramApplyPage from "../../../pages/user/extracurricular/ExtracurricularProgramApplyPage";
import EmployeeUpdateMyInfo from "../../../pages/user/MyPage/EmployeeUpdateMyInfo";
import StudentRecommandedProgram from "../../../pages/user/MyPage/StudentRecommandedProgram";
export const myPageRouter = [
  {
    path: "/mypage",
    element: <RequireRole allow={["S"]} />,
    children: [
      {
        element: <MyPageLayout navItems={studentMyPageMenus} />,
        children: [
          { index: true, element: <StudentMyPageHome /> },   
          { path: "update-info", element: <StudentUpdateMyInfo /> },  
          { path: "navigator", element: <NavigatorPage /> },      

          { path: "consult", element: <StudentConsultListFullPage /> },
          { path: "consult", element: <StudentRadarChart /> },

          { path: "program", element: <ExtracurricularProgramMyPage/>},
          { path: "program/apply", element: <ExtracurricularProgramApplyPage/>},
          { path: "program/recommended", element: <StudentRecommandedProgram />},
          
          { path: "mileage", element: <MyMileagePage /> },
          { path: "mileage/apply", element: <ScholarshipApplyPage /> },
          { path: "mileage/status", element: <ScholarshipStatusPage /> },
        ],
      },
    ],
  },
  {
    path: "/mypage/employee",
    element: <RequireRole allow={["E","A"]} />,
    children: [
      {
        element: <MyPageLayout navItems={employeeMyPageMenus} />,
        children: [
          { index: true, element: <EmployeeMyPageHome /> },
          { path: "update-info", element: <EmployeeUpdateMyInfo />},
        ],
      },
    ],
  },
];
export default myPageRouter;