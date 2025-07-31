// src/component/user/diagnostic/ExternalTestList.jsx
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
      <h2>외부 진단검사 목록</h2>
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
            {test.name} - {test.provider}
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

export default ExternalTestList;
