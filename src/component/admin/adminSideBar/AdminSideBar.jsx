import { useCallback, useState } from "react";
import AdminSidebarSearch from "./AdminSidebarSearch.jsx";
import AdminSidebarMenu from "./AdminSidebarMenu.jsx";

import { sidebarMenus } from "../../../constants/admin/adminSidebarMenus.js";

export default function AdminSidebar({
  selectedTopMenu,
  onNavigate,            // 모바일 드로어에서 leaf 클릭 시 닫기
  className = "",
}) {
  const [search, setSearch] = useState("");
  const menuList = sidebarMenus[selectedTopMenu || "전체업무"] || [];

  const handleContainerClick = useCallback(
    (e) => {
      if (!onNavigate) return;
      const el = e.target.closest("[data-nav]");
      if (el) onNavigate();
    },
    [onNavigate]
  );

  return (
    <nav
      role="navigation"
      aria-label="사이드바 메뉴"
      className={`flex h-full min-h-0 flex-col bg-[#f6f9fc] ${className}`}
      onClick={handleContainerClick}
    >
      <div className="sticky top-0 z-10 bg-[#f6f9fc] pt-8">
        <AdminSidebarSearch onSearch={setSearch} />
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-1">
        {menuList.length > 0 ? (
          <AdminSidebarMenu
            menuList={menuList}
            filter={search}
            onNavigate={onNavigate}
            wipStrategy="heading"
          />
        ) : (
          <div className="text-gray-400 text-center py-10">상단 메뉴를 선택하세요</div>
        )}
      </div>
    </nav>
  );
}