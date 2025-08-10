import { employeeMyPageMenus } from "../../../constants/user/employeeMyPageMenus";
import { studentMyPageMenus } from "../../../constants/user/studentMyPageMenus";
import MyPageLayout from "../../../layouts/user/myPage/MyPageLayout";
import StudentMyPageHome from "../../../pages/user/MyPage/StudentMyPageHome";
import NavigatorPage from "../../../pages/user/MyPage/NavigatorPage";
import StudentConsultListFullPage from "../../../pages/user/MyPage/StudentConsultListFullPage";
import EmployeeMyPageHome from "../../../pages/user/MyPage/EmployeeMyPageHome";
import StudentUpdateMyInfo from "../../../pages/user/MyPage/StudentUpdateMyInfo";
import RequireRole from "../../../component/common/Require/RequireRole";

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
          { path: "consult", element: <StudentConsultListFullPage /> } 
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
        ],
      },
    ],
  },
];
export default myPageRouter;