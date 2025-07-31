// src/hooks/useDiagnosisResult.jsx
import { useEffect, useState } from 'react';
import { fetchResultSummary } from '../../../api/user/diagnostic/diagnosisApi.jsx';

export const useDiagnosisResult = (resultId) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!resultId) return;
    setLoading(true);
    fetchResultSummary(resultId)
      .then((res) => setResult(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [resultId]);

  return { result, loading };
};