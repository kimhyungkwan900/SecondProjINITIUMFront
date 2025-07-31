import { useEffect, useState, useCallback } from 'react';
import { searchTests, fetchPagedTests } from '../../../api/user/diagnostic/diagnosisApi.jsx';

export const useDiagnosisTests = (keyword = '', page = 0, size = 10) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTests = useCallback(() => {
    setLoading(true);
    const apiCall = keyword ? searchTests(keyword) : fetchPagedTests(keyword, page, size);

    apiCall
      .then((res) => setTests(res.data.content || res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [keyword, page, size]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  return { tests, loading, reload: loadTests };
};
