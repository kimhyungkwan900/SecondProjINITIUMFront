import React, { useEffect, useState } from 'react';
import { fetchAllResultsByStudent, downloadResultPdf } from '../../../api/user/diagnostic/diagnosisApi.jsx';
import { Link } from 'react-router-dom';

const InternalResultsFeature = ({ studentNo }) => {
  const [internalResults, setInternalResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllResultsByStudent(studentNo)
      .then((data) => setInternalResults(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [studentNo]);

  const handleDownloadPdf = (resultId) => {
    downloadResultPdf(resultId)
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `internal_diagnosis_${resultId}.pdf`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(console.error);
  };

  if (loading) return <p>내부 진단검사 결과 로딩 중...</p>;

  return (
    <div>
      <h2>📊 내부 진단검사 결과</h2>
      {internalResults.length > 0 ? (
        <ul>
          {internalResults.map((result) => (
            <li key={result.resultId} style={{ marginBottom: '10px' }}>
              <Link to={`/diagnosis/result/${result.resultId}`}>
                {result.testName} | 점수: {result.totalScore} | 날짜: {result.completionDate}
              </Link>
              <button
                style={{ marginLeft: '10px', background: 'green', color: 'white' }}
                onClick={() => handleDownloadPdf(result.resultId)}
              >
                PDF 다운로드
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>내부 진단검사 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default InternalResultsFeature;
