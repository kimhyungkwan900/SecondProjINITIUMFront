import { useState } from "react";
import { Outlet } from "react-router-dom";

import UserTopBar from "../../component/user/mainpage/UserTopBar";
import MainHeader from "../../features/user/mainpage/MainHeader";
import UserSideBar from "../../features/user/UserSideBar";

const UserLayout = () => {
    const [navItems, setNavItems] = useState([]);

    return (
        <div className="min-h-screen bg-[#f6f9fc]">
            <header>
                <UserTopBar />
                <MainHeader />
            </header>
            <UserSideBar navItems={navItems} />
            <main>
                <Outlet context={{ setNavItems }} />
            </main>
        </div>
    );
};
export default UserLayout;