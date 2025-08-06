import { Link, useLocation } from "react-router-dom";

const CoreCompetencySideBar = ({ navItems = [] }) => {
  const location = useLocation(); // 현재 URL 경로를 가져옴 (메뉴 활성화 상태 판단에 사용)

  return (
    // 사이드바 전체 영역: 고정 위치 + 배경 그라데이션 + 둥근 테두리 + 그림자
    <aside
      className="w-64 rounded-xl shadow-lg px-4 py-6 h-fit mr-6 sticky top-48 mt-10
                 bg-gradient-to-b from-[#0d47a1] to-[#42a5f5]"
    >
      {/* 사이드바 상단 제목 (navItems 배열의 첫 번째 항목 사용) */}
      <h2 className="text-lg font-bold text-center text-white border-b border-white pb-3 mb-4">
        {navItems[0]}
      </h2>

      {/* 메뉴 항목 리스트 (navItems 배열의 1번째부터 map 처리) */}
      <ul className="flex flex-col items-center space-y-3 text-sm p-0 m-0">
        {navItems.slice(1).map((item, idx) => {
          // 현재 페이지 경로와 메뉴 항목의 링크가 일치하면 활성화 상태
          const isActive = location.pathname === item.link;

          return (
            <li className="w-full" key={idx}>
              <Link
                to={item.link} // 이동할 경로
                className={`block w-full mx-auto text-center py-2 rounded-lg font-medium
                            no-underline transition
                            ${
                              isActive
                                ? // 현재 경로와 일치하면 강조된 스타일
                                  "bg-white text-[#0d47a1]"
                                : // 그렇지 않으면 hover 효과 및 흐린 배경
                                  "bg-white/10 text-white hover:bg-white hover:!text-[#0d47a1]"
                            }`}
              >
                {item.name} {/* 메뉴 이름 */}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default CoreCompetencySideBar;
