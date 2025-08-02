import { useState } from 'react';
import { submitExternalDiagnosis } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

export const useExternalDiagnosisSubmit = () => {
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submitTest = (data) => {
    setSubmitting(true);

    // 🔹 CareerNet answers 형식 변환 ("1=2 2=4 3=1")
    const formattedAnswers = Object.entries(data.answers)
      .map(([qNum, ansValue]) => `${qNum}=${ansValue}`)
      .join(' ');

    // 🔹 변환된 데이터로 새 payload 생성
    const payload = {
      ...data,
      answers: formattedAnswers
    };

    submitExternalDiagnosis(payload)
      .then((res) => setResult(res.resultUrl ? res : res.data || res))
      .catch((error) => {
        console.error(error);
        alert(error.response?.data?.message || "제출 중 오류가 발생했습니다.");
      })
      .finally(() => setSubmitting(false));
  };

  return { result, submitting, submitTest };
};
