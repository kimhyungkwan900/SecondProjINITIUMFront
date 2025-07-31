import React from 'react';
import { useParams } from 'react-router-dom';
import DiagnosisResult from '../../../component/user/diagnostic/DiagnosisResult.jsx';
import DiagnosisResultChart from '../../../component/user/diagnostic/DiagnosisResultChart.jsx';

const DiagnosisResultPage = () => {
  const { resultId } = useParams(); // 🔹 URL 파라미터

  return (
    <div>
      <DiagnosisResult resultId={resultId} />
      <DiagnosisResultChart resultId={resultId} />
    </div>
  );
};

export default DiagnosisResultPage;
