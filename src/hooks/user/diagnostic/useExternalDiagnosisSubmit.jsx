// src/hooks/useExternalDiagnosisSubmit.jsx
import { useState } from 'react';
import { submitExternalDiagnosis } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

export const useExternalDiagnosisSubmit = () => {
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const submitTest = (data) => {
    setSubmitting(true);
    submitExternalDiagnosis(data)
      .then((res) => setResult(res.data))
      .catch(console.error)
      .finally(() => setSubmitting(false));
  };

  return { result, submitting, submitTest };
};
