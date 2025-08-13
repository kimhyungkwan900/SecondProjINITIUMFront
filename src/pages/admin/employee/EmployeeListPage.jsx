import { useCallback, useEffect, useMemo, useState } from "react";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import PageButton from "../../../component/admin/extracurricular/PagaButton";
import EmployeeListSearchFilter from "../../../features/admin/employee/EmployeeListSearchFilter";
import EmployeeListTable from "../../../features/admin/employee/EmployeeListTable";
import EmployeeListToolBar from "../../../features/admin/employee/EmployeeListToobar";
import { fetchEmployees as fetchEmployeesApi } from "../../../api/user/auth/employeesApi";

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

  // 조건 배지
  const hasSearchCondition = useMemo(
    () =>
      Object.entries(filters).some(
        ([, v]) => v !== "" && v !== null && v !== undefined
      ),
    [filters]
  );

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

      {/* 상단 검색 필터 (학생 페이지와 동일 구조) */}
      <EmployeeListSearchFilter
        filters={filters}
        setFilters={setFilters}
        loading={loading}
        // onEnterSearch를 쓰고 싶다면 컴포넌트에 해당 prop 추가 후 여기서 handleSearch 전달
      />

      {/* 목록 */}
      <div className="pt-4">
        <EmployeeListTable
          rows={rows}
          loading={loading}
          selectedNo={selectedNo}
          onRowClick={handleRowClick}
          onSortChange={handleSortChange}
          currentSort={currentSort}
        />
      </div>

      {/* 하단 툴바 + 페이지네이션 (학생 페이지와 동일 배치) */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <EmployeeListToolBar
            onSearch={handleSearch}
            size={size}
            onSizeChange={handleSizeChange}
            loading={loading}
            totalElements={totalElements}
            hasSearchCondition={hasSearchCondition}
            onReset={handleReset}
            // onCreate 미전달: 조회 전용
          />
        </div>
        <div />
        <PageButton
          totalPages={totalPages}
          currentPage={page + 1}           // PageButton은 1-based
          onPageChange={(p) => setPage(p - 1)}
          disabled={loading}
          maxVisible={5}
        />
      </div>
    </div>
  );
}