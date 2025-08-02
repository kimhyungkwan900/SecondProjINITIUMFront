import React, { useEffect, useState } from 'react';
import { fetchAllExternalResultsByStudent } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

const ExternalResultsFeature = ({ studentNo }) => {
  const [externalResults, setExternalResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllExternalResultsByStudent(studentNo)
      .then((data) => setExternalResults(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [studentNo]);

  const handleDownloadPdf = (resultUrl) => {
    // 🔹 CareerNet URL을 새 창에서 열기
    window.open(resultUrl, '_blank');
  };

  if (loading) return <p>외부 진단검사 결과 로딩 중...</p>;

  return (
    <div>
      <h2>🌐 외부 진단검사 결과</h2>
      {externalResults.length > 0 ? (
        <ul>
          {externalResults.map((result) => (
            <li key={result.inspectSeq} style={{ marginBottom: '10px' }}>
              {result.testName} | 
              <a href={result.resultUrl} target="_blank" rel="noreferrer">
                결과 URL
              </a>
              <button
                style={{ marginLeft: '10px', background: 'green', color: 'white' }}
                onClick={() => handleDownloadPdf(result.resultUrl)}
              >
                PDF 보기
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>외부 진단검사 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default ExternalResultsFeature;
