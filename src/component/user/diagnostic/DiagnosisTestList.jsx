// src/component/user/diagnostic/DiagnosisTestList.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { fetchPagedTests } from '../../../api/user/diagnostic/diagnosisApi.jsx';

const DiagnosisTestList = ({ onSelectTest }) => {
  const [tests, setTests] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadTests = useCallback(() => {
    fetchPagedTests(keyword, page, 5)
      .then((res) => {
        setTests(res.content);
        setTotalPages(res.totalPages);
      })
      .catch(console.error);
  }, [keyword, page]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  const handleSearch = () => {
    setPage(0); // 검색 시 첫 페이지로 이동
    loadTests();
  };

  return (
    <div>
      <h2>내부 진단검사 목록</h2>
      <input
        type="text"
        placeholder="검색어"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      <ul>
        {tests.map((test) => (
          <li key={test.id} onClick={() => onSelectTest(test)}>
            {test.name}
          </li>
        ))}
      </ul>

      {/* 페이징 */}
      <div style={{ marginTop: '10px' }}>
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            disabled={idx === page}
            onClick={() => setPage(idx)}
            style={{
              margin: '0 4px',
              background: idx === page ? '#ccc' : '#fff',
            }}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DiagnosisTestList;
