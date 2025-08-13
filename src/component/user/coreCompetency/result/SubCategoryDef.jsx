import axios from "axios";
import { useEffect, useMemo, useState } from "react";

/**
 * SubCategoryDef
 * - 이상적 인재상 트리에서 핵심역량/하위역량/하위역량 정의를 표로 보여줍니다.
 * - 같은 핵심역량 그룹 내에서 "같은 이름의 하위역량"은 한 번만 표시합니다.
 * - 핵심역량 셀은 rowSpan으로 병합합니다.
 */
const SubCategoryDef = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("/api/user/ideal-talent-profile/tree", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error(e);
        setError("역량 정의를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /**
   * 표 렌더링용 행 구성
   * 1) 트리 -> 평탄화
   * 2) 정렬: 핵심역량 → 하위역량
   * 3) 중복 제거: 같은 핵심역량(groupKey) 내에서 하위역량명이 같은 항목은 1건만 유지
   * 4) rowSpan 재계산
   */
  const rows = useMemo(() => {
    const out = [];
    for (const item of data ?? []) {
      const cores = item?.coreCompetencyCategories ?? [];
      for (const core of cores) {
        const coreId   = core.coreCategoryId ?? core.id ?? core.coreId ?? null;
        const coreName = core.coreCategoryName ?? core.coreName ?? core.name ?? "-";
        const subs     = core.subCompetencyCategories ?? [];
        for (const sub of subs) {
          const subId   = sub.subCategoryId ?? sub.id ?? sub.subId ?? null;
          const subName = sub.subCategoryName ?? sub.subName ?? sub.name ?? "-";
          const subDef  = sub.subDefinition ?? sub.definition ?? sub.desc ?? "";
          const groupKey = coreId != null ? `id:${coreId}` : `name:${coreName}`;
          out.push({ coreId, coreName, subId, subName, subDefinition: subDef, groupKey });
        }
      }
    }

    // 2) 정렬
    out.sort((a, b) => {
      const byCore = a.coreName.localeCompare(b.coreName, "ko");
      if (byCore !== 0) return byCore;
      return a.subName.localeCompare(b.subName, "ko");
    });

    // 3) 중복 제거 (같은 핵심역량 그룹 내 같은 하위역량명은 1건만)
    const norm = (s) => (s ?? "").trim().replace(/\s+/g, " ").toLowerCase();
    const seen = new Set(); // key = groupKey|subName(norm)
    const deduped = [];
    for (const r of out) {
      const key = `${r.groupKey}|${norm(r.subName)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(r);
    }

    // 4) rowSpan 재계산
    const counts = new Map();
    for (const r of deduped) counts.set(r.groupKey, (counts.get(r.groupKey) ?? 0) + 1);

    const enhanced = [];
    let prevKey = null;
    for (const r of deduped) {
      const isFirst = r.groupKey !== prevKey;
      const rowSpan = isFirst ? counts.get(r.groupKey) : 0;
      enhanced.push({ ...r, isFirstOfGroup: isFirst, rowSpan });
      prevKey = r.groupKey;
    }
    return enhanced;
  }, [data]);

  // 상태별 안내
  if (loading)   return <div className="w-[1200px] mx-auto text-sm text-gray-500">로딩 중…</div>;
  if (error)     return <div className="w-[1200px] mx-auto text-sm text-red-600">{error}</div>;
  if (!rows.length) return <div className="w-[1200px] mx-auto text-sm text-gray-500">표시할 데이터가 없습니다.</div>;

  return (
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 mt-6">
        <table className="min-w-full text-gray-800 text-sm text-center">
            <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-4 border border-gray-300">핵심역량</th>
              <th className="px-6 py-4 border border-gray-300">하위역량</th>
              <th className="px-6 py-4 border border-gray-300">하위역량 정의</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.groupKey}-${r.subId ?? r.subName}`} className="hover:bg-gray-50">
                {/* 핵심역량: 그룹 첫 행에만 표시 + rowSpan */}
                {r.isFirstOfGroup && (
                  <td className="px-6 py-4 border border-gray-300 align-middle font-medium" rowSpan={r.rowSpan}>
                    {r.coreName}
                  </td>
                )}
                <td className="px-6 py-4 border border-gray-300">{r.subName}</td>
                <td className="px-6 py-4 border border-gray-300 text-left leading-relaxed">
                  {r.subDefinition || <span className="text-gray-400">정의가 없습니다.</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default SubCategoryDef;
