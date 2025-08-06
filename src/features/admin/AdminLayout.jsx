import { useState } from "react";
import { Outlet } from "react-router-dom";
import IdleLogoutWatcher from "../../component/common/IdleLogoutWatcher";
import AdminHeader from "../../component/admin/adminSideBar/AdminHeader";
import AdminSidebar from "../../component/admin/adminSideBar/AdminSideBar";

export default function AdminLayout() {
    const [selectedTopMenu, setSelectedTopMenu] = useState("");

    return (
        <IdleLogoutWatcher>
            <div className="flex flex-col min-h-screen bg-[#f6f9fc]">
                <AdminHeader
                    selectedTopMenu={selectedTopMenu}
                    onMenuChange={setSelectedTopMenu}
                />
                <div className="flex flex-1">
                    <div className="w-64 border-r border-gray-200 bg-white">
                        <AdminSidebar selectedTopMenu={selectedTopMenu} />
                    </div>
                    <main className="flex-1 p-6 bg-[#f6f9fc] overflow-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </IdleLogoutWatcher >
    );
}