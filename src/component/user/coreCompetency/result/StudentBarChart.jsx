// StudentBarChart.jsx (Bar 전용 + 세로/가로 전환 지원)
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

/**
 * props
 * - assessmentNo: 문자열 코드 (예: "ASMT-2025-0001")
 * - student: { studentNo } 또는 "학번" 문자열
 * - orientation: "vertical" | "horizontal" (기본 "vertical")
 * - overallBaseline: 전체 평균 기준선 값(기본 2.5)
 * - buildUrl: (선택) (assessmentNo, studentNo) => string
 */
const StudentBarChart = ({
  assessmentNo,
  student,
  orientation = "vertical",
  overallBaseline = 2.5,
  buildUrl,
}) => {
  const [averages, setAverages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const studentNo = useMemo(() => (typeof student === "string" ? student : student?.studentNo), [student]);

  const makeUrl = useMemo(
    () =>
      buildUrl ??
      ((asmt, stu) =>
        `/api/admin/core-competency/result/assessments/${asmt}/students/${stu}/sub-competency/avg`),
    [buildUrl]
  );

  useEffect(() => {
    setAverages([]); setError("");
    if (!assessmentNo || !studentNo) return;

    (async () => {
      setLoading(true);
      try {
        const url = makeUrl(assessmentNo, studentNo);
        const { data } = await axios.get(url);
        const arr = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
        const fixed = arr.map(x => ({
          subCategoryName: x.subCategoryName ?? x.subCompetencyName ?? x.name ?? "",
          average: Number(x.average ?? x.avg ?? x.value ?? x.score ?? 0),
        }));
        setAverages(fixed);
      } catch{
        setError("평균 데이터를 불러오지 못했습니다."); setAverages([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [assessmentNo, studentNo, makeUrl]);

  const labels = useMemo(() => averages.map(a => a.subCategoryName), [averages]);
  const personalData = useMemo(() => averages.map(a => Number(a.average ?? 0)), [averages]);
  const overallData  = useMemo(() => labels.map(() => overallBaseline), [labels, overallBaseline]);

  const isHorizontal = orientation === "horizontal";

  const barData = useMemo(() => ({
    labels,
    datasets: [
      {
        label: "개인",
        data: personalData,
        backgroundColor: "rgba(229,57,53,0.35)",
        borderColor: "#e53935",
        borderWidth: 1,
        maxBarThickness: 28,
      },
      {
        label: "전체",
        data: overallData,
        backgroundColor: "rgba(67,160,71,0.35)",
        borderColor: "#43a047",
        borderWidth: 1,
        maxBarThickness: 28,
      },
    ],
  }), [labels, personalData, overallData]);

  const barOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: isHorizontal ? "y" : "x",            // ← 가로형 전환 핵심
    layout: { padding: 8 },
    plugins: {
      legend: { position: "bottom" },
      tooltip: { intersect: false, mode: "index" },
    },
    scales: {
      // 값이 그려지는 축(가로형이면 x, 세로형이면 y)
      [isHorizontal ? "x" : "y"]: { min: 0, max: 4, ticks: { stepSize: 1 } },
      // 카테고리 축(가로형이면 y, 세로형이면 x)
      [isHorizontal ? "y" : "x"]: { ticks: { autoSkip: false, maxRotation: 0 } },
    },
  }), [isHorizontal]);

  if (!studentNo) return <div className="text-sm text-gray-500 text-center">학생 정보가 없습니다.</div>;
  if (loading)     return <div className="text-sm text-gray-500">차트를 불러오는 중입니다…</div>;
  if (error)       return <div className="text-sm text-red-600">{error}</div>;
  if (!labels.length) return <div className="text-sm text-gray-500">차트 데이터가 없습니다.</div>;

  return (
    <div className="flex-1 min-h-0">
      <div className="h-[800px]">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default StudentBarChart;
