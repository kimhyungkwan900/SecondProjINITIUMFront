import { useState } from "react"
import ReactModal from "react-modal";
import CoreCompetencySideBar from "../../../features/user/UserSideBar";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import ConsultInfoDetail from "../../../features/user/consultation/ConsultInfoDetail";
import ConsultSatisfaction from "../../../features/user/consultation/ConsultSatisfaction";
import ConsultList from "../../../features/user/consultation/ConsultList";

const ConsultListPage = ()=>{
    const navItems = [
        "상담종합",
        {link: "/consult", name: "상담신청"},
        {link: "/consult/list", name: "상담내역"}
    ]

    const [filters, setFilters] = useState({
        dscsnStatus: '',
        dscsnType: '',
        startDate: '',
        endDate: '',
    });

    const [current, setCurrent] = useState(1);

    const [appliedFilters, setAppliedFilters] = useState(filters);

    const handleSearch = () => {
        setAppliedFilters(filters);
        setCurrent(1); // 첫 페이지로 초기화
    };

    const handlePageChange = (newPage) => {
        setCurrent(newPage);
    };

    return(
        <div className="bg-white min-h-screen border border-gray-300">
            <UserTopBar />
            <MainHeader />

            {/* 상단 회색 박스 */}
            <div className="bg-gray-100 px-12 py-10 border-b border-gray-300 flex justify-between items-center">
                <h1 className="text-3xl font-semibold">상담종합</h1>
                <div className="text-2xl text-gray-600">HOME &gt; 상담종합 &gt; 상담내역</div>
            </div>

            {/* 본문: 사이드바 + 콘텐츠 */}
            <div className="flex px-12 py-10">
                {/* 좌측 사이드바 */}
                <CoreCompetencySideBar navItems={navItems}/>

                {/* 우측 본문 콘텐츠 */}
                <div className="flex-1 ml-10 p-4">
                    <div className="flex justify-end items-center gap-2 mb-4">
                        <select
                            className="border border-gray-300 rounded px-2 py-1"
                            value={filters.dscsnStatus}
                            onChange={(e)=>setFilters({ ...filters, dscsnStatus: e.target.value })}
                            >
                            <option value={null}>-</option>
                            <option value="Waiting">예약대기</option>
                            <option value="Confirmed">예약완료</option>
                            <option value="Canceled">상담취소</option>
                            <option value="Completed">상담완료</option>
                        </select>
                        <select
                            className="border border-gray-300 rounded px-2 py-1"
                            value={filters.dscsnType}
                            onChange={(e)=>setFilters({ ...filters, dscsnType: e.target.value })}
                            >
                            <option value={null}>-</option>
                            <option value="A">지도교수상담</option>
                            <option value="C">진로취업상담</option>
                            <option value="P">심리상담</option>
                            <option value="L">학습상담</option>
                        </select>
                        <input 
                            type="date"
                            className="border border-gray-300 rounded px-2 py-1"
                            value={filters.startDate}
                            onChange={(e)=>setFilters({ ...filters, startDate: e.target.value })}
                        />
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-2 py-1"
                            value={filters.endDate}
                            onChange={(e)=>setFilters({ ...filters, endDate: e.target.value })}
                        />
                        <button
                            className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-4 py-1 rounded"
                            onClick={handleSearch}
                        >조회</button>
                    </div>

                    {/* 상담내역 리스트 */}
                    <ConsultList
                        searchFilters={appliedFilters}
                        current={current}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
}
export default ConsultListPage;