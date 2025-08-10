import React, { useMemo } from "react";

const ANSWER_TYPES = ["YES_NO", "SCALE_4", "SCALE_5", "SCALE_6", "SCALE_7"]; // ⚠️ 백엔드 ENUM과 1:1 일치 필요

// 타입별 보기 프리셋
const PRESETS = {
  YES_NO: [
    { content: "아니오", score: 0, selectValue: 0 },
    { content: "예",     score: 1, selectValue: 1 },
  ],
  SCALE_4: [1,2,3,4].map(v => ({ content: `${v}`, score: v, selectValue: v })),
  SCALE_5: [1,2,3,4,5].map(v => ({ content: `${v}`, score: v, selectValue: v })),
  SCALE_6: [1,2,3,4,5,6].map(v => ({ content: `${v}`, score: v, selectValue: v })),
  SCALE_7: [1,2,3,4,5,6,7].map(v => ({ content: `${v}`, score: v, selectValue: v })),
};

// 숫자 입력 NaN 방지: 빈칸("") 허용, 그 외 정수만 저장
const toIntOrEmpty = (v) => {
  if (v === "" || v === null || v === undefined) return "";
  const n = Number(v);
  return Number.isFinite(n) ? n : "";
};

// answers의 selectValue 중복/누락 검증
const analyzeSelectValues = (answers) => {
  const missing = new Set();     // 값이 비어있는 인덱스
  const duplicate = new Set();   // 중복인 인덱스

  const counts = new Map();
  (answers || []).forEach((a, idx) => {
    const val = a?.selectValue;
    if (val === "" || val === null || val === undefined) {
      missing.add(idx);
      return;
    }
    counts.set(val, (counts.get(val) || 0) + 1);
  });

  (answers || []).forEach((a, idx) => {
    const val = a?.selectValue;
    if (val !== "" && val !== null && val !== undefined) {
      if ((counts.get(val) || 0) > 1) duplicate.add(idx);
    }
  });

  return { missing, duplicate };
};

