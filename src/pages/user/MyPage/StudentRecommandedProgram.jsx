// src/pages/user/mypage/StudentRecommendedProgram.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgramCard from "../../../features/user/programs/ProgramCard";
import { getRecommendedProgramsPage } from "../../../api/user/recommendationApi";
import PageHeader from "../../../component/common/PageHeader";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ""; // 예: http://localhost:8080

function toIsoDate(dateInput) {
  if (!dateInput) return "-";

  // 이미 Date 객체인 경우
  if (dateInput instanceof Date && !isNaN(dateInput)) {
    return dateInput.toISOString().slice(0, 10);
  }

  // 문자열인 경우
  const str = String(dateInput);

  // ISO/일반 날짜 문자열 → Date
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) {
    const d = new Date(str);
    if (!isNaN(d)) return d.toISOString().slice(0, 10);
  }

  // CHAR(8) → YYYY-MM-DD
  if (/^\d{8}$/.test(str)) {
    return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`;
  }

  return str;
}

function LoadingSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="min-w-[260px] w-[260px] rounded-lg p-4 bg-[#E0E7E9] animate-pulse"
        >
          <div className="h-36 w-full rounded-md bg-white/60 mb-3" />
          <div className="h-5 w-3/4 rounded bg-white/60 mb-2" />
          <div className="h-4 w-1/2 rounded bg-white/60 mb-4" />
          <div className="h-4 w-full rounded bg-white/60 mb-2" />
          <div className="h-4 w-2/3 rounded bg-white/60" />
        </div>
      ))}
    </div>
  );
}

export default function StudentRecommendedProgram({
  assessmentNo,
  student,
  page = 0,
  size = 6,
  sort = "LATEST",
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const studentNo = useMemo(
    () => (typeof student === "string" ? student : student?.studentNo),
    [student]
  );

  const fetchData = useCallback(async () => {
    if (!assessmentNo || !studentNo) {
      setItems([]);
      return;
    }

    setLoading(true);
    setErr(null);

    const abort = new AbortController();
    try {
      const pageData = await getRecommendedProgramsPage({
        assessmentNo,
        studentNo,
        page,
        size,
        sort,
        // axios는 기본 fetch가 아니라서 signal 전달은 불가하지만
        // 패턴 일관성을 위해 abort 변수를 남겨둠 (필요 시 axios cancel token로 전환)
      });
      const content = Array.isArray(pageData?.content)
        ? pageData.content
        : Array.isArray(pageData)
        ? pageData
        : [];
      setItems(content);
    } catch (e) {
      console.error(e);
      setErr("추천 프로그램을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }

    return () => abort.abort();
  }, [assessmentNo, studentNo, page, size, sort]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="content-section">
      <PageHeader
        title="마이홈"
        breadcrumb={[
          { label: "마이페이지(학생)", link: "/mypage" },
          { label: "추천 비교과 프로그램", active: true },
        ]}
      />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-[#354649]">맞춤 추천 비교과</h3>

        <button
          type="button"
          className="bg-[#354649] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#6C7A89] transition-colors text-sm"
          onClick={() =>
            navigate(
              `/programs/recommended?assessmentNo=${encodeURIComponent(
                assessmentNo ?? ""
              )}&studentNo=${encodeURIComponent(studentNo ?? "")}`
            )
          }
        >
          더보기
        </button>
      </div>

      {/* 상태 메시지 (접근성) */}
      <div aria-live="polite" className="sr-only">
        {loading ? "불러오는 중" : err ? "오류" : "로드 완료"}
      </div>

      {loading && <LoadingSkeleton />}

      {!loading && err && (
        <div className="p-4 text-sm text-red-500 border border-red-200 rounded-md">
          {err}
        </div>
      )}

      {!loading && !err && items.length === 0 && (
        <div className="p-4 text-sm text-[#6C7A89] border border-[#A3C6C4] rounded-md bg-[#E0E7E9]">
          추천할 프로그램이 없습니다.
        </div>
      )}

      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((rec) => {
          const p = rec?.program ?? rec; // 백엔드 래퍼 추가 전후 호환
          const imgPath = p?.extracurricularImageDTO?.[0]?.imgFilePathNm;

          return (
            <ProgramCard
              key={p?.eduMngId ?? rec?.programId}
              id={p?.eduMngId ?? rec?.programId}
              title={p?.eduNm ?? rec?.eduNm ?? "(제목 없음)"}
              imageUrl={imgPath ? `${API_BASE}${imgPath}` : "/default-image.png"}
              mileage={p?.eduMlg ?? rec?.eduMlg ?? 0}
              category={p?.ctgryNm ?? "기타"}
              description={p?.eduDtlCn ?? ""}
              applicationPeriod={`${toIsoDate(
                p?.eduAplyBgngDt ?? rec?.eduAplyBgngDt
              )} ~ ${toIsoDate(p?.eduAplyEndDt ?? rec?.eduAplyEndDt)}`}
              operatingPeriod={`${toIsoDate(
                p?.eduBgngYmd ?? rec?.eduBgngYmd
              )} ~ ${toIsoDate(p?.eduEndYmd ?? rec?.eduEndYmd)}`}
              participants={p?.accept ?? 0}
              capacity={p?.eduPtcpNope ?? 0}
              onToggleFavorite={(e) => e?.preventDefault?.()}
            />
          );
        })}
      </div>
    </section>
  );
}
