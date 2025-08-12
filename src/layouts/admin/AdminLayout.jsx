import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import IdleLogoutWatcher from "../../component/common/IdleLogout/IdleLogoutWatcher";
import AdminHeader from "../../component/admin/adminSideBar/AdminHeader";
import AdminSidebar from "../../component/admin/adminSideBar/AdminSideBar";

export default function AdminLayout() {
  const [selectedTopMenu, setSelectedTopMenu] = useState("전체업무");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setMobileSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setMobileSidebarOpen(false), []);

  return (
    <IdleLogoutWatcher>
      <div className="flex min-h-screen flex-col bg-[#f6f9fc]">
        {/* 상단 헤더: 스티키 + 분리선/그림자 */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <AdminHeader
            selectedTopMenu={selectedTopMenu}
            onMenuChange={setSelectedTopMenu}
            onOpenSidebar={openSidebar}
          />
        </div>

        <div className="flex flex-1">
          {/* 데스크톱 사이드바 */}
          <aside className="hidden md:block w-64 bg-white border-r border-gray-200 shadow-sm">
            <div className="h-full overflow-y-auto">
              <AdminSidebar selectedTopMenu={selectedTopMenu} />
            </div>
          </aside>

          {/* 메인 영역: 가이드 컨테이너 폭/여백 적용 */}
          <main className="flex-1 bg-[#f6f9fc]">
            <div className="max-w-7xl mx-auto px-6 pb-10">
              {/* Outlet 내부에서 AdminSectionHeader 사용 (가이드의 Outlet 안쪽 헤더 규칙) */}
              <Outlet />
            </div>
          </main>
        </div>

        {/* 모바일 오프캔버스 사이드바 */}
        <div className="md:hidden">
          {/* 오버레이 */}
          <div
            className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 ${
              mobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={closeSidebar}
            aria-hidden="true"
          />
          {/* 드로어 */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[80%] bg-white border-r border-gray-200 shadow-xl transition-transform duration-200 ${
              mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="사이드바 메뉴"
          >
            <div className="flex h-14 items-center justify-between px-4 border-b">
              <span className="font-semibold text-gray-800">메뉴</span>
              <button
                type="button"
                onClick={closeSidebar}
                className="inline-flex h-9 w-9 items-center justify-center rounded hover:bg-gray-100"
                aria-label="사이드바 닫기"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="h-[calc(100%-56px)] overflow-y-auto">
              <AdminSidebar
                selectedTopMenu={selectedTopMenu}
                onNavigate={closeSidebar} // leaf 클릭 시 닫기
              />
            </div>
          </aside>
        </div>
      </div>
    </IdleLogoutWatcher>
  );
}
