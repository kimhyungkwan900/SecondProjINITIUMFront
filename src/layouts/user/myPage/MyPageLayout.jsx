import { Outlet } from "react-router-dom";
import UserSideBar from "../../../features/user/UserSideBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";

const MyPageLayout = ({ navItems }) => {

  return (
    <div className="min-h-screen bg-[#E0E7E9]">
      <UserTopBar />
      <MainHeader />
      <div className="flex w-full max-w-screen-xl mx-auto my-8 min-h-[80vh]">
        <UserSideBar navItems={navItems} defaultOpenKeys={["마이홈"]} />
        <main className="flex-1 px-10 py-8 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MyPageLayout;
