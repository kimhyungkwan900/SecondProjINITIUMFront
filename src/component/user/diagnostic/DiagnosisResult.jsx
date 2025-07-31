// src/components/DiagnosisResult.jsx
import React, { useEffect, useState } from 'react';
import { fetchResultSummary, downloadResultPdf } from '../api/diagnosisApi.jsx';

const DiagnosisResult = ({ resultId }) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchResultSummary(resultId)
      .then((res) => setResult(res.data))
      .catch(console.error);
  }, [resultId]);

  const handleDownloadPdf = () => {
    downloadResultPdf(resultId)
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `diagnosis_result_${resultId}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(console.error);
  };

  return (
    <div>
      {result && (
        <>
          <h2>검사 결과</h2>
          <p>학생번호: {result.studentNo}</p>
          <p>총점: {result.totalScore}</p>
          <p>해석: {result.interpretedMessage}</p>
          <button onClick={handleDownloadPdf}>PDF 다운로드</button>
        </>
      )}
    </div>
  );
};

export default DiagnosisResult;