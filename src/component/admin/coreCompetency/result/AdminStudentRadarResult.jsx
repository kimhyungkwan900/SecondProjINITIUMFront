// AdminStudentRadarResult.jsx
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

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const AdminStudentRadarResult = ({ assessmentNo }) => {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);

  const [averages, setAverages] = useState([]);        // 개인 평균(하위역량별)

  const [loadingList, setLoadingList] = useState(false);
  const [loadingChart, setLoadingChart] = useState(false);
  const [error, setError] = useState("");

  // 학생 목록 로드
  useEffect(() => {
    setSelected(null);
    setAverages([]);
    if (!assessmentNo) { setStudents([]); return; }

    (async () => {
      setLoadingList(true);
      setError("");
      try {
        const url = `/api/admin/core-competency/result/assessments/${assessmentNo}/response/students`;
        const { data } = await axios.get(url);
        setStudents(Array.isArray(data) ? data : []);
      } catch {
        setError("학생 목록을 불러오지 못했습니다.");
        setStudents([]);
      } finally {
        setLoadingList(false);
      }
    })();
  }, [assessmentNo]);

  // 선택 학생의 하위역량 평균 로드
  const loadAverages = async (student) => {
    if (!student) return;
    setLoadingChart(true);
    setError("");
    try {
      // 개인 평균
      const url = `/api/admin/core-competency/result/assessments/${assessmentNo}/students/${student.studentNo}/sub-competency/avg`;
      const { data } = await axios.get(url);
      setAverages(Array.isArray(data) ? data : []);
    } catch {
      setError("평균 데이터를 불러오지 못했습니다.");
      setAverages([]);
    } finally {
      setLoadingChart(false);
    }
  };

  // 레이더 차트 데이터 구성
  const labels = useMemo(() => averages.map((a) => a.subCategoryName), [averages]);
  const personalData = useMemo(() => averages.map((a) => Number(a.average ?? 0)), [averages]);

  // 전체 평균 = 2.5 고정
  const overallData = useMemo(() => labels.map(() => 2.5), [labels]);

  const datasets = useMemo(() => {
    const base = [
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
    ];
    return base;
  }, [personalData,overallData]);

  const radarData = useMemo(() => ({ labels, datasets }), [labels, datasets]);

  const radarOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: 8 },
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
          pointLabels: {
            font: { size: 12 },
            color: "#555",
          },
        },
      },
    }),
    []
  );

  return (
    <div className="w-full grid grid-cols-12 gap-6">
      {/* 왼쪽: 학생 정보 테이블 */}
      <div className="col-span-5">
        <div className="rounded-2xl shadow p-4 border bg-white h-[680px] flex flex-col">
          <div className="mb-3 text-lg font-semibold">학생 목록</div>
          {loadingList ? (
            <div className="text-sm text-gray-500">불러오는 중…</div>
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : students.length === 0 ? (
            <div className="text-sm text-gray-500">학생 데이터가 없다.</div>
          ) : (
            <div className="overflow-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr className="text-left">
                    <th className="px-3 py-2 border-b">학과</th>
                    <th className="px-3 py-2 border-b">학년</th>
                    <th className="px-3 py-2 border-b">학번</th>
                    <th className="px-3 py-2 border-b">성명</th>
                    <th className="px-3 py-2 border-b">응답일시</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => {
                    const isSelected = selected?.studentNo === s.studentNo;
                    return (
                      <tr
                        key={s.studentNo}
                        onClick={() => {
                          const next = isSelected ? null : s;
                          setSelected(next);
                          setAverages([]);
                          if (next) loadAverages(next);
                        }}
                        className={`cursor-pointer hover:bg-gray-100 ${isSelected ? "bg-indigo-50" : ""}`}
                      >
                        <td className="px-3 py-2 border-b">{s.subjectCode}</td>
                        <td className="px-3 py-2 border-b">{s.schoolYear}</td>
                        <td className="px-3 py-2 border-b">{s.studentNo}</td>
                        <td className="px-3 py-2 border-b">{s.name}</td>
                        <td className="px-3 py-2 border-b">{s.completeDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽: 레이더 차트 */}
      <div className="col-span-7">
        <div className="rounded-2xl shadow p-4 border bg-white h-[680px] flex flex-col">
          <div className="mb-3 text-lg font-semibold">하위역량별 평균 점수</div>
          {!selected ? (
            <div className="text-sm text-gray-500 text-center">왼쪽에서 학생을 선택하세요.</div>
          ) : loadingChart ? (
            <div className="text-sm text-gray-500">차트 불러오는 중…</div>
          ) : labels.length === 0 ? (
            <div className="text-sm text-gray-500">차트 데이터가 없다.</div>
          ) : (
            <div className="flex-1 min-h-0">
              <div className="h-full">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>
          )}
          {selected && (
            <div className="mt-4 text-sm text-gray-600">
              <span className="font-medium">{selected.name}</span> / {selected.studentNo} · {selected.subjectCode} · {selected.schoolYear}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStudentRadarResult;
