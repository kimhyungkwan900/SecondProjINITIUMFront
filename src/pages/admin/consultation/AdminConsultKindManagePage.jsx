import { useState, useEffect } from "react";

import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import ConsultKindSearchFilter from "../../../features/admin/consultation/ConsultKindSearchFilter";
import ConsultKindListTable from "../../../features/admin/consultation/ConsultKindListTable";
import PageButton from "../../../component/admin/extracurricular/PagaButton";

import { findDscsnKind } from "../../../api/admin/consult/ConsultAdminApi"
 
const PAGE_SIZE = 10;

const AdminConsultKindManagePage = ()=>{

    const [filters, setFilters] = useState({
        dscsnKindId: '',
        dscsnKindName: '',
        dscsnTypeName: '',
    });
    
    const [current, setCurrent] = useState(1);
    const [appliedFilters, setAppliedFilters] = useState(filters);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async ()=>{
            setLoading(true);
            try {
                const params = {
                    page: current-1, // 0부터 시작
                    size: PAGE_SIZE,
                    ...appliedFilters,
                };
                const result = await findDscsnKind(params);
                console.log(result);
                setData(result.data.dscsnKinds?.content || []);
                setTotal(result.data.dscsnKinds?.numberOfElements ?? 0);
                // console.log(total)
            } catch (e) {
                alert("항목 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
                setData([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [appliedFilters, current, refreshKey]);

    const handleSearch = () => {
        setAppliedFilters(filters);
        setCurrent(1); // 첫 페이지로 초기화
    };
    
    const totalPages = Math.ceil(total / PAGE_SIZE);

    const handlePageChange = (newPage) => {
        setCurrent(newPage);
    };

    return(
        <div>
            <AdminSectionHeader title="상담항목 관리" />
            <ConsultKindSearchFilter filters={filters} setFilters={setFilters} onSearch={handleSearch}/>
            <div className="pt-4">
                <ConsultKindListTable
                    rows={data}
                    loading={loading}
                />
            </div>

            <div className="mt-4 flex justify-between items-center">
                <PageButton
                    totalPages={totalPages}
                    currentPage={current}
                    onPageChange={handlePageChange}
                    disabled={loading}
                    maxVisible={5}
                />
            </div>
        </div>
    );
}
export default AdminConsultKindManagePage;