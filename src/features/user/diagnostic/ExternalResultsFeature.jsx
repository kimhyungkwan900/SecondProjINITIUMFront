import React, { useEffect, useState } from 'react';
import { fetchAllExternalResultsByStudent } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';


/**
 *  ExternalResultsFeature
 * - 특정 학생 번호(studentNo)에 대한 CareerNet 외부 진단검사 결과 목록을 조회 및 표시
 * - 결과 URL 클릭 시 새 창에서 검사 결과 페이지를 오픈
 */
const ExternalResultsFeature = ({ studentNo }) => {
  const [externalResults, setExternalResults] = useState([]); // 외부 진단검사 결과 목록
  const [loading, setLoading] = useState(true);               // 로딩 상태 관리

  useEffect(() => {
    fetchAllExternalResultsByStudent(studentNo)
      .then((data) => setExternalResults(data)) // API 응답 데이터 저장
      .catch(console.error)                     // 에러 로그 출력
      .finally(() => setLoading(false));        // 로딩 종료
  }, [studentNo]);

  // CareerNet URL을 새 창에서 열기
  const handleDownloadPdf = (resultUrl) => {
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
    <div className="bg-white rounded-xl p-8">
      {/* 제목 */}
      <h2 className="text-2xl font-bold text-[#222E8D] border-b-2 border-gray-200 pb-3 mb-6 flex items-center gap-2">
        🌐 커리어넷 진단검사 결과
      </h2>
      
      {externalResults.length > 0 ? (
        <ul className="space-y-4">
          {externalResults.map((result) => (
            <li
              key={result.inspectSeq}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
            >
              {/* 검사명 */}
              <div className="text-gray-800 font-medium">
                {result.testName}
              </div>
          
              {/* 버튼 */}
              <div className="mt-3 sm:mt-0">
                <button
                  className="bg-[#222E8D] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1a1f6b] transition"
                  onClick={() => handleDownloadPdf(result.resultUrl)}
                >
                  결과 보기
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-6">
          외부 진단검사 결과가 없습니다.
        </p>
      )}
    </div>


  );
};

export default ExternalResultsFeature;
