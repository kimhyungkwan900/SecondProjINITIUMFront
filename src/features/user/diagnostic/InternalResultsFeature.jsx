import React, { useEffect, useState } from 'react';
import { fetchAllResultsByStudent } from '../../../api/user/diagnostic/diagnosisApi.jsx';

const InternalResultsFeature = ({ studentNo }) => {
  const [internalResults, setInternalResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllResultsByStudent(studentNo)
      .then((data) => setInternalResults(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [studentNo]);

  if (loading) return <p>내부 진단검사 결과 로딩 중...</p>;

  return (
    <div>
      <h2>📊 내부 진단검사 결과</h2>
      {internalResults.length > 0 ? (
        <ul>
          {internalResults.map((result) => (
            <li key={result.resultId}>
              <Link to={`/diagnosis/result/${result.resultId}`}>
                {result.testName} | 점수: {result.totalScore} | 날짜: {result.completionDate}
              </Link>
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
