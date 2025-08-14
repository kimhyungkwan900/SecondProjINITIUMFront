import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const UserSideBar = ({ navItems = [], defaultOpenKeys = [] }) => {
  const location = useLocation(); // 현재 URL 경로
  const [openKeys, setOpenKeys] = useState(new Set(defaultOpenKeys));

  // 첫 항목은 제목으로 사용
  const title = typeof navItems[0] === "string" ? navItems[0] : navItems[0]?.title || "메뉴";
  const items = navItems.slice(1);

  const menuVariants = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  const toggleOpen = (key) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // 현재 경로 기준 메뉴 활성화 계산
  const activePath = location.pathname;
  const isItemActive = (item) => {
    if (item.link) return item.link === activePath;
    if (Array.isArray(item.children)) {
      return item.children.some((c) => c.link === activePath);
    }
    return false;
  };

  // 라우트 변경 시, 활성 자식이 있는 부모 자동 오픈
  useEffect(() => {
    const next = new Set(openKeys);
    items.forEach((item, idx) => {
      const key = item.key ?? item.name ?? `menu-${idx}`;
      if (Array.isArray(item.children) && isItemActive(item)) {
        next.add(key);
      }
    });
    setOpenKeys(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePath]);

  // 메뉴 아이템 스타일 정의 (첫 번째 테마 적용)
  const baseStyle = "block w-full mx-auto text-center py-2 rounded-lg font-medium no-underline transition";
  const activeStyle = "bg-[#E0E7E9] text-[#354649]";
  // hover 시 글자색이 우선 적용되도록 '!' 추가
  const inactiveStyle = "bg-white/10 text-white hover:bg-[#E0E7E9] hover:!text-[#354649]";


  return (
    <aside
      // 사이드바 배경색 적용 (사용자 지정 그라데이션 유지)
      className="w-64 rounded-xl shadow-lg px-4 py-6 h-fit mr-4 sticky top-48 mt-10 bg-gradient-to-b from-[#6C7A89] to-[#A3C6C4]"
    >
      {/* 제목 텍스트 및 테두리 색상 적용 */}
      <h2 className="text-lg font-bold text-center text-white border-b border-white/50 pb-3 mb-4">
        {title}
      </h2>

      <ul className="flex flex-col items-center space-y-3 text-sm p-0 m-0 w-full">
        {items.map((item, idx) => {
          const key = item.key ?? item.name ?? `menu-${idx}`;
          const hasChildren = Array.isArray(item.children) && item.children.length > 0;
          const active = isItemActive(item);
          const open = openKeys.has(key);

          // 단일 링크 항목
          if (!hasChildren) {
            return (
              <li className="w-full" key={key}>
                <Link
                  to={item.link}
                  className={`${baseStyle} ${active ? activeStyle : inactiveStyle}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          }

          // 드롭다운 항목
          return (
            <li className="w-full" key={key}>
              <button
                type="button"
                onClick={() => toggleOpen(key)}
                className={`${baseStyle} w-full select-none ${active || open ? activeStyle : inactiveStyle}`}
              >
                <span className="inline-flex items-center justify-center gap-2 w-full">
                  {item.name}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    <path fill="currentColor" d="M7 10l5 5 5-5z" />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    className="overflow-hidden"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={menuVariants}
                    transition={{ duration: 0.2 }}
                  >
                    <ul className="mt-2 space-y-2">
                      {item.children.map((child, cIdx) => {
                        const childActive = child.link === activePath;
                        return (
                          <li className="w-full" key={`${key}-child-${cIdx}`}>
                            <Link
                              to={child.link}
                              className={`${baseStyle} ${childActive ? activeStyle : inactiveStyle}`}
                            >
                              {child.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default UserSideBar;
