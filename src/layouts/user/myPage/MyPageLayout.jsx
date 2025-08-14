import { Outlet } from "react-router-dom";
import UserSideBar from "../../../features/user/UserSideBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";

const MyPageLayout = ({ navItems }) => {

  return (
    <div className="min-h-screen bg-[#E0E7E9]">
      <UserTopBar />
      <MainHeader />
      <div className="page-container">
        <UserSideBar navItems={navItems} defaultOpenKeys={["마이홈"]} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MyPageLayout;