import { useEffect, useState, useCallback } from 'react';
import { fetchExternalTests, searchExternalTests } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

export const useExternalDiagnosisTests = (keyword = '') => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTests = useCallback(() => {
    setLoading(true);
    const apiCall = keyword
      ? searchExternalTests(keyword)
      : fetchExternalTests();

    apiCall
      .then((res) => {
        const data = Array.isArray(res) ? res : res.data || res;
        setTests(data);
        if (data.length === 0) {
          alert("검색 결과가 없습니다.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("외부 검사 목록을 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, [keyword]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  return { tests, loading, reload: loadTests };
};
