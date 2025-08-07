import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";

export default function AdminHeader({ selectedTopMenu, onMenuChange }) {
  const { user } = useContext(UserContext);

  const menuList = [
    "학사정보", "행정정보", "경영정보", "시스템운영", "학생지원", "전체업무", "즐겨찾기"
  ];

  return (
    <header className="flex items-end justify-between h-24 px-8 bg-white shadow-md">
      {/* 로고와 학교명 */}
      <Link to="/admin" className="flex items-center pb-2 no-underline text-current">
        <img src="/Logo/Logo.png" alt="로고" className="h-12 mr-4" />
        <div>
          <div className="font-bold text-xl text-[#222E8D]">충남도립대학교</div>
          <div className="text-sm text-gray-500">Chungnam State University</div>
        </div>
      </Link>

      {/* 메뉴와 사용자 정보 컨테이너 */}
      <div className="flex items-baseline flex-1 ml-12">
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

        {/* 사용자정보 */}
        <div className="flex items-center space-x-4 text-[#222E8D]">
          <span>{user?.name ?? "사용자"}님</span>
          <button className="px-3 py-1 bg-gray-100 rounded-md text-sm font-semibold hover:bg-gray-200 transition">시간연장</button>
        </div>
      </div>
    </header>
  );
}
