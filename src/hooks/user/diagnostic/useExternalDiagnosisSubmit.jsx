import { useState } from 'react';
import { submitExternalDiagnosis } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

export const useExternalDiagnosisSubmit = () => {
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submitTest = (data) => {
    setSubmitting(true);
    submitExternalDiagnosis(data)
      .then((res) => setResult(res.resultUrl ? res : res.data || res))
      .catch((error) => {
        console.error(error);
        alert(error.response?.data?.message || "제출 중 오류가 발생했습니다.");
      })
      .finally(() => setSubmitting(false));
  };

  return { result, submitting, submitTest };
};
