export const employeeMyPageMenus = [
  "마이페이지 (교직원)",
  {
    name: "마이홈",
    children: [
      { name: "마이홈", link: "/mypage" },
      { name: "개인정보 수정", link: "/mypage/update-info" }
    ]
  },
  { name: "상담 이력 조회", link: "/mypage/consult" },
  {
    name: "비교과 프로그램 참여 현황",
    children: [
      { name: "참여 비교과 프로그램", link: "/mypage/program" },
      { name: "비교과 만족도 참여 현황", link: "/mypage/program/satisfaction" },
    ],
  },
];
