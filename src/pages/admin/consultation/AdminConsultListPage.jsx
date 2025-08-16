import { useState, useEffect } from "react";

import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import ConsultList from "../../../features/user/consultation/ConsultList";
import ConsultListSearchFilter from "../../../features/admin/consultation/ConsultListSearchFilter";
import ConsultListTable from "../../../features/admin/consultation/ConsultListTable";
import PageButton from "../../../component/admin/extracurricular/PagaButton";

import { getConsultList, applyCancel, } from "../../../api/user/consult/ConsultUserApi"

const PAGE_SIZE = 10;

const AdminConsultListPage = ()=>{

    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        dscsnType: '',
        empNo: '',
        subjectCode: '',
        studentStatusCode: '',
        studentNo: '',
        name: '',
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
                    sort: "consultDate,DESC",
                    ...appliedFilters,
                };
                const result = await getConsultList(params);
                console.log(result);
                setData(result.data.dscsnInfos?.content || []);
                setTotal(result.data.dscsnInfos?.totalElements ?? 0);
                // console.log(total)
            } catch (e) {
                alert("상담 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
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

    const handleCancel = async (dscsnInfoId) => {
        const isConfirmed = confirm("해당 상담을 취소하시겠습니까?");

        if (!isConfirmed) {
            return;
        }

        try {
            await applyCancel(dscsnInfoId);
        } catch (e) {
            alert(e.response.data.message);
        } finally {
            setRefreshKey((k) => k + 1);
        }
    };

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const handlePageChange = (newPage) => {
        setCurrent(newPage);
    };

    return(
        <div>
            <AdminSectionHeader title="상담현황 조회" />
            <ConsultListSearchFilter filters={filters} setFilters={setFilters} onSearch={handleSearch}/>
            <div className="pt-4">
                <ConsultListTable
                    rows={data}
                    loading={loading}
                    onCancel={handleCancel}
                />
            </div>

            <div className="mt-4 flex justify-center items-center">
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
export default AdminConsultListPage;