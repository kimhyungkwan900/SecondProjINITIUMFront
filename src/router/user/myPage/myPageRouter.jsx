import MyPageLayout from "../../../layouts/user/myPage/MyPageLayout";
import MyPageHome from "../../../pages/user/MyPage/MyPageHome";
import NavigatorPage from "../../../pages/user/MyPage/NavigatorPage";
import StudentParticipatedProgramList from "../../../features/user/students/StudentParticipatedProgramList";

const myPageRouter = [
  {
    path: "/mypage",
    element: <MyPageLayout />,
    children: [
      { path: "", element: <MyPageHome /> },
      { path: "navigator", element: <NavigatorPage /> },
    ],
  },
];

export default myPageRouter;