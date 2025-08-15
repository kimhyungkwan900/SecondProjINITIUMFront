import { useCallback, useEffect, useState } from "react";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import PageButton from "../../../component/admin/extracurricular/PageButton.jsx";
import StudentListSearchFilter from "../../../features/admin/students/StudentListSearchFilter";
import StudentListTable from "../../../features/admin/students/StudentListTable";
import { fetchStudents as fetchStudentsApi } from "../../../api/user/auth/studentsApi";
import AdminListToolbar from "../../../component/admin/AdminListToolbar";

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
    async (newPage, newSize, f, sort) => {
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
    []
  );

  useEffect(() => {
    fetchStudents(page, size, filters, currentSort);
    // eslint-disable-next-line
  }, [page, size, filters, currentSort]); // fetchStudents를 종속성에서 제거

  const handleSearch = () => {
    // 검색 시 항상 첫 페이지부터 조회
    setPage(0);
    fetchStudents(0, size, filters, currentSort);
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setSize(newSize);
    setPage(0); // 사이즈 변경 시 첫 페이지로
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
    setPage(0); // 정렬 변경 시 첫 페이지로
  };

  return (
    <div>
      <AdminSectionHeader title="학생목록" />
      <AdminListToolbar
        onSearch={handleSearch}
        onReset={handleReset}
        loading={loading}
      />
      <StudentListSearchFilter
        filters={filters}
        setFilters={setFilters}
        loading={loading}
        onEnterSearch={handleSearch}
      />

      <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden">
        <StudentListTable
          rows={students}
          loading={loading}
          selectedNo={selectedNo}
          onRowClick={handleRowClick}
          onSortChange={handleSortChange}
          currentSort={currentSort}
        />

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