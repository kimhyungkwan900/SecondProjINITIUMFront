import { useState, useEffect, useCallback } from "react";
import PageButton from "../../../component/admin/extracurricular/PagaButton";
import { fetchStudents as fetchStudentsApi } from "../../../api/user/auth/studentsApi";
import AdminSectionHeader from "../../../component/admin/AdminSectionHeader";
import StudentListTable from "../../../features/admin/students/StudentListTable";
import StudentListSearchFilter from "../../../features/admin/students/StudentListSearchFilter";

export default function StudentListPage() {
    const [filters, setFilters] = useState({
        studentNo: "",
        name: "",
        studentStatusCode: "",
        schoolSubjectCode: ""
    });
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(15);
    const [students, setStudents] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);

    // 학생 조회 함수
    const fetchStudents = useCallback(async (newPage = page, newSize = size, f = filters) => {
        setLoading(true);
        console.log("[fetchStudents] 호출", { page: newPage, size: newSize, filters: f });
        try {
            const data = await fetchStudentsApi({
                ...f,
                page: newPage,
                size: newSize
            });
            console.log("[API 응답]", data.content);

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
    }, [page, size, filters]);

    // 페이지/사이즈/필터 바뀔 때마다 호출
    useEffect(() => {
        fetchStudents(page, size, filters);
        // eslint-disable-next-line
    }, [page, size, filters, fetchStudents]);

    // 검색 버튼 클릭
    const handleSearch = () => {
        fetchStudents(0, size, filters);
        setPage(0);
    };

    // 표시개수 변경
    const handleSizeChange = (e) => {
        const newSize = parseInt(e.target.value, 10);
        setSize(newSize);
        setPage(0);
    };

    return (
        <div>
            <AdminSectionHeader title="학생목록" />
            {/* 검색/필터 UI */}
            <StudentListSearchFilter
                filters={filters}
                setFilters={setFilters}
                handleSearch={handleSearch}
                size={size}
                handleSizeChange={handleSizeChange}
                loading={loading}
            />
            <div>
                <StudentListTable students={students} loading={loading} />
            </div>
            {/* 페이지네이션 */}
            <div className="mt-4 flex justify-between items-center">
                <div>
                    검색결과: <b>{totalElements}</b>건
                </div>
                <PageButton
                    totalPages={totalPages}
                    currentPage={page + 1}
                    onPageChange={(p) => {
                        setPage(p - 1);
                    }}
                />
            </div>
        </div>
    );
}
