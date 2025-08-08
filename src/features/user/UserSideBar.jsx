import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const UserSideBar = ({ navItems = [], defaultOpenKeys = [] }) => {
  const location = useLocation(); // 현재 URL 경로를 가져옴 (메뉴 활성화 상태 판단에 사용)
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

  // 현재 경로 기준으로 어떤 메뉴가 활성인지 계산
  const activePath = location.pathname;
  const isItemActive = (item) => {
    if (item.link) return item.link === activePath;
    if (Array.isArray(item.children)) {
      return item.children.some((c) => c.link === activePath);
    }
    return false;
  };

  // 라우트 변경 시, 활성 자식이 있는 부모는 자동 오픈
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

  return (
    <aside
      className="w-64 rounded-xl shadow-lg px-4 py-6 h-fit mr-6 sticky top-48 mt-10
                 bg-gradient-to-b from-[#0d47a1] to-[#42a5f5]"
    >
      <h2 className="text-lg font-bold text-center text-white border-b border-white pb-3 mb-4">
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
                  className={`block w-full mx-auto text-center py-2 rounded-lg font-medium no-underline transition
                    ${active ? "bg-white text-[#0d47a1]" : "bg-white/10 text-white hover:bg-white hover:!text-[#0d47a1]"}`}
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
                className={`w-full mx-auto text-center py-2 rounded-lg font-bold transition select-none
                   ${active || open ? "bg-white text-[#0d47a1]" : "bg-white/10 text-white hover:bg-white hover:!text-[#0d47a1]"}`}
              >
                <span className="inline-flex items-center gap-2">
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
                              className={`block w-full mx-auto text-center py-2 rounded-lg font-medium no-underline transition
                                ${childActive ? "bg-white text-[#0d47a1]" : "bg-white/10 text-white hover:bg-white hover:!text-[#0d47a1]"}`}
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
