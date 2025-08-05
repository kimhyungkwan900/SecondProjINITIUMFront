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

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-[#222E8D]">
        외부 진단검사 결과 로딩 중...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-xl font-bold text-[#222E8D] border-b pb-2">
        🌐 커리어넷 진단검사 결과
      </h2>

      {externalResults.length > 0 ? (
        <ul className="divide-y">
          {externalResults.map((result) => (
            <li
              key={result.inspectSeq}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-3"
            >
              <div className="text-gray-700">
                <span className="font-medium">{result.testName}</span>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <a
                  href={result.resultUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#28B8B2] underline hover:text-[#1a807b]"
                >
                  결과 URL
                </a>
                <button
                  className="bg-[#28B8B2] text-white px-3 py-1 rounded-lg hover:bg-[#1a807b] transition"
                  onClick={() => handleDownloadPdf(result.resultUrl)}
                >
                  PDF 보기
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">
          외부 진단검사 결과가 없습니다.
        </p>
      )}
    </div>
  );
};

export default ExternalResultsFeature;
