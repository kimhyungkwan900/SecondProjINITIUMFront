import { useCallback, useEffect, useMemo, useState } from "react";
import PageHeader from "../../../component/common/PageHeader";
import PageButton from "../../../component/admin/extracurricular/PageButton.jsx";
import { getConsultList } from "../../../api/user/consult/ConsultUserApi";
import { useAuth } from "../../../hooks/useAuth.jsx";

const PAGE_SIZE = 10;

function trimText(t, n = 80) {
    if (!t) return "-";
    const s = String(t);
    return s.length > n ? s.slice(0, n) + "…" : s;
}

function pickPage(payload) {
    const pageObj = payload?.dscsnInfos ?? payload;
    if (Array.isArray(pageObj?.content)) return pageObj;
    return { content: [], totalElements: 0, number: 0 };
}

export default function StudentConsultListFullPage() {
    const { user, loading: authLoading } = useAuth();
    const studentNo = user?.loginId || ""; // loginId == 학번

    const [rows, setRows] = useState([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const totalPages = useMemo(
        () => Math.max(1, Math.ceil(total / PAGE_SIZE)),
        [total]
    );

    const fetchPage = useCallback(
        async (page = 1) => {
            if (!studentNo) return; // 로그인 전/학번없음 가드
            setLoading(true);
            setError("");
            try {
                const res = await getConsultList({
                    page: page - 1,
                    size: PAGE_SIZE,
                    studentNo, // 🔐 학번으로 서버 필터링
                });
                const pageObj = pickPage(res);
                setRows(pageObj.content ?? []);
                setTotal(pageObj.totalElements ?? 0);
                setCurrent((pageObj.number ?? 0) + 1);
            } catch (e) {
                console.error(e);
                setRows([]);
                setError("상담 내역을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
            } finally {
                setLoading(false);
            }
        },
        [studentNo]
    );

    // 학번 준비되면 1페이지 로드
    useEffect(() => {
        if (!authLoading && studentNo) fetchPage(1);
    }, [authLoading, studentNo, fetchPage]);

    const handlePageChange = (page) => {
        if (page !== current && page > 0 && page <= totalPages) fetchPage(page);
    };

    if (authLoading) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-16 text-center text-[#6C7A89]">
                로그인 정보를 확인 중...
            </div>
        );
    }

    if (!studentNo) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                <p className="text-lg font-semibold text-gray-800">로그인이 필요합니다.</p>
                <p className="text-sm text-gray-500 mt-2">
                    학번(로그인 ID)을 확인할 수 없어 상담 이력을 불러올 수 없습니다.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 bg-white">
            <PageHeader
                title="마이홈"
                breadcrumb={[
                    { label: "마이페이지(학생)", link: "/mypage" },
                    { label: "상담이력조회", active: true },
                ]}
            />

            <section>
                <header className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-800">
                        상담 이력 (학번: {studentNo})
                    </h3>
                    <button
                        onClick={() => fetchPage(current)}
                        className="py-1.5 px-3 rounded-md bg-[#354649] text-white text-sm hover:bg-[#6C7A89] disabled:opacity-50"
                        disabled={loading}
                    >
                        새로고침
                    </button>
                </header>

                <div className="px-4 pb-4 mt-4">
                    <div className="border border-gray-300 rounded-md overflow-hidden">
                        <div className="grid grid-cols-6 text-sm font-semibold text-center text-[#354649] bg-[#E0E7E9]">
                            <div className="px-4 py-2 border-b border-gray-300">상담일정 ID</div>
                            <div className="px-4 py-2 border-b border-gray-300">상태</div>
                            <div className="px-4 py-2 border-b border-gray-300">공개여부</div>
                            <div className="px-4 py-2 border-b border-gray-300">결과요약</div>
                            <div className="px-4 py-2 border-b border-gray-300">신청서 ID</div>
                            <div className="px-4 py-2 border-b border-gray-300">신청정보(요약)</div>
                        </div>

                        {loading ? (
                            <div className="p-6 text-center text-[#6C7A89]">불러오는 중...</div>
                        ) : error ? (
                            <div className="p-6 text-center text-red-600">{error}</div>
                        ) : rows.length === 0 ? (
                            <div className="p-6 text-center text-[#6C7A89]">상담 내역이 없습니다.</div>
                        ) : (
                            rows.map((item, idx) => {
                                const apply = item?.dscsnApplyDto ?? {};
                                const applyId =
                                    apply.dscsnApplyId ?? apply.applyId ?? apply.id ?? "-";
                                const applySummary =
                                    apply?.consultTitle ??
                                    apply?.title ??
                                    apply?.studentName ??
                                    apply?.counselorName ??
                                    "-";

                                return (
                                    <div
                                        key={item.dscsnInfoId ?? `${idx}`}
                                        className={`grid grid-cols-6 border-t border-gray-200 text-center text-sm ${idx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                                            }`}
                                    >
                                        <div className="px-4 py-2">
                                            {item.dscsnInfoId ?? "-"}
                                        </div>
                                        <div className="px-4 py-2">
                                            {item.dscsnStatus ?? "-"}
                                        </div>
                                        <div className="px-4 py-2">
                                            {item.dscsnReleaseYn ?? "-"}
                                        </div>
                                        <div className="px-4 py-2 text-left">
                                            {trimText(item.dscsnResultCn, 80)}
                                        </div>
                                        <div className="px-4 py-2">{applyId}</div>
                                        <div className="px-4 py-2 text-left">
                                            {trimText(applySummary, 40)}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="mt-3 flex justify-end">
                        <PageButton
                            totalPages={totalPages}
                            currentPage={current}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
