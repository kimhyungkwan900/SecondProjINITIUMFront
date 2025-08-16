import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoryInEmpNo } from "../../../api/admin/extracurricular/category/CategoryApi";
import PageHeader from "../../../component/common/PageHeader";


function formatDateTime(v) {
  if (!v) return "-";
  const d = new Date(v);
  return isNaN(d) ? String(v) : d.toISOString().slice(0, 19).replace("T", " ");
}

function UseYnBadge({ yn }) {
  const isY = String(yn || "").toUpperCase() === "Y";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
        isY
          ? "text-green-600 border-green-200 bg-green-50"
          : "text-gray-500 border-gray-200 bg-gray-50"
      }`}
      title={isY ? "사용" : "미사용"}
    >
      {isY ? "사용" : "미사용"}
    </span>
  );
}

function CategoryCard({ dto, onClick }) {
  return (
    <div
      className="rounded-2xl border border-[#A3C6C4] bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      {/* 상단 타이틀 + 배지 */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="text-lg font-semibold text-[#354649] line-clamp-1" title={dto.ctgryNm}>
          {dto.ctgryNm || "(분류명 없음)"}
        </h4>
        <UseYnBadge yn={dto.ctgryUseYn} />
      </div>

      {/* 핵심/상위 역량 */}
      <div className="text-sm text-[#6C7A89] space-y-1 mb-3">
        <div className="flex gap-2">
          <span className="w-16 shrink-0 text-[#354649] font-semibold">핵심역량</span>
          <span className="line-clamp-1" title={dto.coreCategory}>
            {dto.coreCategory ?? "-"}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="w-16 shrink-0 text-[#354649] font-semibold">상위역량</span>
          <span className="line-clamp-1" title={dto.subCategory}>
            {dto.subCategory ?? "-"}
          </span>
        </div>
      </div>

      {/* 학과 */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-[#6C7A89]">
          <span className="text-[#354649] font-semibold">학과</span>{" "}
          {dto.subjectName ?? "-"}{" "}
          {dto.subjectCode ? <span className="text-[#6C7A89]">({dto.subjectCode})</span> : null}
        </div>
        <span className="text-xs text-[#6C7A89]" title="생성일">
          {formatDateTime(dto.dataCrtDt)}
        </span>
      </div>

      {/* 하단 액션/ID */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-[#6C7A89]">
          ID: {dto.ctgryId ?? "-"} {dto.coreCategoryId ? ` / Core:${dto.coreCategoryId}` : ""}
        </span>
        <button
          type="button"
          className="bg-[#354649] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#6C7A89] transition-colors text-sm"
        >
          상세 보기
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-[#E0E7E9] p-5 animate-pulse">
      <div className="h-5 w-2/3 bg-white/50 rounded mb-3" />
      <div className="h-4 w-full bg-white/50 rounded mb-2" />
      <div className="h-4 w-4/5 bg-white/50 rounded mb-4" />
      <div className="h-4 w-3/5 bg-white/50 rounded mb-4" />
      <div className="h-8 w-24 bg-white/50 rounded ml-auto" />
    </div>
  );
}

export default function EmployeeCategoryGridPage({ empNo: propEmpNo }) {
  const navigate = useNavigate();
  const empNo =
    propEmpNo ??
    sessionStorage.getItem("empNo") ??
    sessionStorage.getItem("employeeNo") ??
    "";

  const [keyword, setKeyword] = useState("");
  const [useYn, setUseYn] = useState("ALL");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!empNo) {
      setError("사번을 찾을 수 없습니다.");
      setRows([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await getCategoryInEmpNo(empNo);
      const list = Array.isArray(res) ? res : [];
      setRows(list);
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || "분류 목록을 불러오지 못했습니다.");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [empNo]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return rows.filter((r) => {
      // 사용여부 필터
      if (useYn !== "ALL") {
        const yn = String(r.ctgryUseYn || "").toUpperCase();
        if (yn !== useYn) return false;
      }
      // 키워드 필터 (분류명/핵심/상위/학과/코드/상세)
      if (!q) return true;
      const hay = [
        r.ctgryNm,
        r.coreCategory,
        r.subCategory,
        r.subjectName,
        r.subjectCode,
        r.ctgryDtl,
        r.ctgryId,
        r.stgrId,
        r.coreCategoryId,
      ]
        .filter(Boolean)
        .map(String)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [rows, keyword, useYn]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <PageHeader
        title="부서별 비교과 분류"
        breadcrumb={[
          { label: "관리자", link: "/admin" },
          { label: "비교과 관리", link: "/admin/extracurricular" },
          { label: "분류 조회", active: true },
        ]}
      />

      <section className="content-section">
        {/* 툴바 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="분류명 / 핵심·상위역량 / 학과 / 코드 검색…"
              className="w-80 border rounded-md px-4 py-2 text-sm"
            />
            <select
              value={useYn}
              onChange={(e) => setUseYn(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
              title="사용여부"
            >
              <option value="ALL">전체</option>
              <option value="Y">사용</option>
              <option value="N">미사용</option>
            </select>
            <button
              type="button"
              className="bg-[#354649] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#6C7A89] transition-colors text-sm"
              onClick={load}
            >
              새로고침
            </button>
          </div>
          <div className="text-sm text-[#6C7A89]">
            총{" "}
            <span className="font-semibold text-[#354649]">{rows.length}</span>
            건{keyword || useYn !== "ALL" ? (
              <>
                {" "}
                (필터{" "}
                <span className="font-semibold text-[#354649]">
                  {filtered.length}
                </span>
                건)
              </>
            ) : null}
          </div>
        </div>

        {/* 그리드 */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
            ? (
              <div className="col-span-full rounded-2xl border border-[#A3C6C4] bg-[#E0E7E9] p-10 text-center text-[#6C7A89]">
                표시할 분류가 없습니다.
              </div>
            )
            : filtered.map((dto) => (
                <CategoryCard
                  key={dto.ctgryId ?? `${dto.ctgryNm}-${dto.subjectCode}-${dto.coreCategoryId}`}
                  dto={dto}
                  onClick={() =>
                    navigate(`/admin/extracurricular/categories/${encodeURIComponent(dto.ctgryId)}`)
                  }
                />
              ))}
        </div>
      </section>
    </div>
  );
}
