import { useCallback, useEffect, useState } from "react";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import PageButton from "../../../component/admin/extracurricular/PageButton.jsx";
import EmployeeListSearchFilter from "../../../features/admin/employee/EmployeeListSearchFilter";
import EmployeeListTable from "../../../features/admin/employee/EmployeeListTable";
import { fetchEmployees as fetchEmployeesApi } from "../../../api/user/auth/employeesApi";
import AdminListToolbar from "../../../component/admin/AdminListToolbar";

export default function EmployeeListPage() {
  // 검색 조건 (EmployeeListSearchFilter가 사용하는 키와 일치)
  const [filters, setFilters] = useState({
    empNo: "",
    name: "",
    employeeStatus: "",
    subjectCode: "",
    gender: "",
    email: "",
  });

  // 페이지네이션/정렬
  const [page, setPage] = useState(0);          // 0-based (API)
  const [size, setSize] = useState(15);
  const [currentSort, setCurrentSort] = useState("empNo,asc");

  // 데이터 상태
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  // 선택(조회 전용: 선택만 표시)
  const [selectedNo, setSelectedNo] = useState("");

  // 목록 조회
  const fetchEmployees = useCallback(
    async (newPage = page, newSize = size, f = filters, sort = currentSort) => {
      setLoading(true);
      try {
        const data = await fetchEmployeesApi({
          ...f,
          page: newPage,
          size: newSize,
          sort,
        });
        setRows(data?.content || []);
        setTotalPages(data?.totalPages || 1);
        setTotalElements(data?.totalElements || 0);
        setPage(newPage);
      } catch (e) {
        console.error("[직원 목록 조회 실패]", e);
        setRows([]);
        setTotalPages(1);
        setTotalElements(0);
      } finally {
        setLoading(false);
      }
    },
    [page, size, filters, currentSort]
  );

  // 최초 및 의존값 변경 시 조회
  useEffect(() => {
    fetchEmployees(page, size, filters, currentSort);
    // eslint-disable-next-line
  }, [page, size, filters, currentSort, fetchEmployees]);

  // 핸들러들
  const handleSearch = () => {
    fetchEmployees(0, size, filters, currentSort);
    setPage(0);
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setSize(newSize);
    setPage(0);
  };

  const handleReset = () => {
    setFilters({
      empNo: "",
      name: "",
      employeeStatus: "",
      subjectCode: "",
      gender: "",
      email: "",
    });
    setPage(0);
    setCurrentSort("empNo,asc");
  };

  const handleRowClick = (empNo) => {
    setSelectedNo(empNo);
  };

  const handleSortChange = (sort) => {
    setCurrentSort(sort);
    setPage(0);
  };

  return (
    <div>
      <AdminSectionHeader title="직원목록" />

      <AdminListToolbar
        onSearch={handleSearch}
        onReset={handleReset}
        loading={loading}
      />

      {/* 검색 필터는 툴바 바로 아래에 위치 */}
      <EmployeeListSearchFilter
        filters={filters}
        setFilters={setFilters}
        loading={loading}
      />

      <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden">
        <EmployeeListTable
          rows={rows}
          loading={loading}
          selectedNo={selectedNo}
          onRowClick={handleRowClick}
          onSortChange={handleSortChange}
          currentSort={currentSort}
        />
        
        {/* 하단 컨트롤 영역 */}
        <div className="p-4 flex justify-between items-center border-t border-gray-200">
          {/* 왼쪽: 검색 결과 및 표시 개수 */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              검색결과: <b>{totalElements.toLocaleString()}</b>건
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-sm">표시개수</span>
              <select
                className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={size}
                onChange={handleSizeChange}
                disabled={loading}
              >
                {[15, 30, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 오른쪽: 페이지네이션 */}
          <PageButton
            totalPages={totalPages}
            currentPage={page + 1}
            onPageChange={(p) => setPage(p - 1)}
            disabled={loading}
            maxVisible={5}
          />
        </div>
      </div>
    </div>
  );
}