import { useCallback, useEffect, useMemo, useState } from "react";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import PageButton from "../../../component/admin/extracurricular/PagaButton";
import StudentListSearchFilter from "../../../features/admin/students/StudentListSearchFilter";
import StudentListTable from "../../../features/admin/students/StudentListTable";
import StudentListToolbar from "../../../component/admin/student/StudentListToolbar";
import { fetchStudents as fetchStudentsApi } from "../../../api/user/auth/studentsApi";

export default function StudentListPage() {
  const [filters, setFilters] = useState({
    studentNo: "",
    name: "",
    studentStatusCode: "",
    subjectCode: "",
  });
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedNo, setSelectedNo] = useState("");
  const [currentSort, setCurrentSort] = useState("studentNo,asc");

  const fetchStudents = useCallback(
    async (newPage = page, newSize = size, f = filters, sort = currentSort) => {
      setLoading(true);
      try {
        const data = await fetchStudentsApi({
          ...f,
          page: newPage,
          size: newSize,
          sort: sort,
        });
        setStudents(data.content || []);
        setTotalPages(data.totalPages || 1);
        setTotalElements(data.totalElements || 0);
        setPage(newPage);
      } catch (e) {
        console.error("[API 호출 실패]", e);
      } finally {
        setLoading(false);
      }
    },
    [page, size, filters, currentSort]
  );

  useEffect(() => {
    fetchStudents(page, size, filters, currentSort);
    // eslint-disable-next-line
  }, [page, size, filters, currentSort, fetchStudents]);

  const handleSearch = () => {
    fetchStudents(0, size, filters, currentSort);
    setPage(0);
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setSize(newSize);
    setPage(0);
  };

  const handleReset = () => {
    setFilters({
      studentNo: "",
      name: "",
      studentStatusCode: "",
      subjectCode: "",
    });
    setPage(0);
    setCurrentSort("studentNo,asc");
  };

  const handleRowClick = (studentNo) => {
    setSelectedNo(studentNo);
  };

  const handleSortChange = (sort) => {
    setCurrentSort(sort);
    setPage(0);
  };

  const hasSearchCondition = useMemo(
    () =>
      Object.entries(filters).some(
        ([, v]) => v !== "" && v !== null && v !== undefined
      ),
    [filters]
  );

  return (
    <div>
      <AdminSectionHeader title="학생목록" />

      <StudentListSearchFilter
        filters={filters}
        setFilters={setFilters}
        loading={loading}
        onEnterSearch={handleSearch} // 선택: Enter로 조회
      />
      <div className="pt-4">
        <StudentListTable
          rows={students}
          loading={loading}
          selectedNo={selectedNo}
          onRowClick={handleRowClick}
          onSortChange={handleSortChange}
          currentSort={currentSort}
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>

          <StudentListToolbar
            onSearch={handleSearch}
            size={size}
            onSizeChange={handleSizeChange}
            loading={loading}
            totalElements={totalElements}
            hasSearchCondition={hasSearchCondition}
            onReset={handleReset}
          />
        </div>
        <div />
        <PageButton
          totalPages={totalPages}
          currentPage={page + 1}
          onPageChange={(p) => setPage(p - 1)}
          disabled={loading}
          maxVisible={5}
        />
      </div>
    </div>
  );
}