// src/components/DiagnosisResultChart.jsx
import React, { useEffect, useState } from 'react';
import { fetchResultSummary, fetchQuestions } from '../../../api/user/diagnostic/diagnosisApi.jsx';
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
  const [questionScores, setQuestionScores] = useState([]);

  useEffect(() => {
    // ✅ 총점 가져오기
    fetchResultSummary(resultId)
      .then((res) => setResult(res.data))
      .catch(console.error);

    // ✅ 문항별 점수 (현재는 mock 데이터, 백엔드 연동 시 실제 값으로 교체)
    fetchQuestions(resultId) // 실제 API는 testId 기반 조회
      .then((res) => {
        const mockScores = res.data.map((q, index) => ({
          question: `문항 ${index + 1}`,
          score: Math.floor(Math.random() * 10) + 1, // 예시 값
        }));
        setQuestionScores(mockScores);
      })
      .catch(console.error);
  }, [resultId]);

  // 📊 총점 그래프 데이터
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

  // 📊 문항별 점수 그래프 데이터
  const questionScoreData = {
    labels: questionScores.map((q) => q.question),
    datasets: [
      {
        label: '문항별 점수',
        data: questionScores.map((q) => q.score),
        backgroundColor: 'rgba(153,102,255,0.6)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>검사 점수 그래프</h2>

      {/* 📊 총점 요약 */}
      <div style={{ width: '400px', margin: '20px 0' }}>
        <h3>총점 요약</h3>
        <Bar data={totalScoreData} />
      </div>

      {/* 📊 문항별 점수 */}
      <div style={{ width: '600px', margin: '20px 0' }}>
        <h3>문항별 점수</h3>
        <Line data={questionScoreData} />
      </div>
    </div>
  );
};

export default DiagnosisResultChart;