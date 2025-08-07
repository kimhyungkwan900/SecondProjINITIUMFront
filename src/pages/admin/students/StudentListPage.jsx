import { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "../../../component/common/TextInput";
import PageButton from "../../../component/admin/extracurricular/PagaButton";
import GenderDisplay from "../../../component/common/GenderDisplay";
import StudentStatusDisplay from "../../../component/common/StudentStatusDisplay";

export default function StudentListPage() {
    const [filters, setFilters] = useState({
        studentNo: "",
        name: "",
        status: "",
        schoolSubjectCode: ""
    });
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(15); // 기본 페이지 사이즈
    const [students, setStudents] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(false);

    // 최초 로딩 시 학생 목록 조회
    useEffect(() => {
        fetchStudents();
    }, []);

    // 조회
    const fetchStudents = async (newPage = 0, newSize = size) => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/api/students", {
                params: {
                    studentNo: filters.studentNo,
                    name: filters.name,
                    status: filters.status,
                    schoolSubjectCode: filters.schoolSubjectCode,
                    page: newPage,
                    size: newSize
                }
            });
            console.log(response.data);
            setStudents(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
            setPage(newPage);
        } catch (e) {
            alert("조회에 실패했습니다.",e);
        } finally {
            setLoading(false);
        }
    };

    // 페이지단위 바뀔 때도 바로 조회
    const handleSizeChange = e => {
        const newSize = parseInt(e.target.value, 10);
        setSize(newSize);
        fetchStudents(0, newSize);
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
                    className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={filters.status}
                    onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
                >
                    <option value="">(전체)</option>
                    <option value="ENROLLED">재학</option>
                    <option value="GRADUATED">졸업</option>
                </select>
                <TextInput
                    placeholder="학과코드"
                    value={filters.schoolSubjectCode}
                    onChange={e => setFilters(f => ({ ...f, schoolSubjectCode: e.target.value }))}
                    className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    className="bg-[#222E8D] text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-800 transition"
                    onClick={() => fetchStudents(0, size)}
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
                    {students.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="text-gray-400 py-6">데이터가 없습니다</td>
                        </tr>
                    ) : (
                        students.map((s, idx) => (
                            <tr key={s.studentNo || idx}>
                                <td className="border px-2 py-1">{s.studentNo}</td>
                                <td className="border px-2 py-1">{s.name}</td>
                                <td className="border px-2 py-1">{s.birthDate}</td>
                                <td className="border px-2 py-1"><GenderDisplay genderCode={s.genderCode} /></td>
                                <td className="border px-2 py-1">{s.email}</td>
                                <td className="border px-2 py-1"><StudentStatusDisplay statusCode={s.studentStatusCode} /></td>
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
                    onPageChange={(p) => fetchStudents(p - 1, size)}
                />
            </div>
        </div>
    );
}
