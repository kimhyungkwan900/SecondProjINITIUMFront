import { useContext, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import LogoHeader from "../../common/auth/logoHeader";
import { useIdleLogout } from "../../common/IdleLogout/IdleLogoutContext";
import { logout } from "../../../api/user/auth/loginApi";
import LinkedButton from "../../common/LinkedButton";

function formatRemain(ms) {
  const totalSec = Math.ceil(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function AdminHeader({ selectedTopMenu, onMenuChange }) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { remainingMs, resetTimer } = useIdleLogout();

  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = useCallback(() => setMobileOpen(v => !v), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const menuList = useMemo(() => ["학사정보", "운영정보", "전체업무"], []);

  return (
    <header className="relative bg-white shadow-md">
      {/* 상단 바 */}
      <div className="flex items-center justify-between h-16 md:h-24 px-4 md:px-8">
        {/* 로고: 공용 컴포넌트 사용 */}
        <LogoHeader
          variant="inline"
          logoSrc="/Logo/Logo.png"
          schoolName="TeamINITIUM"
          englishName="TeamINITIUM"
          logoLink="/admin"
          imgClassName="h-10 md:h-12"
          className="pb-0"
        />

        {/* 데스크톱: 상단 메뉴 + 유틸 */}
        <div className="hidden md:flex items-center flex-1 ml-12">
          {/* 상단 메뉴 */}
          <nav className="flex-1">
            <ul className="flex space-x-8 font-bold text-[#222E8D]">
              {menuList.map(menu => (
                <li
                  key={menu}
                  className={`cursor-pointer transition-colors pb-2 ${
                    menu === selectedTopMenu
                      ? "text-[#28B8B2] border-b-4 border-[#28B8B2]"
                      : "hover:text-[#28B8B2]"
                  }`}
                  onClick={() => onMenuChange(menu)}
                >
                  {menu}
                </li>
              ))}
            </ul>
          </nav>

          {/* 유틸(우측) */}
          <div className="flex items-center space-x-4 text-[#222E8D]">
            <LinkedButton to="/">메인 페이지 이동</LinkedButton>
            <span>{user?.name ?? "사용자"}님</span>
            <span className={`text-sm px-2 py-1 rounded bg-gray-100 ${remainingMs <= 120000 ? "text-red-600" : ""}`}>
              남은시간 {formatRemain(remainingMs)}
            </span>
            <button
              onClick={resetTimer}
              className="px-3 py-1 bg-gray-100 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
              title="자동 로그아웃 타이머를 초기화합니다"
            >
              시간연장
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-gray-100 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* 모바일: 햄버거 버튼 */}
        <button
          type="button"
          onClick={toggleMobile}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100"
          aria-controls="admin-mobile-panel"
          aria-expanded={mobileOpen}
          aria-label="메뉴 열기"
        >
          {/* 햄버거/닫기 아이콘 (SVG) */}
          {mobileOpen ? (
            <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-6 h-6"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          )}
        </button>
      </div>

      {/* 모바일 드롭다운 패널 */}
      <div
        id="admin-mobile-panel"
        className={`md:hidden absolute inset-x-0 top-full z-50 border-t bg-white shadow-md transition-[opacity,transform] duration-200 ${
          mobileOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* 메뉴 */}
        <nav className="px-4 py-3">
          <ul className="space-y-2 font-bold text-[#222E8D]">
            {menuList.map(menu => (
              <li key={menu}>
                <button
                  className={`w-full text-left px-3 py-2 rounded ${
                    menu === selectedTopMenu ? "bg-[#e9fbfa] text-[#28B8B2]" : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    onMenuChange(menu);
                    closeMobile();
                  }}
                >
                  {menu}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 유틸 */}
        <div className="px-4 pb-4 space-y-3 text-[#222E8D] border-t">
          <div className="flex items-center justify-between">
            <span className="font-medium">{user?.name ?? "사용자"}님</span>
            <LinkedButton to="/" onClick={closeMobile}>메인가기</LinkedButton>
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-sm px-2 py-1 rounded bg-gray-100 ${remainingMs <= 120000 ? "text-red-600" : ""}`}>
              남은시간 {formatRemain(remainingMs)}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => { resetTimer(); }}
                className="px-3 py-1 bg-gray-100 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
              >
                시간연장
              </button>
              <button
                onClick={async () => { await handleLogout(); }}
                className="px-3 py-1 bg-gray-100 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}