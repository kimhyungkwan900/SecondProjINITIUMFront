import React, { useEffect, useState, useCallback } from 'react';
import { fetchPagedExternalTests } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

const ExternalTestList = ({ onSelectTest }) => {
  const [tests, setTests] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadTests = useCallback(() => {
    fetchPagedExternalTests(keyword, page, 5)
      .then((res) => {
        setTests(res.content || []);
        setTotalPages(res.totalPages || 0);
      })
      .catch(console.error);
  }, [keyword, page]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const handleSearch = () => {
    setPage(0);
    loadTests();
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-[#222E8D] text-center">
        커리어넷 진단 검사
      </h2>

      {/* 검색창 */}
      <div className="flex gap-2 justify-center">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#28B8B2]"
        />
        <button
          onClick={handleSearch}
          className="bg-[#28B8B2] text-white px-4 py-2 rounded-lg hover:bg-[#1a807b] transition"
        >
          검색
        </button>
      </div>

      {/* 검사 목록 */}
      <ul className="space-y-4">
        {tests.map((test) => (
          <li
            key={test.id}
            onClick={() => onSelectTest(test)}
            className="cursor-pointer bg-gray-50 border border-gray-200 rounded-lg p-5 hover:bg-gray-100 transition"
          >
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {test.name}
            </h3>
            <p className="text-sm text-gray-600">
              제공기관: {test.provider || '기관 정보 없음'}
            </p>
          </li>
        ))}
      </ul>

      {/* 페이징 */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            disabled={idx === page}
            onClick={() => setPage(idx)}
            className={`px-3 py-1 rounded-lg border transition ${
              idx === page
                ? 'bg-[#28B8B2] text-white border-[#28B8B2]'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExternalTestList;
