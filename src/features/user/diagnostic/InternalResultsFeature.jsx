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

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-[#222E8D]">
        내부 진단검사 결과 로딩 중...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-xl font-bold text-[#222E8D] border-b pb-2">
        📊 심리 진단검사 결과
      </h2>

      {internalResults.length > 0 ? (
        <ul className="divide-y">
          {internalResults.map((result) => (
            <li
              key={result.resultId}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-3"
            >
              <div className="text-gray-700">
                <Link
                  to={`/diagnosis/result/${result.resultId}`}
                  className="font-medium text-[#28B8B2] hover:underline"
                >
                  {result.testName}
                </Link>
                <span className="ml-2 text-gray-500 text-sm">
                  | 점수: {result.totalScore} | 날짜: {result.completionDate}
                </span>
              </div>
              <button
                className="bg-[#28B8B2] text-white px-3 py-1 rounded-lg hover:bg-[#1a807b] transition mt-2 sm:mt-0"
                onClick={() => handleDownloadPdf(result.resultId)}
              >
                PDF 다운로드
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">
          내부 진단검사 결과가 없습니다.
        </p>
      )}
    </div>
  );
};

export default InternalResultsFeature;