const QuestionEditor = ({ questions, onChange }) => {
  const updateQuestion = (idx, patch) => {
    const next = [...(questions || [])];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  };

  const addQuestion = () => {
    const next = [
      ...(questions || []),
      {
        content: "",
        order: (questions?.length || 0) + 1,
        answerType: "SCALE_5",
        answers: [
          { content: "1", score: 1, selectValue: 1 },
          { content: "2", score: 2, selectValue: 2 },
          { content: "3", score: 3, selectValue: 3 },
          { content: "4", score: 4, selectValue: 4 },
          { content: "5", score: 5, selectValue: 5 },
        ],
      },
    ];
    onChange(next);
  };

  const removeQuestion = (idx) => {
    const next = (questions || [])
      .filter((_, i) => i !== idx)
      .map((q, i) => ({ ...q, order: i + 1 }));
    onChange(next);
  };

  const move = (from, to) => {
    const list = [...(questions || [])];
    if (to < 0 || to >= list.length) return;
    const [item] = list.splice(from, 1);
    list.splice(to, 0, item);
    const withOrder = list.map((q, i) => ({ ...q, order: i + 1 }));
    onChange(withOrder);
  };

  const addAnswer = (qIdx) => {
    const q = questions[qIdx] || {};
    const nextSelect =
      Math.max(0, ...(q.answers || []).map(a => Number.isFinite(a.selectValue) ? a.selectValue : 0)) + 1;
    const next = [...questions];
    next[qIdx] = {
      ...q,
      answers: [
        ...(q.answers || []),
        { content: "", score: "", selectValue: nextSelect },
      ],
    };
    onChange(next);
  };

  const updateAnswer = (qIdx, aIdx, patch) => {
    const q = questions[qIdx] || {};
    const ans = q.answers || [];
    const nextAns = [...ans];
    nextAns[aIdx] = { ...nextAns[aIdx], ...patch };
    const next = [...questions];
    next[qIdx] = { ...q, answers: nextAns };
    onChange(next);
  };

  const removeAnswer = (qIdx, aIdx) => {
    const q = questions[qIdx] || {};
    const ans = (q.answers || []).filter((_, i) => i !== aIdx);
    const next = [...questions];
    next[qIdx] = { ...q, answers: ans };
    onChange(next);
  };

  // 전체 폼 수준의 selectValue 문제 존재 여부
  const hasAnySelectValueIssue = useMemo(() => {
    return (questions || []).some(q => {
      const { missing, duplicate } = analyzeSelectValues(q.answers || []);
      return missing.size > 0 || duplicate.size > 0;
    });
  }, [questions]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold">문항</h2>
        <button
          type="button"
          onClick={addQuestion}
          className="px-3 py-1 rounded bg-gray-800 text-white text-sm"
        >
          문항 추가
        </button>
      </div>

      {hasAnySelectValueIssue && (
        <div className="text-red-600 text-sm">
          * 일부 문항에 <b>선택값(selectValue) 누락</b> 또는 <b>중복</b>이 있습니다. 저장 전에 수정해 주세요.
        </div>
      )}

      {questions?.length ? questions.map((q, idx) => {
        const { missing, duplicate } = analyzeSelectValues(q.answers || []);
        return (
          <div key={idx} className="border rounded p-3 space-y-3">
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-600">#{idx + 1}</span>
              <input
                className="flex-1 border rounded px-2 py-1"
                placeholder="문항 내용"
                value={q.content || ""}
                onChange={(e) => updateQuestion(idx, { content: e.target.value })}
              />
              <select
                className="border rounded px-2 py-1"
                value={q.answerType || "SCALE_5"}
                onChange={(e) => {
                  const nextType = e.target.value;
                  updateQuestion(idx, {
                    answerType: nextType,
                    answers: PRESETS[nextType] ? [...PRESETS[nextType]] : (q.answers || []),
                  });
                }}
              >
                {ANSWER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <button
                type="button"
                onClick={() => move(idx, idx - 1)}
                className="px-2 py-1 border rounded"
                title="위로"
              >↑</button>
              <button
                type="button"
                onClick={() => move(idx, idx + 1)}
                className="px-2 py-1 border rounded"
                title="아래로"
              >↓</button>
              <button
                type="button"
                onClick={() => removeQuestion(idx)}
                className="px-2 py-1 rounded bg-red-500 text-white"
              >
                삭제
              </button>
            </div>

            {/* 보기(answers) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">보기</span>
                <button
                  type="button"
                  onClick={() => addAnswer(idx)}
                  className="px-2 py-1 rounded border"
                >
                  보기 추가
                </button>
              </div>

              {(q.answers || []).map((a, aIdx) => {
                const isMissing = missing.has(aIdx);
                const isDup = duplicate.has(aIdx);
                return (
                  <div key={aIdx} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      className="col-span-6 border rounded px-2 py-1"
                      placeholder="보기 내용"
                      value={a.content ?? ""}
                      onChange={(e) => updateAnswer(idx, aIdx, { content: e.target.value })}
                    />

                    <div className="col-span-2">
                      <input
                        type="number"
                        className="w-full border rounded px-2 py-1"
                        placeholder="점수"
                        value={a.score === 0 ? 0 : (a.score || "")}
                        onChange={(e) => updateAnswer(idx, aIdx, { score: toIntOrEmpty(e.target.value) })}
                      />
                    </div>

                    <div className="col-span-2">
                      <input
                        type="number"
                        className={`w-full border rounded px-2 py-1 ${isMissing || isDup ? 'border-red-500' : ''}`}
                        placeholder="선택값"
                        value={a.selectValue === 0 ? 0 : (a.selectValue || "")}
                        onChange={(e) =>
                          updateAnswer(idx, aIdx, { selectValue: toIntOrEmpty(e.target.value) })
                        }
                      />
                    </div>

                    <div className="col-span-2 flex justify-end items-center gap-2">
                      {(isMissing || isDup) && (
                        <span className="text-xs text-red-600">
                          {isMissing ? "필수" : isDup ? "중복" : ""}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeAnswer(idx, aIdx)}
                        className="px-2 py-1 rounded bg-red-100 text-red-600"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }) : (
        <p className="text-sm text-gray-500">문항이 없습니다. “문항 추가”로 시작하세요.</p>
      )}
    </div>
  );
};

export default QuestionEditor;
