export const studentMyPageMenus = [
    "마이페이지 (학생)",
    {
        name: "마이홈",
        children: [
            { name: "마이홈", link: "/mypage" },
            { name: "개인정보 수정", link: "/mypage/update-info" }
        ]
    },
    { name: "학생성공 네비게이터", link: "/mypage/navigator" },
    { name: "상담 이력 조회", link: "/mypage/consult" },
    {
        name: "비교과 프로그램 참여 현황",
        children: [
            { name: "참여 비교과 프로그램", link: "/mypage/program" },
            { name: "관심 비교과 프로그램", link: "/mypage/program/interest" },
            { name: "추천 비교과 프로그램", link: "/mypage/program/recommended" },
            { name: "비교과 만족도 참여 현황", link: "/mypage/program/satisfaction" },
            { name: "사전 사후 참여 현황", link: "/mypage/program/after-photo" },
            { name: "포인트 현황", link: "/mypage/program/point-status" },
        ],
    },
    {
        name: "통합 및 개별 이수증",
        children: [
            { name: "비교과 프로그램 이수증 발급", link: "/mypage/issuance/extracurricular" },
            { name: "진단평가 이수증 발급", link: "/mypage/issuance/diagnostic" },
        ],
    },
    { name: "자기주도 활동 등록·현황", link: "/mypage/activity-registration" },
    { name: "학생상담센터 상담", link: "/mypage/consult/1" },
];
