import { useState, useEffect } from "react";

import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import ConsultKindSearchFilter from "../../../features/admin/consultation/ConsultKindSearchFilter";
import ConsultKindListTable from "../../../features/admin/consultation/ConsultKindListTable";
import ConsultKindForm from "../../../features/admin/consultation/ConsultKindForm";
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
                setTotal(result.data.dscsnKinds?.totalElements ?? 0);
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

    const hadleSave= async()=>{

    }

    const handleRowClick = async()=>{
        
    }
    return(
        <div>
            <AdminSectionHeader title="상담항목 관리" />
            <ConsultKindSearchFilter filters={filters} setFilters={setFilters} onSearch={handleSearch}/>
            <div className="flex pt-4 justify-between gap-3">
                <ConsultKindListTable
                    rows={data}
                    loading={loading}
                    onRowClick={handleRowClick}
                />
                <div className="flex-1 col-span-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-3 self-start sticky top-20">
                        <div className="flex justify-start space-x-3">
                            <button
                            className=" h-8 bg-white hover:bg-gray-500 text-blue-700 border-2 border-blue-700 font-medium px-2 py-1 rounded align-bottom"
                            // onClick={}
                            >신규
                            </button>
                            <button
                                className=" h-8 bg-blue-700 hover:bg-blue-800 text-white font-medium px-2 py-1 rounded align-bottom"
                                // onClick={}
                            >저장
                            </button>
                            <button
                                className=" h-8 bg-blue-700 hover:bg-blue-800 text-white font-medium px-2 py-1 rounded align-bottom"
                                // onClick={}
                            >삭제
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold text-gray-700">
                                테스트1{/* {mode === "create" ? "입학정보 입력" : selectedNo ? "기존 정보 수정" : "학생 정보"} */}
                            </div>
                            <ConsultKindForm />
                        </div>
                    </div>
                </div>
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