// import { useState } from "react";

import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import ConsultList from "../../../features/user/consultation/ConsultList";
import ConsultListSearchFilter from "../../../features/admin/consultation/ConsultListSearchFilter";

const AdminConsultListPage = ()=>{

    // const [filters, setFilters] = useState({
    //     dscsnStatus: '',
    //     dscsnType: '',
    //     startDate: '',
    //     endDate: '',
    // });

    // const [current, setCurrent] = useState(1);

    // const [appliedFilters, setAppliedFilters] = useState(filters);

    // const handleSearch = () => {
    //     setAppliedFilters(filters);
    //     setCurrent(1); // 첫 페이지로 초기화
    // };

    // const handlePageChange = (newPage) => {
    //     setCurrent(newPage);
    // };

    return(
        <div>
            <AdminSectionHeader title="상담현황 조회" />
            <ConsultListSearchFilter/>
            {/* <div className="flex justify-end items-center gap-2 mb-4">
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
            
            <div className="pt-4">
                <ConsultList
                    searchFilters={appliedFilters}
                    current={current}
                    onPageChange={handlePageChange}
                />
            </div> */}
        </div>
    );
}
export default AdminConsultListPage;