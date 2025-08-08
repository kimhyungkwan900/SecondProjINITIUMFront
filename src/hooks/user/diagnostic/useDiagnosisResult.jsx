import { useEffect, useState } from 'react';
import { fetchResultSummary } from '../../../api/user/diagnostic/diagnosisApi.jsx';

/**
 * useDiagnosisResult
 * - 주어진 resultId로 진단검사 결과 요약 정보를 불러오는 커스텀 훅
 * - 반환: { result, loading }
 */
export const useDiagnosisResult = (resultId) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!resultId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchResultSummary(resultId)
      .then((res) => setResult(res)) // res는 이미 data 반환
      .catch((err) => {
        console.error(err);
        alert("결과를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => setLoading(false));
  }, [resultId]);

  return { result, loading };
};
