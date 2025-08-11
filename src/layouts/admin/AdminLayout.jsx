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
            <div className="flex flex-col min-h-screen bg-[#f6f9fc]">
                <AdminHeader
                    selectedTopMenu={selectedTopMenu}
                    onMenuChange={setSelectedTopMenu}
                    onOpenSidebar={openSidebar}
                />

                <div className="flex flex-1">
                    {/* 데스크톱 사이드바 */}
                    <aside className="hidden md:block w-64 border-r border-gray-200 bg-white">
                        <AdminSidebar selectedTopMenu={selectedTopMenu} />
                    </aside>

                    {/* 메인 */}
                    <main className="flex-1 p-4 md:p-6 bg-[#f6f9fc] overflow-y-auto">
                        <Outlet />
                    </main>
                </div>

                {/* 모바일 오프캔버스 사이드바 */}
                <div className="md:hidden">
                    {/* 오버레이 */}
                    <div
                        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 ${mobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                        onClick={closeSidebar}
                        aria-hidden="true"
                    />
                    {/* 드로어 */}
                    <aside
                        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[80%] bg-white shadow-xl transition-transform duration-200
            ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                        role="dialog"
                        aria-modal="true"
                        aria-label="사이드바 메뉴"
                    >
                        <div className="flex items-center justify-between h-14 px-4 border-b">
                            <span className="font-semibold">메뉴</span>
                            <button
                                type="button"
                                onClick={closeSidebar}
                                className="inline-flex items-center justify-center w-9 h-9 rounded hover:bg-gray-100"
                                aria-label="사이드바 닫기"
                            >
                                <svg viewBox="0 0 24 24" className="w-6 h-6">
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        {/* 헤더 56px 제외한 전체 스크롤 영역 */}
                        <div className="h-[calc(100%-56px)] overflow-y-auto">
                            <AdminSidebar
                                selectedTopMenu={selectedTopMenu}
                                onNavigate={closeSidebar}  // leaf 클릭 시에만 닫힘
                            />
                        </div>
                    </aside>
                </div>
            </div>
        </IdleLogoutWatcher>
    );
}