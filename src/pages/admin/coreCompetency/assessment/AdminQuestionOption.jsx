import React, { useEffect, useState, useCallback } from "react";

/**
 * 선택지 편집 컴포넌트
 * - 라벨/점수 필수 입력 검증을 수행합니다.
 * - onValidityChange(valid:boolean)를 전달하면 부모가 저장 버튼 제어 등에 활용할 수 있습니다.
 */
const AdminQuestionOption = ({ options, onOptionChange, onValidityChange }) => {
  const [errors, setErrors] = useState([]); // [{label?:string, score?:string}, ...]

  // options 변경 시 검증 수행
  const validate = useCallback(
    (opts) => {
      const list = Array.isArray(opts) ? opts : [];
      const nextErrors = list.map((opt) => {
        const e = {};
        const label = String(opt?.label ?? "").trim();
        const scoreStr = String(opt?.score ?? "").trim();
        const scoreNum = Number(scoreStr);
        if (!label) e.label = "라벨을 입력해주세요.";
        if (scoreStr === "" || Number.isNaN(scoreNum)) e.score = "점수를 입력해주세요.";
        return e;
      });
      setErrors(nextErrors);
      const valid = nextErrors.every((e) => !e.label && !e.score);
      if (typeof onValidityChange === "function") onValidityChange(valid);
    },
    [onValidityChange]
  );

  useEffect(() => {
    validate(options);
  }, [options, validate]);

  // 단일 필드 변경 시 부모에 전달 + 해당 필드 오류 제거
  const handleChange = (index, field, value) => {
    onOptionChange(index, field, value);
    setErrors((prev) => {
      const next = [...(prev || [])];
      if (!next[index]) next[index] = {};
      next[index] = { ...next[index], [field]: undefined };
      return next;
    });
  };

  if (!options || options.length === 0) return null;

  return (
    <div className="space-y-4 pt-4 border-t">
      <span className="text-xl text-black font-bold">▐ 답변 선택지</span>

      <div className="space-y-3">
        {options.map((option, index) => {
          const e = errors[index] || {};
          return (
            <div key={index} className="grid grid-cols-12 gap-2 items-start">
              <span className="col-span-1 text-center font-medium text-gray-600 pt-2">
                {index + 1}.
              </span>

              {/* 라벨 입력 */}
              <div className="col-span-8">
                <label className="block text-sm mb-1">
                  라벨 <span className="text-red-600 text-xs ml-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder={`선택지 ${index + 1} 내용`}
                  value={option.label ?? ""}
                  onChange={(e) => handleChange(index, "label", e.target.value)}
                  className={`w-full p-2 border rounded ${e.label ? "border-red-500" : ""}`}
                  aria-invalid={!!e.label}
                  required
                />
                {e.label && (
                  <p className="text-red-600 text-xs mt-1">{e.label}</p>
                )}
              </div>

              {/* 점수 입력 */}
              <div className="col-span-3">
                <label className="block text-sm mb-1">
                  점수 <span className="text-red-600 text-xs ml-1">*</span>
                </label>
                <input
                  type="number"
                  placeholder="점수"
                  value={option.score ?? ""}
                  onChange={(e) => handleChange(index, "score", e.target.value)}
                  className={`w-full p-2 border rounded ${e.score ? "border-red-500" : ""}`}
                  aria-invalid={!!e.score}
                  required
                />
                {e.score && (
                  <p className="text-red-600 text-xs mt-1">{e.score}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminQuestionOption;
