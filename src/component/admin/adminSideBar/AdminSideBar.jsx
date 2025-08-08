import { useState } from "react";
import AdminSidebarSearch from "./AdminSidebarSearch.jsx";
import AdminSidebarMenu from "./AdminSidebarMenu.jsx";

import sidebarMenus from "../../../constants/admin/adminSidebarMenus.js";

export default function AdminSidebar({ selectedTopMenu }) {
  const [search, setSearch] = useState("");

  const menuList = sidebarMenus[selectedTopMenu || "전체업무"] || [];

  return (
    <div className="pt-8 w-64 min-h-screen bg-[#f6f9fc] border-r border-gray-200 flex flex-col">
      <AdminSidebarSearch onSearch={setSearch} />
      <div className="flex-1 overflow-y-auto px-1">
        {menuList.length > 0 ? (
          <AdminSidebarMenu menuList={menuList} filter={search} />
        ) : (
          <div className="text-gray-400 text-center pt-10">상단 메뉴를 선택하세요</div>
        )}
      </div>
    </div>
  );
}
