import { useState } from "react";
import MainLogo from "../../../component/user/mainpage/MainLogo";
import NavMenuHorizontalDropdown from "../../../component/user/mainpage/NavMenuHorizontalDropdown";

export default function MainHeader() {
    const [hoveredIdx, setHoveredIdx] = useState(null);
    const NAV_ITEMS = [
        {
            label: "비교과 프로그램",
            submenu: [
                { label: "전체", to: "/programs/all" },
                { label: "신청가능", to: "/programs/available" },
                { label: "마감임박", to: "/programs/close" },
                { label: "지난프로그램", to: "/programs/past" },
            ],
        },
        {
            label: "핵심역량",
            submenu: [
                { label: "핵심역량안내", to: "/competency/notice"},
                { label: "핵심역량진단", to: "/competency/coreCompentency" },
            ],
        },
        {
            label: "설문조사",
            submenu: [
                { label: "만족도", to: "/survey/satisfaction" },
                { label: "참여후기", to: "/survey/review" },
                { label: "기타설문", to: "/survey/other" },
            ],
        },
        {
            label: "게시판",
            submenu: [
                { label: "공지사항", to: "/board/notice" },
                { label: "Q&A", to: "/board/qna" },
                { label: "자료실", to: "/board/data" },
            ],
        },
    ];
    return (
        <header className="w-full shadow bg-white">
            <div className="flex items-center justify-between px-8 py-3 max-w-7xl mx-auto">
                <MainLogo />
                <nav className="flex gap-8 relative">
                    {NAV_ITEMS.map((item, idx) => (
                        <div
                            key={item.label}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            className="relative"
                        >
                            <button className="font-semibold text-lg text-[#222E8D] hover:text-[#28B8B2] transition">
                                {item.label}
                            </button>
                            <NavMenuHorizontalDropdown
                                submenu={item.submenu}
                                visible={hoveredIdx === idx}
                            />
                        </div>
                    ))}
                </nav>
            </div>
        </header>
    );
}