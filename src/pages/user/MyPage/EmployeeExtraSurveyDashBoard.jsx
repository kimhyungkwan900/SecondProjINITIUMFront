import { useMemo } from "react";
import DonutGauge from "../../../component/admin/extracurricular/survey/DonutGauge";
import EmployeeSurveyListGrid from "../../../component/admin/extracurricular/survey/EmployeeSurveyListGrid";
import PageHeader from "../../../component/common/PageHeader";
import useProgramSurvey from "../../../hooks/admin/extracurricular/useProgramSurvey";
import { useNavigate, useParams } from "react-router-dom";

const dash = (v) => (v === null || v === undefined || v === "" ? "-" : v);

export default function EmployeeExtraSurveyDashBoard() {
  const { eduMngId: eduMngIdParam } = useParams();
  const navigate = useNavigate();
  const eduMngId = useMemo(() => {
    const n = Number(eduMngIdParam);
    return isNaN(n) ? null : n;
  }, [eduMngIdParam]);

  const { status, statusLoading } = useProgramSurvey(eduMngId, { pageSize: 5 });

  const pct = useMemo(() => {
    const raw = Number(status?.participationRate);
    if (!isFinite(raw)) return 0;
    return Math.min(100, Math.max(0, raw));
  }, [status]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 bg-white">
      <PageHeader
        title="비교과 설문 참여현황"
        breadcrumb={[
          { label: "관리자", link: "/admin" },
          { label: "비교과 관리", link: "/admin/extracurricular" },
          { label: "설문 참여현황", active: true },
        ]}
      />

      {/* 상단 액션바 */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 whitespace-nowrap">
          프로그램 ID:{" "}
          <span className="font-semibold text-[#354649]">{dash(eduMngId)}</span>
        </div>
        <div className="space-x-2">
          <button
            className="border border-[#A3C6C4] text-[#354649] px-3 py-1.5 rounded-md hover:bg-[#E0E7E9] transition-colors"
            onClick={() => navigate(-1)}
          >
            돌아가기
          </button>
        </div>
      </div>

      {/* 본문 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 좌측 (참여현황 + 응답 목록) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6">
            <EmployeeSurveyListGrid eduMngId={eduMngId} />
          </div>
        </div>

        {/* 우측 (요약 패널) */}
        <aside>
          <section className="bg-white border border-gray-300 rounded-lg shadow-sm p-6">
            <div className="pb-3 border-b border-gray-300 text-[#354649] font-semibold">
              요약
            </div>
            <div className="pt-4">
              {statusLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-24 bg-gray-200 rounded" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center pb-6">
                    <DonutGauge value={pct} label="참여율" />
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-md bg-[#E0E7E9] p-4 border border-gray-300">
                      <div className="text-gray-600 whitespace-nowrap">프로그램</div>
                      <div className="font-semibold text-[#354649] truncate whitespace-nowrap">
                        {dash(status?.programName)}
                      </div>
                    </div>
                    <div className="rounded-md bg-[#E0E7E9] p-4 border border-gray-300">
                      <div className="text-gray-600 whitespace-nowrap">설문</div>
                      <div className="font-semibold text-[#354649] truncate whitespace-nowrap">
                        {dash(status?.surveyTitle)}
                      </div>
                    </div>
                    <div className="rounded-md bg-[#E0E7E9] p-4 border border-gray-300">
                      <div className="text-gray-600 whitespace-nowrap">대상자</div>
                      <div className="font-semibold text-[#354649] whitespace-nowrap">
                        {dash(status?.totalApplicants)}
                      </div>
                    </div>
                    <div className="rounded-md bg-[#E0E7E9] p-4 border border-gray-300">
                      <div className="text-gray-600 whitespace-nowrap">응답</div>
                      <div className="font-semibold text-[#354649] whitespace-nowrap">
                        {dash(status?.totalResponded)}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
