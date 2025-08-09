const baseUrl = "/admin";

const sidebarMenus = {
  "학사정보": [
    {
      label: "학사관리",
      children: [
        { label: "학적관리" },
        { label: "수강신청관리" }
      ]
    },
    {
      label: "교직원관리",
      children: [
        {
          label: "교수임용",
          to: `${baseUrl}/employee/appoint-professor`
        },
        {
          label: "강사임용",
          to: `${baseUrl}/employee/appoint-instructor`
        },
        {
          label: "교원임용",
          to: `${baseUrl}/employee/appoint-staff`
        },
      ]
    },
    {
      label: "학생관리",
      children: [
        {
          label: "학생명단조회",
          children: [{
            label: "학생명부조회",
            to: `${baseUrl}/students/student-list`
          }
          ]
        }
      ]
    },
    {
      label: "진단평가",
      children: [
        {
          label: "대시보드",
          to: `${baseUrl}/diagnosis/dashboard`
        },
        {
          label: "진단평가 생성",
          to: `${baseUrl}/diagnosis/create`
        },
        {
          label: "진단평가 목록",
          to: `${baseUrl}/diagnosis/list`
        }
      ]
    },
    {
      label: "핵심역량진단",
      children: [
        {
          label: "핵심역량진단평가",
          to: `${baseUrl}/coreCompetency/assessment`
        },
        {
          label: "핵심역량진단결과",
          to: `${baseUrl}/coreCompetency/assessment/result`
        }
      ]
    },
    { label: "상담관리" }
  ],
  "운영정보": [
    {
      label: "공통관리",
      children: [
        { label: "코드관리" },
        { label: "공통항목관리" }
      ]
    },
    {
      label: "권한관리"
    },
    {
      label: "부서정보관리"
    },
  ],
};

sidebarMenus["전체업무"] = [
  ...sidebarMenus["학사정보"],
  ...sidebarMenus["운영정보"],
];

export default sidebarMenus;
