import { useEffect, useState, useCallback } from 'react';
import { fetchExternalTests, searchExternalTests } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

export const useExternalDiagnosisTests = (keyword = '') => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTests = useCallback(() => {
    setLoading(true);
    const apiCall = keyword ? searchExternalTests(keyword) : fetchExternalTests();

    apiCall
      .then((res) => setTests(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [keyword]);

  useEffect(() => {
    loadTests();
  }, [loadTests]); // ✅ 이제 경고 사라짐

  return { tests, loading, reload: loadTests };
};
