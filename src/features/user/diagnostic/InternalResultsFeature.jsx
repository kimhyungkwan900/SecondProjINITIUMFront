import React, { useEffect, useState } from 'react';
import { fetchPagedResultsByStudent, downloadResultPdf } from '../../../api/user/diagnostic/diagnosisApi.jsx';
import { Link } from 'react-router-dom';

/**
 * InternalResultsFeature
 * - 내부 진단검사 결과를 서버 페이징으로 표시
 * - props:
 *    - studentNo: 현재 학생 번호
 */
const InternalResultsFeature = ({ studentNo }) => {
  const [pageData, setPageData] = useState(null); // Page 객체
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // 0-base
  const [size, setSize] = useState(3);

  useEffect(() => {
    if (!studentNo) return;
    setLoading(true);
    fetchPagedResultsByStudent(studentNo, page, size)
      .then((data) => setPageData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [studentNo, page, size]);

  const handleDownloadPdf = (resultId) => {
    downloadResultPdf(resultId)
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `internal_diagnosis_${resultId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
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

  if (!pageData) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        데이터 없음
      </div>
    );
  }

  const { content = [], totalElements, totalPages, number, first, last } = pageData;

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-xl font-bold text-[#222E8D] border-b pb-2">
        📊 심리 진단검사 결과 (총 {totalElements}건)
      </h2>

      {content.length > 0 ? (
        <ul className="divide-y">
          {content.map((result) => (
            <li
              key={result.resultId}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-3"
            >
              <div className="text-gray-700">
                <Link
                  to={`/diagnosis/internal/result/${result.resultId}`}
                  className="font-medium text-[#28B8B2] hover:underline"
                >
                  {result.testName}
                </Link>
                <span className="ml-2 text-gray-500 text-sm">
                  | 점수: {result.totalScore} | 날짜:{' '}
                  {result.completionDate
                    ? new Date(result.completionDate).toLocaleString()
                    : '-'}
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

      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-gray-600">
          페이지 {number + 1} / {Math.max(totalPages, 1)}
        </div>
        <div className="flex gap-2 items-center">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={first}
          >
            이전
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => (last ? p : p + 1))}
            disabled={last}
          >
            다음
          </button>
          <select
            className="ml-2 border rounded px-2 py-1"
            value={size}
            onChange={(e) => {
              setPage(0);
              setSize(parseInt(e.target.value, 10));
            }}
          >
            <option value={3}>3개</option>
            <option value={5}>5개</option>
            <option value={10}>10개</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default InternalResultsFeature;
