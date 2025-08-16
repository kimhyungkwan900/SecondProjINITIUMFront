import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoryInEmpNo } from "../../../api/admin/extracurricular/category/CategoryApi";
import PageHeader from "../../../component/common/PageHeader";

const normalizeCategory = (raw = {}) => ({
  id:
    raw.id ??
    raw.ctgryId ??
    raw.categoryId ??
    raw.code ??
    raw?.pk ??
    null,
  name:
    raw.name ??
    raw.ctgryNm ??
    raw.categoryName ??
    raw.codeName ??
    "이름 미정",
  description:
    raw.description ??
    raw.ctgryDesc ??
    raw.remark ??
    "",
  subCount:
    raw.subCount ??
    raw.childrenCount ??
    raw.childCount ??
    raw.programCnt ??
    0,
});

function CategoryCard({ item, onClick }) {
  return (
    <div
      className="rounded-2xl border border-[#A3C6C4] bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-lg font-semibold text-[#354649] truncate">
          {item.name}
        </h4>
        {item.subCount > 0 && (
          <span className="ml-3 shrink-0 rounded-full bg-[#E0E7E9] px-3 py-1 text-xs text-[#354649] border border-[#A3C6C4]">
            {item.subCount}개
          </span>
        )}
      </div>

      {item.description ? (
        <p className="text-sm text-[#6C7A89] line-clamp-2 min-h-[2.5rem]">
          {item.description}
        </p>
      ) : (
        <p className="text-sm text-[#6C7A89] italic">설명이 없습니다.</p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-[#6C7A89]">ID: {item.id ?? "-"}</span>
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
      <div className="h-4 w-4/5 bg-white/50 rounded mb-5" />
      <div className="h-8 w-24 bg-white/50 rounded ml-auto" />
    </div>
  );
}

export default function EmployeeExtraCategoryPage({ empNo: propEmpNo }) {
  const navigate = useNavigate();
  const empNo =
    propEmpNo ??
    sessionStorage.getItem("empNo") ??
    sessionStorage.getItem("employeeNo") ??
    ""; // 세션 키는 프로젝트에 맞게 조정

  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
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
      const data = await getCategoryInEmpNo(empNo);
      const list = Array.isArray(data) ? data : [];
      setRows(list.map(normalizeCategory));
    } catch (e) {
      console.error("분류 조회 실패", e);
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
    if (!keyword.trim()) return rows;
    const q = keyword.trim().toLowerCase();
    return rows.filter(
      (r) =>
        String(r.name || "").toLowerCase().includes(q) ||
        String(r.description || "").toLowerCase().includes(q) ||
        String(r.id || "").toLowerCase().includes(q)
    );
  }, [rows, keyword]);

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

      {/* 검색/툴바 */}
      <section className="content-section">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="분류명/설명/ID 검색…"
              className="w-72 border rounded-md px-4 py-2 text-sm"
            />
            <button
              type="button"
              className="bg-[#354649] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#6C7A89] transition-colors text-sm"
              onClick={load}
            >
              새로고침
            </button>
          </div>
          <div className="text-sm text-[#6C7A89]">
            총 <span className="font-semibold text-[#354649]">{rows.length}</span>건
            {keyword ? (
              <>
                {" "}
                (필터링 결과{" "}
                <span className="font-semibold text-[#354649]">
                  {filtered.length}
                </span>
                건)
              </>
            ) : null}
          </div>
        </div>

        {/* 상태 표시 */}
        {error && (
          <div className="mt-4 p-3 rounded-md border border-red-200 text-red-600 bg-red-50">
            {error}
          </div>
        )}

        {/* Grid 카드 목록 */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
            ? (
              <div className="col-span-full rounded-2xl border border-[#A3C6C4] bg-[#E0E7E9] p-10 text-center text-[#6C7A89]">
                표시할 분류가 없습니다.
              </div>
            )
            : filtered.map((cat) => (
                <CategoryCard
                  key={cat.id ?? cat.name}
                  item={cat}
                  onClick={() =>
                    navigate(`/admin/extracurricular/categories/${encodeURIComponent(cat.id ?? "")}`)
                  }
                />
              ))}
        </div>
      </section>
    </div>
  );
}
