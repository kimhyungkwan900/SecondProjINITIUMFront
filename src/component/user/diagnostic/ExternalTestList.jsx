// src/components/ExternalTestList.jsx
import React, { useEffect, useState } from 'react';
import { fetchExternalTests, searchExternalTests } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

const ExternalTestList = ({ onSelectTest }) => {
  const [tests, setTests] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetchExternalTests()
      .then((res) => setTests(res.data))
      .catch(console.error);
  }, []);

  const handleSearch = () => {
    searchExternalTests(keyword)
      .then((res) => setTests(res.data))
      .catch(console.error);
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
    </div>
  );
};

export default ExternalTestList;