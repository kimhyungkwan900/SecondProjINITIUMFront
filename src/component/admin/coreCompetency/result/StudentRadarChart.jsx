// StudentRadarChart.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js 모듈 등록 (한 번만 실행돼도 안전)
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);


const StudentRadarChart = ({ assessmentNo, student }) => {
  const [averages, setAverages] = useState([]);    // [{subCategoryName, average}, ...]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 선택이 바뀌면 평균점수 로드
  useEffect(() => {
    setAverages([]);
    setError("");

    if (!assessmentNo || !student?.studentNo) return;

    (async () => {
      setLoading(true);
      try {
        const url = `/api/admin/core-competency/result/assessments/${assessmentNo}/students/${student.studentNo}/sub-competency/avg`;
        const { data } = await axios.get(url);
        setAverages(Array.isArray(data) ? data : []);
      } catch {
        setError("평균 데이터를 불러오지 못했습니다.");
        setAverages([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [assessmentNo, student?.studentNo]);

  // 차트 데이터 구성
  const labels = useMemo(() => averages.map((a) => a.subCategoryName), [averages]);
  const personalData = useMemo(() => averages.map((a) => Number(a.average ?? 0)), [averages]);
  const overallData = useMemo(() => labels.map(() => 3.13), [labels]); // 전체 평균(예시) 3.13 고정

  const datasets = useMemo(() => [
    {
      label: "개인",
      data: personalData,
      borderColor: "#e53935",
      backgroundColor: "rgba(229,57,53,0.08)",
      pointBackgroundColor: "#e53935",
      pointBorderColor: "#e53935",
      fill: false,
      borderWidth: 2,
      pointRadius: 2.5,
      pointHoverRadius: 3.5,
    },
    {
      label: "전체",
      data: overallData,
      borderColor: "#43a047",
      backgroundColor: "rgba(67,160,71,0.08)",
      pointBackgroundColor: "#43a047",
      pointBorderColor: "#43a047",
      fill: false,
      borderWidth: 2,
      pointRadius: 2.5,
      pointHoverRadius: 3.5,
    },
  ], [personalData, overallData]);

  const radarData = useMemo(() => ({ labels, datasets }), [labels, datasets]);

  const radarOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: 15 },
      plugins: {
        legend: {
          position: "bottom",
          labels: { usePointStyle: true, boxWidth: 10, boxHeight: 10 },
        },
        tooltip: { intersect: false },
      },
      elements: {
        line: { tension: 0, borderJoinStyle: "round" },
        point: { hitRadius: 8 },
      },
      scales: {
        r: {
          min: 0,
          max: 5,
          ticks: { stepSize: 1, showLabelBackdrop: false },
          grid: { circular: true },
          angleLines: { color: "rgba(0,0,0,0.1)" },
          pointLabels: { font: { size: 15 }, color: "#555" },
        },
      },
    }),
    []
  );

  // 상태별 렌더
  if (!student) {
    return <div className="text-sm text-gray-500 text-center">왼쪽에서 학생을 선택하세요.</div>;
  }
  if (loading) {
    return <div className="text-sm text-gray-500">차트 불러오는 중…</div>;
  }
  if (error) {
    return <div className="text-sm text-red-600">{error}</div>;
  }
  if (labels.length === 0) {
    return <div className="text-sm text-gray-500">차트 데이터가 없습니다.</div>;
  }

  return (
    <div className="flex-1 min-h-0">
      <div className="h-[500px]">
        <Radar data={radarData} options={radarOptions} />
      </div>
    </div>
  );
};

export default StudentRadarChart;
