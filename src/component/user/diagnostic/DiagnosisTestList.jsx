// src/components/DiagnosisTestList.jsx
import React, { useEffect, useState } from 'react';
import { fetchTests, searchTests } from '../../../api/user/diagnostic/diagnosisApi.jsx';

const DiagnosisTestList = ({ onSelectTest }) => {
  const [tests, setTests] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetchTests()
      .then((res) => setTests(res.data))
      .catch(console.error);
  }, []);

  const handleSearch = () => {
    searchTests(keyword)
      .then((res) => setTests(res.data))
      .catch(console.error);
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
    </div>
  );
};

export default DiagnosisTestList;