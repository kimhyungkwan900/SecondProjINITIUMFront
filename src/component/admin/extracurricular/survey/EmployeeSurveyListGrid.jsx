import useProgramSurvey from "../../../../hooks/admin/extracurricular/useProgramSurvey";
import { formatDate } from "../../../../utils/dateUtils";
import PageButton from "../PageButton";

export default function EmployeeSurveyListGrid({ eduMngId }) {
  const {
    status, statusLoading, statusError,
    list, listLoading, listError,
    setPage, size, setSize,
  } = useProgramSurvey(eduMngId, { pageSize: 5 });

  const formatDateTime = (input) => {
    if (!input) return "-";
    const d = new Date(input);
    if (isNaN(d.getTime())) return "-";
    const date = formatDate(d); // YYYY-MM-DD (제공 유틸)
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${date} ${hh}:${mm}`;
  };

  const percent = status?.participationRate != null
    ? Number(status.participationRate).toFixed(1)
    : "0.0";
  return (
    <div className="space-y-6">
      {/* 참여현황 섹션 */}
      <section className="border border-gray-300 rounded-md overflow-hidden">
        <div className="px-4 py-3 bg-[#E0E7E9] text-[#354649] font-semibold">참여현황</div>

        <div className="p-4 space-y-4">
          {statusLoading && (
            <div className="animate-pulse space-y-3">
              <div className="h-6 bg-gray-200 rounded" />
              <div className="h-6 bg-gray-200 rounded" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
          )}

          {!statusLoading && !statusError && status && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">프로그램</div>
                  <div className="font-semibold text-[#354649]">{status.programName}</div>
                </div>
                <div>
                  <div className="text-gray-500">설문 제목</div>
                  <div className="font-semibold text-[#354649]">{status.surveyTitle}</div>
                </div>
                <div>
                  <div className="text-gray-500">담당 교직원</div>
                  <div className="font-semibold">{status.empNo || "-"}</div>
                </div>
                <div>
                  <div className="text-gray-500">프로그램 ID</div>
                  <div className="font-semibold">{status.eduMngId}</div>
                </div>
              </div>

              {/* KPI 카드 */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-md bg-[#E0E7E9] p-4 text-center">
                  <div className="text-xs text-gray-600">대상자</div>
                  <div className="text-xl font-bold text-[#354649]">{status.totalApplicants}</div>
                </div>
                <div className="rounded-md bg-[#E0E7E9] p-4 text-center">
                  <div className="text-xs text-gray-600">응답</div>
                  <div className="text-xl font-bold text-[#354649]">{status.totalResponded}</div>
                </div>
                <div className="rounded-md bg-[#E0E7E9] p-4 text-center">
                  <div className="text-xs text-gray-600">참여율</div>
                  <div className="text-xl font-bold text-[#354649]">{percent}%</div>
                </div>
              </div>

              {/* 진행률 바 */}
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>참여 진행률</span>
                  <span>{percent}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#354649] transition-all"
                    style={{ width: `${Math.min(100, Number(percent))}%` }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* === 응답 목록 섹션 === */}
      <section className="border border-gray-300 rounded-md overflow-hidden">
        {/* 헤더 */}
        <div className="px-4 py-3 bg-[#E0E7E9] text-[#354649] font-semibold flex items-center justify-between">
          <span>응답 목록</span>

          {/* 페이지 크기 */}
          <div className="flex items-center space-x-2 text-sm">
            <label className="text-gray-600 whitespace-nowrap">페이지 크기</label>
            <select
              className="border border-[#A3C6C4] rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#354649]"
              value={size}
              onChange={(e) => {
                const v = Number(e.target.value);
                setSize(v);
                setPage(0);
              }}
            >
              {[5, 10, 20].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 스크롤 컨테이너 */}
        <div className="overflow-x-auto">
          {/* 공통 그리드 템플릿: 헤더/바디 동일 */}
          <div className="min-w-[760px] grid grid-cols-[140px_160px_140px_220px_minmax(160px,1fr)] bg-gray-50 text-gray-700 text-sm font-semibold border-t border-gray-300">
            <div className="px-3 py-2 border-r border-gray-300">응답ID</div>
            <div className="px-3 py-2 border-r border-gray-300">학번</div>
            <div className="px-3 py-2 border-r border-gray-300">성명</div>
            <div className="px-3 py-2 border-r border-gray-300">제출일시</div>
            <div className="px-3 py-2">비고</div>
          </div>

          {/* 바디 */}
          <div className="min-w-[760px] divide-y divide-gray-300">
            {listLoading ? (
              <div className="py-8 text-center text-gray-400">불러오는 중...</div>
            ) : listError ? (
              (import.meta.env.DEV && console.error("응답 목록 오류:", listError),
                <div className="py-8 text-center text-gray-400">응답 데이터를 불러오지 못했습니다.</div>)
            ) : (list?.content?.length || 0) === 0 ? (
              <div className="py-8 text-center text-gray-400">응답 데이터가 없습니다.</div>
            ) : (
              list.content.map((row) => {
                const id = row.id ?? row.srvyRspnsId ?? "-";
                const stdNo = row.studentNo ?? row.stdNo ?? "-";
                const stdNm = row.studentName ?? row.stdNm ?? "-";
                const submitted = formatDateTime(row.submittedAt ?? row.createdAt ?? row.modifiedAt);
                const remark = row.remark ?? "-";

                return (
                  <div
                    key={id}
                    className="grid grid-cols-[140px_160px_140px_220px_minmax(160px,1fr)] text-sm text-[#354649] hover:bg-gray-50"
                  >
                    <div className="px-3 py-2 border-r border-gray-300">{id}</div>
                    <div className="px-3 py-2 border-r border-gray-300">{stdNo}</div>
                    <div className="px-3 py-2 border-r border-gray-300">{stdNm}</div>
                    <div className="px-3 py-2 border-r border-gray-300">{submitted}</div>
                    <div className="px-3 py-2">{remark}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 페이지네이션 */}
        <div className="px-4 py-3 border-t border-gray-300 flex items-center justify-between text-sm">
          <div className="text-gray-600">
            총 {list?.totalElements ?? 0}건 / {list?.totalPages ?? 0}페이지
          </div>
          <PageButton
            totalPages={list?.totalPages ?? 0}
            currentPage={(list?.number ?? 0) + 1}     // 1-based
            onPageChange={(p) => setPage(p - 1)}      // 훅은 0-based
            disabled={listLoading}
            maxVisible={10}
          />
        </div>
      </section>
    </div>
  );
}