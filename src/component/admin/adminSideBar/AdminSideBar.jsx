import LogoHeader from "../../common/auth/logoHeader.jsx";
import { useState } from "react";
import AdminSidebarSearch from "./AdminSidebarSearch.jsx";
import AdminSidebarMenu from "./AdminSidebarMenu.jsx";

// 각 상단 메뉴에 따른 메뉴 데이터 분기
// 기존 sidebarMenus 정의
const sidebarMenus = {
  "학사정보": [
    {
      label: "학사관리",
      children: [
        { label: "학적관리" },
        { label: "수강신청관리" }
      ]
    },
    { label: "교수정보관리" }
  ],
  "행정정보": [
    {
      label: "공통관리",
      children: [
        { label: "코드관리" },
        { label: "공통항목관리" }
      ]
    },
    { label: "부서정보관리" }
  ],
  "시스템운영": [
    { label: "권한관리" },
    { label: "로그관리" }
  ],
  "학생지원": [
    {
      label: "학생관리",
      children: [
        {
          label: "학생명단조회",
          children: [{
            label: "학생명부조회",
            to: "/admin/students/student-list"
          }
          ]
        }
      ]
    },
    { label: "장학관리" },
    { label: "상담관리" }
  ],
  "즐겨찾기": [
    { label: "즐겨찾는 메뉴1" },
    { label: "즐겨찾는 메뉴2" }
  ]
};

// "전체업무" 메뉴 자동 생성
sidebarMenus["전체업무"] = [
  ...sidebarMenus["학사정보"],
  ...sidebarMenus["행정정보"],
  ...sidebarMenus["시스템운영"],
  ...sidebarMenus["학생지원"],
  ...sidebarMenus["즐겨찾기"]
];

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
