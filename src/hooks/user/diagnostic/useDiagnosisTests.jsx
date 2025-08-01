import { useEffect, useState, useCallback } from 'react';
import { searchTests, fetchPagedTests } from '../../../api/user/diagnostic/diagnosisApi.jsx';

export const useDiagnosisTests = (keyword = '', page = 0, size = 10) => {
  const [tests, setTests] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadTests = useCallback(() => {
    setLoading(true);
    const apiCall = keyword
      ? searchTests(keyword)
      : fetchPagedTests(keyword, page, size);

    apiCall
      .then((res) => {
        setTests(res.content || res); // Page 타입 또는 List 타입
        setTotalPages(res.totalPages || 1);
      })
      .catch((err) => {
        console.error(err);
        alert("검사 목록을 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, [keyword, page, size]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  return { tests, totalPages, loading, reload: loadTests };
};
