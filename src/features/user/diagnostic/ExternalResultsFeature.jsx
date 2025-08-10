import React, { useEffect, useState } from 'react';
import { fetchAllExternalResultsByStudent } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

/**
 * ExternalResultsFeature
 * - 특정 학생 번호(studentNo)의 CareerNet 외부 진단검사 결과 목록
 * - 부모 페이지가 카드/레이아웃을 감싸고, 본 컴포넌트는 콘텐츠만 렌더
 */
const ExternalResultsFeature = ({ studentNo }) => {
  const [externalResults, setExternalResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllExternalResultsByStudent(studentNo)
      .then((data) => setExternalResults(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [studentNo]);

  const handleDownloadPdf = (resultUrl) => {
    window.open(resultUrl, '_blank');
  };

  if (loading) {
    return <div className="text-center text-gray-400 py-8">외부 진단검사 결과 로딩 중...</div>;
  }

  return (
    <section className="space-y-6">
      {/* 리스트 카드 (가이드: bg-gray-50 + border + rounded + shadow-sm) */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
        {externalResults.length > 0 ? (
          <ul className="space-y-4">
            {externalResults.map((result) => (
              <li
                key={result.inspectSeq}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition"
              >
                <div className="text-gray-800 font-medium">{result.testName}</div>
                <div className="mt-3 sm:mt-0">
                  <button
                    className="bg-[#222E8D] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-800 transition"
                    onClick={() => handleDownloadPdf(result.resultUrl)}
                  >
                    결과 보기
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-400 py-8">외부 진단검사 결과가 없습니다.</div>
        )}
      </div>
    </section>
  );
};

export default ExternalResultsFeature;
