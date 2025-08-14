const baseUrl = "/admin";

export const sidebarMenus = {
  "학사정보": [
    {
      label: "교직원관리",
      children: [
        { label: "교직원 조회(검색)", to: `${baseUrl}/employee/employee-list` },
        { label: "교직원 관리", to: `${baseUrl}/employee/employee-manage` },
      ],
    },
    {
      label: "학생관리",
      children: [
        { label: "학생 조회(검색)", to: `${baseUrl}/students/student-list` },
        { label: "학생 관리", to: `${baseUrl}/students/student-manage` },
      ],
    },
    {
      label: "진단평가",
      children: [
        { label: "대시보드", to: `${baseUrl}/diagnosis/dashboard` },
        { label: "진단평가 생성", to: `${baseUrl}/diagnosis/create` },
        { label: "진단평가 목록", to: `${baseUrl}/diagnosis/list` }
      ]
    },
    {
      label: "핵심역량진단",
      children: [
        { label: "핵심역량진단평가", to: `${baseUrl}/coreCompetency/assessment` },
        { label: "핵심역량진단결과", to: `${baseUrl}/coreCompetency/assessment/result` }
      ]
    },
    {
      label: "비교과프로그램",
      children: [
        { label: "분류 체계 관리", to: `${baseUrl}/extracurricular/cateogry` },
        { label: "프로그램 요청", to: `${baseUrl}/extracurricular/program/aplication` },
        { label: "프로그램 요청 관리", to: `${baseUrl}/extracurricular/program/request` },
        { label: "프로그램 신청 관리", to: `${baseUrl}/extracurricular/program/apply` },
        { label: "프로그램 출석 관리", to: `${baseUrl}/extracurricular/program/schedule` },
        { label: "프로그램 만족도 조회", to: `${baseUrl}/extracurricular/program/survey` }
      ]
    },
        {
      label: "마일리지",
      children: [
        { label: "항목 관리", to: `${baseUrl}/mileage/items` },
        { label: "실적 간편 등록", to: `${baseUrl}/mileage/perf/quick` },
        { label: "장학금 관리", to: `${baseUrl}/mileage/scholarship`},
        
      ]

    },
    { label: "상담관리",
      children: [
        {label: "상담일정 등록", to: `${baseUrl}/consult/manage`},
        {label: "상담 현황", to: `${baseUrl}/consult/list`},
        {label: "상담항목 관리", to: `${baseUrl}/consult/kind`},
      ]
     }
  ],
  "운영정보": [
    {
      label: "공통관리",
      children: [
        { label: "코드관리", to: `${baseUrl}/common/code` },
        { label: "공통항목관리", to: `${baseUrl}/common/items` },
      ],
    },
    {
      label: "권한관리",
      children: [
        { label: "역할 관리", to: `${baseUrl}/auth/roles` },
        { label: "사용자 권한", to: `${baseUrl}/auth/users` },
      ],
    },
    {
      label: "부서정보관리",
      children: [
        { label: "부서 목록", to: `${baseUrl}/dept/list` },
        { label: "부서 등록", to: `${baseUrl}/dept/create` },
      ],
    },
  ]
};

sidebarMenus["전체업무"] = [
  ...sidebarMenus["학사정보"],
  ...sidebarMenus["운영정보"],
];