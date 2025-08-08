import React, { useEffect, useState, useCallback } from 'react';
import { fetchPagedTests } from '../../../api/user/diagnostic/diagnosisApi.jsx';
import { useNavigate } from 'react-router-dom';

const DiagnosisTestList = ({ onSelectTest }) => {
  const [tests, setTests] = useState([]);        // 검사 목록 상태
  const [keyword, setKeyword] = useState('');   // 검색 키워드 상태
  const [page, setPage] = useState(0);           // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const navigate = useNavigate();               // 페이지 이동 훅

  /**
   * 검사 목록 로드 함수
   * - useCallback으로 메모이제이션 (keyword, page 변경 시 재생성)
   * - API 호출 시 한 페이지당 3개 제한
   */
  const loadTests = useCallback(() => {
    fetchPagedTests(keyword, page, 3)
      .then((res) => {
        setTests(res.content);
        setTotalPages(res.totalPages);
      })
      .catch(console.error);
  }, [keyword, page]);

  // 컴포넌트 마운트 및 page/keyword 변경 시 검사 목록 로드
  useEffect(() => {
    loadTests();
  }, [loadTests]);

  // 검색 버튼 클릭 시 첫 페이지로 이동 후 목록 다시 로드
  const handleSearch = () => {
    setPage(0);
    loadTests();
  };

  /**
   *  검사 항목 클릭 시 동작
   * - 부모 콜백(onSelectTest) 호출
   * - 해당 검사 상세 페이지로 이동
   */
  const handleTestClick = (test) => {
    if (onSelectTest) {
      onSelectTest(test);
    }
    navigate(`/diagnosis/internal/${test.id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-[#222E8D] text-center">
        심리 진단 검사
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
          className="bg-[#222E8D] text-white px-4 py-2 rounded-lg hover:bg-[#1a1f6b] transition"
        >
          검색
        </button>
      </div>

      {/* 검사 목록 */}
      <ul className="space-y-4">
        {tests.map((test) => (
          <li
            key={test.id}
            onClick={() => handleTestClick(test)}
            className="cursor-pointer bg-gray-50 border border-gray-200 rounded-lg p-5 hover:bg-gray-100 transition"
          >
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              {test.name}
            </h3>
            <p className="text-sm text-gray-600 leading-snug">
              {test.description || '검사에 대한 설명이 준비되어 있습니다.'}
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
            className={`px-3 py-1 rounded-lg border transition font-medium ${
              idx === page
                ? 'bg-[#222E8D] text-white border-[#222E8D]'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-[#222E8D]'
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DiagnosisTestList;
