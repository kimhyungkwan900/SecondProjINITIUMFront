export const studentMyPageMenus = [
    "마이페이지 (학생)",
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
            { name: "신청 비교과 프로그램", link: "/mypage/program/apply" },
            { name: "추천 비교과 프로그램", link: "/mypage/program/recommended" },
        ],
    },
    {
        name: "마일리지 현황",
        children: [
            { name: "나의 마일리지", link: "/mypage/mileage" },
            { name: "마일리지 장학금 신청", link: "/mypage/mileage/apply" },
            { name: "장학금 현황", link: "/mypage/mileage/status" },
        ],
    },
    { name: "학생상담센터 상담", link: "/consult" },
];
