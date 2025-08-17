import { Outlet } from "react-router-dom";
import UserSideBar from "../../../features/user/UserSideBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";

const MyPageLayout = ({ navItems }) => {

  return (
    <div className="min-h-screen bg-[#E0E7E9]">
      <UserTopBar />
      <MainHeader />
      <div className="flex max-w-7xl mx-auto px-6 py-8 gap-6">
        <UserSideBar navItems={navItems} defaultOpenKeys={["마이홈"]} />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MyPageLayout;