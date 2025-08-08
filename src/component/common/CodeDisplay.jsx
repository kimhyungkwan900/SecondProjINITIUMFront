import React, { useMemo } from "react";
import { getLabel } from "./CodeBook";

/**
 * 범용 코드 디스플레이
 * - category: 코드북의 카테고리 키 (e.g., 'gender', 'studentStatus')
 * - code: 실제 코드값 (문자/숫자 상관없음)
 * - fallback: 매핑 실패 시 표시 텍스트 (기본: '미지정')
 * - render: 라벨을 커스텀 렌더링할 때 사용 (선택)
 */
const CodeDisplay = ({ category, code, fallback = "미지정", render }) => {
  const label = useMemo(() => getLabel(category, code, fallback), [category, code, fallback]);

  if (typeof render === "function") {
    return render(label, { category, code });
  }
  return <span>{label}</span>;
};

export default CodeDisplay;
