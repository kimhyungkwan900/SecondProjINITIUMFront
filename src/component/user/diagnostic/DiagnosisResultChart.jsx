import React, { useEffect, useState } from 'react';
import { fetchResultSummary } from '../../../api/user/diagnostic/diagnosisApi.jsx';
import { fetchResultDetails } from '../../../api/user/diagnostic/diagnosisApi.jsx';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
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

  const totalScoreData = {
    labels: ['총점'],
    datasets: [
      {
        label: '총점',
        data: result ? [result.totalScore] : [0],
        backgroundColor: ['rgba(75,192,192,0.6)'],
      },
    ],
  };

  const questionScoreData = {
    labels: details.map((d, idx) => `문항 ${idx + 1}`),
    datasets: [
      {
        label: '문항별 점수',
        data: details.map((d) => d.score),
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>검사 점수 그래프</h2>
      <div style={{ width: '400px', margin: '20px 0' }}>
        <h3>총점 요약</h3>
        <Bar data={totalScoreData} />
      </div>
      <div style={{ width: '600px', margin: '20px 0' }}>
        <h3>문항별 점수</h3>
        <Line data={questionScoreData} />
      </div>
    </div>
  );
};

export default DiagnosisResultChart;
