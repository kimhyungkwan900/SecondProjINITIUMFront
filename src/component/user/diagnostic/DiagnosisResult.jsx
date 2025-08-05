import React, { useEffect, useState } from 'react';
import { fetchResultSummary, downloadResultPdf } from '../../../api/user/diagnostic/diagnosisApi.jsx';

const DiagnosisResult = ({ resultId }) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchResultSummary(resultId)
      .then((res) => setResult(res))
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

  if (!result) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center text-gray-500">
        결과를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 space-y-4">
      <h2 className="text-2xl font-bold text-[#222E8D] text-center mb-4">
        검사 결과
      </h2>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-3">
        <p className="text-gray-700">
          <strong className="text-gray-800">학생번호:</strong> {result.studentNo}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-800">총점:</strong> {result.totalScore}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-800">해석:</strong> {result.interpretedMessage}
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={handleDownloadPdf}
          className="bg-[#28B8B2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1a807b] transition"
        >
          PDF 다운로드
        </button>
      </div>
    </div>
  );
};

export default DiagnosisResult;
