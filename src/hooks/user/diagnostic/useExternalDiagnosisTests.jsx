// src/hooks/useExternalDiagnosisTests.jsx
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
      .then((res) => setTests(Array.isArray(res) ? res : res.data || res)) // 🔹 배열 안전 처리
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [keyword]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  return { tests, loading, reload: loadTests };
};
