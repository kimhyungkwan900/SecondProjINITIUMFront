import React, { useEffect, useState } from 'react';
import { fetchPagedResultsByStudent, downloadResultPdf } from '../../../api/user/diagnostic/diagnosisApi.jsx';
import { Link } from 'react-router-dom';
import SectionTitle from '../../../component/common/SectionTitle.jsx';

/**
 * 날짜 포맷터: YYYY-MM-DD HH:mm:ss
 */
const formatDate = (value) => {
  if (!value) return '-';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '-';
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
};

/**
 * InternalResultsFeature
 * - 내부 진단검사 결과(서버 페이징)
 * - 부모 페이지가 레이아웃/카드를 감싸고, 본 컴포넌트는 콘텐츠만 렌더
 */
const InternalResultsFeature = ({ studentNo }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // 0-based
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
    return <div className="text-center text-gray-400 py-8">내부 진단검사 결과 로딩 중...</div>;
  }

  if (!pageData) {
    return <div className="text-center text-gray-400 py-8">데이터 없음</div>;
  }

  const { content = [], totalElements, totalPages, number, first, last } = pageData;

  return (
    <section className="space-y-6">
      {/* 섹션 헤더 (파란 막대 + 제목) */}
      <SectionTitle size={22} showDivider>
        심리 진단검사 결과
        <span className="text-gray-500 text-base font-normal">(총 {totalElements}건)</span>
      </SectionTitle>
      <hr className="my-2 border-gray-200" />

      {/* 리스트 카드 (가이드: bg-gray-50 + border + rounded + shadow-sm) */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
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
                    | 점수: {result.totalScore} | 날짜: {formatDate(result.completionDate)}
                  </span>
                </div>

                <button
                  className="bg-[#222E8D] text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-800 transition mt-2 sm:mt-0"
                  onClick={() => handleDownloadPdf(result.resultId)}
                >
                  PDF 다운로드
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-400 py-8">내부 진단검사 결과가 없습니다.</div>
        )}
      </div>

      {/* 페이징 바 (가이드 톤) */}
      <div className="mt-2 flex justify-between items-center">
        <div className="text-sm text-gray-600">페이지 {number + 1} / {Math.max(totalPages, 1)}</div>
        <div className="flex gap-2 items-center">
          <button
            className="w-auto rounded border border-gray-300 px-2 py-1 text-sm hover:bg-gray-50 transition disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={first}
          >
            이전
          </button>
          <button
            className="w-auto rounded border border-gray-300 px-2 py-1 text-sm hover:bg-gray-50 transition disabled:opacity-50"
            onClick={() => setPage((p) => (last ? p : p + 1))}
            disabled={last}
          >
            다음
          </button>
          <select
            className="w-auto rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
    </section>
  );
};

export default InternalResultsFeature;
