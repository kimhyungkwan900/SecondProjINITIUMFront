import { useCallback, useEffect, useMemo, useState } from "react";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import PageButton from "../../../component/admin/extracurricular/PagaButton";
import StudentListSearchFilter from "../../../features/admin/students/StudentListSearchFilter";
import StudentListTable from "../../../features/admin/students/StudentListTable";
import StudentListToolbar from "../../../features/admin/students/StudentListToolbar";
import { fetchStudents as fetchStudentsApi } from "../../../api/user/auth/studentsApi";

export default function StudentListPage() {
  const [filters, setFilters] = useState({
    studentNo: "",
    name: "",
    studentStatusCode: "",
    schoolSubjectCode: "",
  });
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchStudents = useCallback(
    async (newPage = page, newSize = size, f = filters) => {
      setLoading(true);
      try {
        const data = await fetchStudentsApi({
          ...f,
          page: newPage,
          size: newSize,
        });
        setStudents(data.content || []);
        setTotalPages(data.totalPages || 1);
        setTotalElements(data.totalElements || 0);
        setPage(newPage);
      } catch (e) {
        console.error("[API 호출 실패]", e);
        alert("조회에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    },
    [page, size, filters]
  );

  useEffect(() => {
    fetchStudents(page, size, filters);
    // eslint-disable-next-line
  }, [page, size, filters, fetchStudents]);

  const handleSearch = () => {
    fetchStudents(0, size, filters);
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
      schoolSubjectCode: "",
    });
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

      <StudentListToolbar
        onSearch={handleSearch}
        size={size}
        onSizeChange={handleSizeChange}
        loading={loading}
        totalElements={totalElements}
        hasSearchCondition={hasSearchCondition}
        onReset={handleReset}
      />

      <div>
        <StudentListTable students={students} loading={loading} />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div />
        <PageButton
          totalPages={totalPages}
          currentPage={page + 1}
          onPageChange={(p) => setPage(p - 1)}
          disabled={loading}
        />
      </div>
    </div>
  );
}