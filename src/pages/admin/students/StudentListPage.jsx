import { useState, useEffect, useCallback } from "react";
import TextInput from "../../../component/common/TextInput";
import PageButton from "../../../component/admin/extracurricular/PagaButton";
import { fetchStudents as fetchStudentsApi } from "../../../api/user/auth/studentsApi";
import CodeDisplay from "../../../component/common/CodeDisplay";

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
        console.log("🚀 [fetchStudents] 호출", { page: newPage, size: newSize, filters: f });
        try {
            const data = await fetchStudentsApi({
                ...f,
                page: newPage,
                size: newSize
            });
            console.log("✅ [API 응답]", data.content);

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
            {/* 검색/필터 UI */}
            <div className="flex mb-4 items-center gap-2">
                <TextInput
                    placeholder="학번"
                    value={filters.studentNo}
                    onChange={e => setFilters(f => ({ ...f, studentNo: e.target.value }))}
                    className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <TextInput
                    placeholder="이름"
                    value={filters.name}
                    onChange={e => setFilters(f => ({ ...f, name: e.target.value }))}
                    className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                    value={filters.studentStatusCode}
                    onChange={e => setFilters(f => ({ ...f, studentStatusCode: e.target.value }))}
                >
                    <option value="">전체</option>
                    <option value="10">재학</option>
                    <option value="20">휴학</option>
                    <option value="30">제적</option>
                    <option value="40">수료</option>
                    <option value="50">졸업</option>
                </select>
                <TextInput
                    placeholder="학과코드"
                    value={filters.schoolSubjectCode}
                    onChange={e => setFilters(f => ({ ...f, schoolSubjectCode: e.target.value }))}
                    className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    className="bg-[#222E8D] text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-800 transition"
                    onClick={handleSearch}
                    disabled={loading}
                >조회</button>
                <div className="flex items-center ml-auto">
                    <span className="mr-2 text-sm">표시개수</span>
                    <select
                        className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={size}
                        onChange={handleSizeChange}
                    >
                        {[10, 15, 20, 30, 50].map(n => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* 학생 목록 테이블 */}
            <table className="w-full text-center border-collapse">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">학번</th>
                        <th className="border px-2 py-1">이름</th>
                        <th className="border px-2 py-1">생년월일</th>
                        <th className="border px-2 py-1">성별</th>
                        <th className="border px-2 py-1">이메일</th>
                        <th className="border px-2 py-1">학적상태</th>
                        <th className="border px-2 py-1">학과코드</th>
                        <th className="border px-2 py-1">입학일자</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={8} className="text-gray-400 py-6">로딩 중...</td>
                        </tr>
                    ) : students.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="text-gray-400 py-6">데이터가 없습니다</td>
                        </tr>
                    ) : (
                        students.map((s, idx) => (
                            <tr key={s.studentNo || idx}>
                                <td className="border px-2 py-1">{s.studentNo}</td>
                                <td className="border px-2 py-1">{s.name}</td>
                                <td className="border px-2 py-1">{s.birthDate}</td>
                                <td className="border px-2 py-1">
                                    <CodeDisplay category="CO0001" code={s.genderCode} />
                                </td>
                                <td className="border px-2 py-1">{s.email}</td>
                                <td className="border px-2 py-1">
                                    <CodeDisplay category="studentStatus" code={s.studentStatusCode} />
                                </td>
                                <td className="border px-2 py-1">{s.schoolSubjectCode}</td>
                                <td className="border px-2 py-1">{s.admissionDate}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

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
