import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSideBar from "../../../features/user/UserSideBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";

const MyPageLayout = () => {
  const [navItems, setNavItems] = useState([]);

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <UserTopBar />
      <MainHeader />
      <div className="flex w-full max-w-screen-xl mx-auto my-8 min-h-[80vh]">
        <UserSideBar navItems={navItems} defaultOpenKeys={["마이홈"]} />
        <main className="flex-1 px-10 py-8">
          {/* ✅ setNavItems 내려줌 */}
          <Outlet context={{ setNavItems }} />
        </main>
      </div>
    </div>
  );
};

export default MyPageLayout;
