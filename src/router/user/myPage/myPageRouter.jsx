import MyPageLayout from "../../../layouts/user/myPage/MyPageLayout";
import MyPageHome from "../../../pages/user/MyPage/MyPageHome";
import NavigatorPage from "../../../pages/user/MyPage/NavigatorPage";
import StudentConsultListFullPage from "../../../pages/user/MyPage/StudentConsultListFullPage";

const myPageRouter = [
  {
    path: "/mypage",
    element: <MyPageLayout />,
    children: [
      { path: "", element: <MyPageHome /> },
      { path: "navigator", element: <NavigatorPage /> },
      { path: "consult", element: <StudentConsultListFullPage />}
    ],
  },
];

export default myPageRouter;