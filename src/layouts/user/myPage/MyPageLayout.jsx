import { Outlet } from "react-router-dom";
import UserSideBar from "../../../features/user/UserSideBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";

const navItems = [
  "마이페이지 (학생)",
  {
    name: "마이홈",
    link: "/mypage",
  },
  {
    name: "학생성공 네비게이터",
    link: "/mypage/navigator",
  },
  {
    name: "상담이력조회",
    link: "/mypage/consult"
  },
  {
    name: "비교과 프로그램 참여현황",
    children: [
      {
        name: "참여 비교과 프로그램",
        link: "/mypage/program",
      },
      {
        name: "관심 비교과 프로그램",
        link: "/mypage/program/interest",
      },
      {
        name: "추천 비교과 프로그램",
        link: "/mypage/program/recommended",
      },
      {
        name: "비교과 만족도 참여현황",
        link: "/mypage/program/satisfaction",
      },
      {
        name: "사진사후 참여현황",
        link: "/mypage/program/after-photo",
      },
      {
        name: "포인트 현황 조회",
        link: "/mypage/program/point-status",
      },
    ],
  },
  {
    name: "통합 및 개별 이수증",
    children: [
      {
        name: "비교과프로그램 이수증발급",
        link: "/mypage/issuance/extracurricular",
      },
      {
        name: "진단평가 이수증발급",
        link: "/mypage/issuance/diagnostic",
      },
    ],
  },
  {
    name: "자기주도활동 등록 및 현황",
    link: "/mypage/activity-registration",
  },
  {
    name: "학생상담센터 상담",
    link: "/mypage/consult/1",
  },
];

const MyPageLayout = () => {
  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <UserTopBar />
      <MainHeader />
      <div className="flex w-full max-w-screen-xl mx-auto my-8 min-h-[80vh]">
        <UserSideBar navItems={navItems} />
        <main className="flex-1 px-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MyPageLayout;
