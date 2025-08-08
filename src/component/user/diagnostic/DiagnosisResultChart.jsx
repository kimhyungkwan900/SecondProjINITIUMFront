import React, { useEffect, useState } from 'react';
import { fetchResultSummary, fetchResultDetails } from '../../../api/user/diagnostic/diagnosisApi.jsx';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DiagnosisResultChart = ({ resultId }) => {
  const [result, setResult] = useState(null);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchResultSummary(resultId).then(setResult).catch(console.error);
    fetchResultDetails(resultId).then(setDetails).catch(console.error);
  }, [resultId]);

  const questionScoreData = {
    labels: details.map((d, idx) => `문항 ${idx + 1}`),
    datasets: [
      {
        label: '문항별 점수',
        data: details.map((d) => d.score),
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 2,
        tension: 0.2,
        fill: true,
      },
    ],
  };

  return (
    <div className="p-4 space-y-6">
      {/* 총점 카드 */}
      <div className="bg-white p-6 rounded-xl shadow text-center border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-700">🧠 총점 요약</h2>
        <p className="text-5xl font-bold text-blue-600 mt-2">
          {result?.totalScore ?? 0}점
        </p>
        {result?.interpretedMessage && (
          <p className="text-sm text-gray-600 italic mt-3">
            해석: {result.interpretedMessage}
          </p>
        )}
      </div>

      {/* 문항별 점수 그래프 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">📈 문항별 점수</h3>
        <div style={{ width: '100%', maxWidth: '700px' }}>
          <Line data={questionScoreData} />
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResultChart;
