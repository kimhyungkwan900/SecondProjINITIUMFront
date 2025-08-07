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

export default sidebarMenus;
