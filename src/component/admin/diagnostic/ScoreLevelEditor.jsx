import React, { useMemo } from "react";

// 숫자 입력 NaN/빈값 처리: 입력창은 "" 유지, 저장 전에 숫자로 변환
const toIntOrEmpty = (v) => {
  if (v === "" || v === null || v === undefined) return "";
  const n = Number(v);
  return Number.isFinite(n) ? n : "";
};

// 행 단위 유효성: minScore <= maxScore
const isRowInvalid = (lv) =>
  lv.minScore !== "" && lv.maxScore !== "" &&
  Number(lv.minScore) > Number(lv.maxScore);

// 구간 겹침 검사(빈칸은 제외하고 비교)
// 규칙: 인접 정렬 후 prev.max >= next.min 이면 겹침으로 간주(경계 포함)
const findOverlaps = (levels) => {
  const sorted = (levels || [])
    .map((x, i) => ({ ...x, __i: i }))
    .filter(x => x.minScore !== "" && x.maxScore !== "")
    .sort((a, b) => Number(a.minScore) - Number(b.minScore));

  const overlapIdx = new Set();
  for (let i = 0; i < sorted.length - 1; i++) {
    const cur = sorted[i];
    const nxt = sorted[i + 1];
    if (Number(cur.maxScore) >= Number(nxt.minScore)) {
      overlapIdx.add(cur.__i);
      overlapIdx.add(nxt.__i);
    }
  }
  return overlapIdx;
};

const ScoreLevelEditor = ({ scoreLevels = [], onChange }) => {
  const addLevel = () => {
    onChange([
      ...scoreLevels,
      { minScore: "", maxScore: "", levelName: "", description: "" },
    ]);
  };

  const updateLevel = (idx, patch) => {
    const next = [...scoreLevels];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };

  const removeLevel = (idx) => {
    onChange(scoreLevels.filter((_, i) => i !== idx));
  };

  const sortLevels = () => {
    const next = [...scoreLevels].sort((a, b) =>
      Number(a.minScore ?? 0) - Number(b.minScore ?? 0)
    );
    onChange(next);
  };

  const overlaps = useMemo(() => findOverlaps(scoreLevels), [scoreLevels]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">점수 구간</h2>
        <div className="flex gap-2">
          <button type="button" onClick={addLevel} className="px-3 py-1 rounded border">
            구간 추가
          </button>
          <button type="button" onClick={sortLevels} className="px-3 py-1 rounded border">
            정렬
          </button>
        </div>
      </div>

      {scoreLevels?.length ? scoreLevels.map((lv, idx) => {
        const rowInvalid = isRowInvalid(lv);
        const rowOverlap = overlaps.has(idx);

        return (
          <div
            key={idx}
            className={`grid grid-cols-12 gap-2 items-center border rounded p-3 ${
              rowInvalid || rowOverlap ? "border-red-400" : ""
            }`}
          >
            <input
              type="number"
              className="col-span-2 border rounded px-2 py-1"
              placeholder="최소점수"
              value={lv.minScore === 0 ? 0 : (lv.minScore ?? "")}
              onChange={(e) => updateLevel(idx, { minScore: toIntOrEmpty(e.target.value) })}
            />
            <input
              type="number"
              className="col-span-2 border rounded px-2 py-1"
              placeholder="최대점수"
              value={lv.maxScore === 0 ? 0 : (lv.maxScore ?? "")}
              onChange={(e) => updateLevel(idx, { maxScore: toIntOrEmpty(e.target.value) })}
            />
            <input
              className="col-span-3 border rounded px-2 py-1"
              placeholder="레벨명"
              value={lv.levelName ?? ""}
              onChange={(e) => updateLevel(idx, { levelName: e.target.value })}
            />
            <input
              className="col-span-4 border rounded px-2 py-1"
              placeholder="설명"
              value={lv.description ?? ""}
              onChange={(e) => updateLevel(idx, { description: e.target.value })}
            />

            <div className="col-span-1 flex justify-end">
              <button
                type="button"
                onClick={() => removeLevel(idx)}
                className="px-2 py-1 rounded bg-red-100 text-red-600"
              >
                삭제
              </button>
            </div>

            {(rowInvalid || rowOverlap) && (
              <div className="col-span-12 text-xs text-red-600 mt-1">
                {rowInvalid
                  ? "최소점수 ≤ 최대점수 이어야 합니다."
                  : "다른 구간과 겹칩니다."}
              </div>
            )}
          </div>
        );
      }) : (
        <p className="text-sm text-gray-500">점수 구간이 없습니다. “구간 추가”로 시작하세요.</p>
      )}
    </div>
  );
};

export default ScoreLevelEditor;
