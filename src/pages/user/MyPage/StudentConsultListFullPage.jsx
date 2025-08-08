import { useCallback, useEffect, useState } from "react";
import { getConsultList } from "../../../api/user/consult/ConsultUserApi";
import PageButton from "../../../component/admin/extracurricular/PagaButton";
import PageHeader from "../../../component/common/PageHeader";
import TextInput from "../../../component/common/TextInput";

const PAGE_SIZE = 5;

const StudentConsultListFullPage = () => {
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [filters, setFilters] = useState({
        consultorType: "",
        dscsnType: "",
        startDate: "",
        endDate: "",
        dscsnStatus: "",
        dscsnKindId: "",
        studentNo: "",
        studentName: "",
        studentStatus: "",
    });

    const totalPages = Math.ceil(total / PAGE_SIZE);

    const nonEmpty = (obj) =>
        Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== "" && v !== null && v !== undefined));

    const fetchData = useCallback(
        async (page = 1) => {
            setLoading(true);
            setError("");
            try {
                const params = {
                    page: page - 1,
                    size: PAGE_SIZE,
                    sort: "consultDate,DESC",
                    ...nonEmpty(filters),
                };
                const result = await getConsultList(params);
                setData(result.dscsnInfos?.content || []);
                setCurrent((result.dscsnInfos?.number ?? 0) + 1);
                setTotal(result.dscsnInfos?.totalElements ?? 0);
            } catch (e) {
                console.error(e);
                setError("상담 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
                setData([]);
            } finally {
                setLoading(false);
            }
        },
        [filters]
    );

    useEffect(() => {
        fetchData(1);
        // eslint-disable-next-line
    }, []);

    const handlePageChange = (page) => {
        if (page !== current && page > 0 && page <= totalPages) {
            fetchData(page);
        }
    };

    const fmt = (d) => (d ? String(d).split("T")[0] : "");
    const dateRange = (s, e, single) => {
        const start = fmt(s);
        const end = fmt(e);
        if (start && end) return `${start} ~ ${end}`;
        if (single) return fmt(single);
        return start || end || "-";
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const onReset = () => {
        setFilters({
            consultorType: "",
            dscsnType: "",
            startDate: "",
            endDate: "",
            dscsnStatus: "",
            dscsnKindId: "",
            studentNo: "",
            studentName: "",
            studentStatus: "",
        });
    };

    return (
        <div className="space-y-10">
            <PageHeader
                title="마이홈"
                breadcrumb={[
                    { label: "마이페이지(학생)", link: "/mypage" },
                    { label: "상담이력조회", active: true },
                ]}
            />

            {/* 🔎 검색 + 결과 테이블: 하나의 섹션 */}
            <section className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <header className="px-4 py-3 border-b bg-gray-50">
                    <h3 className="text-base font-semibold text-gray-800">상담 이력 조회</h3>
                </header>

                {/* 검색 폼 */}
                <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* 상담자 유형 (select는 기본) */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">상담자 유형</label>
                            <select
                                name="consultorType"
                                value={filters.consultorType}
                                onChange={onChange}
                                className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                <option value="">전체</option>
                                <option value="P">교수</option>
                                <option value="K">외부상담사</option>
                            </select>
                        </div>

                        {/* TextInput 사용 인풋들 */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">상담분야</label>
                            <TextInput
                                type="text"
                                placeholder="예: 진로"
                                value={filters.dscsnType}
                                onChange={onChange}
                                className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                name="dscsnType"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">상담상태</label>
                            <TextInput
                                type="text"
                                placeholder="예: 완료/대기"
                                value={filters.dscsnStatus}
                                onChange={onChange}
                                className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                name="dscsnStatus"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">상담항목</label>
                            <TextInput
                                type="text"
                                placeholder="항목 ID"
                                value={filters.dscsnKindId}
                                onChange={onChange}
                                className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                name="dscsnKindId"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">상담일(시작)</label>
                            <TextInput
                                type="date"
                                value={filters.startDate}
                                onChange={onChange}
                                className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                name="startDate"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">상담일(종료)</label>
                            <TextInput
                                type="date"
                                value={filters.endDate}
                                onChange={onChange}
                                className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                name="endDate"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">학번</label>
                            <TextInput
                                type="text"
                                placeholder="학번"
                                value={filters.studentNo}
                                onChange={onChange}
                                className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                name="studentNo"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">성명</label>
                            <TextInput
                                type="text"
                                placeholder="성명"
                                value={filters.studentName}
                                onChange={onChange}
                                className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                name="studentName"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">학적상태</label>
                            <TextInput
                                type="text"
                                placeholder="재학/휴학 등"
                                value={filters.studentStatus}
                                onChange={onChange}
                                className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                                name="studentStatus"
                            />
                        </div>
                    </div>

                    <div className="mt-4 text-right space-x-2">
                        <button
                            onClick={() => fetchData(1)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
                            disabled={loading}
                        >
                            조회
                        </button>
                        <button
                            onClick={onReset}
                            className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-60"
                            disabled={loading}
                        >
                            초기화
                        </button>
                    </div>
                </div>

                {/* 결과 테이블 (같은 섹션 안) */}
                <div className="px-4 pb-4">
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full table-auto text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-700">
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">상담자명</th>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">상담분야</th>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">상담일자</th>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">상담상태</th>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">상담항목</th>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">학번</th>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">성명</th>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">학적상태</th>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">상담명</th>
                                    <th className="px-3 py-2 text-center font-semibold border-b border-gray-200">상담내용</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={10} className="text-center text-gray-400 py-8">
                                            불러오는 중...
                                        </td>
                                    </tr>
                                ) : data.length === 0 ? (
                                    <tr>
                                        <td colSpan={10} className="text-center text-gray-400 py-8">
                                            상담 내역이 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((item) => (
                                        <tr key={item.dscsnInfoId ?? item.id}>
                                            <td className="px-3 py-2 text-center border-b border-gray-200">{item.counselorName ?? "-"}</td>
                                            <td className="px-3 py-2 text-center border-b border-gray-200">{item.dscsnType ?? "-"}</td>
                                            <td className="px-3 py-2 text-center border-b border-gray-200">
                                                {dateRange(item.consultStartDate, item.consultEndDate, item.consultDate)}
                                            </td>
                                            <td className="px-3 py-2 text-center border-b border-gray-200">{item.dscsnStatus ?? "-"}</td>
                                            <td className="px-3 py-2 text-center border-b border-gray-200">
                                                {item.dscsnKindName ?? item.dscsnKindId ?? "-"}
                                            </td>
                                            <td className="px-3 py-2 text-center border-b border-gray-200">{item.studentNo ?? "-"}</td>
                                            <td className="px-3 py-2 text-center border-b border-gray-200">{item.studentName ?? "-"}</td>
                                            <td className="px-3 py-2 text-center border-b border-gray-200">{item.studentStatus ?? "-"}</td>
                                            <td className="px-3 py-2 text-center border-b border-gray-200">{item.consultTitle ?? "-"}</td>
                                            <td className="px-3 py-2 text-center border-b border-gray-200">{item.consultContent ?? "-"}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-3 flex justify-end">
                        <PageButton totalPages={totalPages} currentPage={current} onPageChange={handlePageChange} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudentConsultListFullPage;
