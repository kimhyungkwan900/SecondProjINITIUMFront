import axios from "axios";
import { useEffect, useMemo, useState } from "react";

/**
 * CoreCompetecnyCategoryScore
 * - 지정한 평가(assessmentNo)에서 특정 학생(student)의 하위역량별 평균 점수(나의 점수)와
 *   코호트 평균(또는 기준값)을 표 형태로 보여주는 컴포넌트입니다.
 * - 같은 핵심역량(coreName)끼리는 "핵심역량" 셀을 rowSpan으로 합쳐 보여줍니다.
 */
const CoreCompetecnyCategoryScore = ({
  assessmentNo,
  student,
  buildUrlMy,
  buildUrlCohort,
  overallBaseline = 2.5,
}) => {
  const [rows, setRows] = useState([]);   // [{ coreId?, coreName, subCategoryId, subCategoryName, myAvg, cohortAvg, groupKey }]
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // 학번 추출(문자열/객체 모두 대응)
  const studentNo = useMemo(
    () => (typeof student === "string" ? student : student?.studentNo),
    [student]
  );

  // 나의 평균 URL 빌더(참조 안정화)
  const makeUrlMy = useMemo(
    () =>
      buildUrlMy ??
      ((assessmentNo, studentNo) =>
        `/api/admin/core-competency/result/assessments/${assessmentNo}/students/${studentNo}/sub-competency/avg`),
    [buildUrlMy]
  );

  // 코호트 평균 URL 빌더(없으면 null)
  const makeUrlCohort = useMemo(() => buildUrlCohort ?? null, [buildUrlCohort]);

  // 역량수준 매핑: avg > 3.5 우수, avg < 2.0 미흡, 그 외 보통 (경계 포함X)
  const getLevel = (avg) => {
    const v = Number(avg);
    if (!Number.isFinite(v)) {
      return { text: "미정", cls: "bg-gray-100 text-gray-500" };
    }
    if (v > 3.5) return { text: "우수", cls: "bg-emerald-100 text-emerald-700" };
    if (v < 2.0) return { text: "미흡", cls: "bg-rose-100 text-rose-700" };
    return { text: "보통", cls: "bg-blue-100 text-blue-700" };
  };

  useEffect(() => {
    setRows([]);
    setError("");
    if (!assessmentNo || !studentNo) return;

    (async () => {
      setLoading(true);
      try {
        // 1) 나의 평균
        const urlMy = makeUrlMy(assessmentNo, studentNo);
        const { data: myDataRaw } = await axios.get(urlMy);
        const myData = Array.isArray(myDataRaw)
          ? myDataRaw
          : Array.isArray(myDataRaw?.data)
          ? myDataRaw.data
          : [];

        // 2) 코호트 평균(선택)
        let cohortMap = new Map(); // subCategoryId -> average
        if (makeUrlCohort) {
          try {
            const urlCohort = makeUrlCohort(assessmentNo);
            const { data: cohortRaw } = await axios.get(urlCohort);
            const cohort = Array.isArray(cohortRaw)
              ? cohortRaw
              : Array.isArray(cohortRaw?.data)
              ? cohortRaw.data
              : [];
            cohort.forEach((item) => {
              const id = item.subCategoryId ?? item.id;
              const avg = Number(item.average ?? item.avg ?? 0);
              if (id != null) cohortMap.set(id, avg);
            });
          } catch {
            // 코호트 평균 호출 실패 시 폴백(overallBaseline)
          }
        }

        // 3) 테이블 행 구성
        const mapped = myData.map((x) => {
          const coreId = x.coreCategoryId ?? x.coreId ?? null; // 백엔드가 내려주면 사용
          const coreName = x.coreCategoryName ?? "-";
          const subCategoryId = x.subCategoryId ?? x.id;
          const subCategoryName = x.subCategoryName ?? x.name ?? "-";
          const myAvg = Number(x.average ?? x.avg ?? 0);
          const cohortAvg = cohortMap.size
            ? Number(cohortMap.get(subCategoryId) ?? overallBaseline)
            : overallBaseline;

          // 그룹 키: 가능한 경우 coreId를 우선 사용(이름 중복 대비), 없으면 coreName 사용
          const groupKey = coreId != null ? `id:${coreId}` : `name:${coreName}`;

          return {
            coreId,
            coreName,
            subCategoryId,
            subCategoryName,
            myAvg,
            cohortAvg,
            groupKey,
          };
        });

        // 정렬: 핵심역량명 → 하위역량명
        mapped.sort((a, b) => {
          const byCore = a.coreName.localeCompare(b.coreName, "ko");
          if (byCore !== 0) return byCore;
          return a.subCategoryName.localeCompare(b.subCategoryName, "ko");
        });

        // 4) 그룹별 rowSpan 계산
        // groupKey 기준으로 몇 행을 묶을지 계산하여 Map에 저장
        const groupCounts = new Map();
        for (const r of mapped) {
          groupCounts.set(r.groupKey, (groupCounts.get(r.groupKey) ?? 0) + 1);
        }

        // 각 행에 groupMeta를 추가: 그룹 내 첫 번째 행인지, rowSpan은 얼마인지
        const enhanced = [];
        let prevKey = null;
        for (const r of mapped) {
          const isFirstOfGroup = r.groupKey !== prevKey;
          const rowSpan = isFirstOfGroup ? groupCounts.get(r.groupKey) : 0;
          enhanced.push({ ...r, isFirstOfGroup, rowSpan });
          prevKey = r.groupKey;
        }

        setRows(enhanced);
      } catch {
        setError("하위역량별 평균 점수를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [assessmentNo, studentNo, makeUrlMy, makeUrlCohort, overallBaseline]);

  if (!studentNo)  return <div className="text-sm text-gray-500">학생 정보가 없습니다.</div>;
  if (loading)     return <div className="text-sm text-gray-500">로딩 중…</div>;
  if (error)       return <div className="text-sm text-red-600">{error}</div>;
  if (!rows.length) return <div className="text-sm text-gray-500">표시할 데이터가 없습니다.</div>;

  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="min-w-full text-sm text-center">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 border">핵심역량</th>
            <th className="px-4 py-3 border">하위역량</th>
            <th className="px-4 py-3 border">나의점수</th>
            <th className="px-4 py-3 border">평균점수</th>
            <th className="px-4 py-3 border">역량수준</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const level = getLevel(r.myAvg);
            return (
              <tr key={r.subCategoryId} className="hover:bg-gray-50">
                {/* 핵심역량 셀: 그룹의 첫 번째 행에만 표시 + rowSpan 적용 */}
                {r.isFirstOfGroup && (
                  <td className="px-4 py-3 border align-middle font-medium" rowSpan={r.rowSpan}>
                    {r.coreName}
                  </td>
                )}

                <td className="px-4 py-3 border text-left">{r.subCategoryName}</td>
                <td className="px-4 py-3 border">{r.myAvg.toFixed(2)}</td>
                <td className="px-4 py-3 border">{r.cohortAvg.toFixed(2)}</td>
                <td className="px-4 py-3 border">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${level.cls}`}>
                    {level.text}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CoreCompetecnyCategoryScore;
