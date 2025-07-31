import React from 'react';
import DiagnosisResult from '../../../component/user/diagnostic/DiagnosisResult.jsx';
import DiagnosisResultChart from '../../../component/user/diagnostic/DiagnosisResultChart.jsx';

const DiagnosisResultPage = ({ resultId }) => {
  return (
    <div>
      <DiagnosisResult resultId={resultId} />
      <DiagnosisResultChart resultId={resultId} />
    </div>
  );
};

export default DiagnosisResultPage;