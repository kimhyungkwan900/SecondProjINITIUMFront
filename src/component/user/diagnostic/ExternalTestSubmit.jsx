// src/components/ExternalTestSubmit.jsx
import React, { useState } from 'react';
import { submitExternalDiagnosis } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

const ExternalTestSubmit = ({ studentNo, qestrnSeq, trgetSe, answers }) => {
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    submitExternalDiagnosis({
      studentNo,
      qestrnSeq,
      trgetSe,
      answers,
    })
      .then((res) => setResult(res.data))
      .catch(console.error);
  };

  return (
    <div>
      <button onClick={handleSubmit}>외부 검사 제출</button>
      {result && (
        <div>
          <p>검사 번호: {result.inspectSeq}</p>
          <a href={result.resultUrl} target="_blank" rel="noreferrer">
            결과 보기
          </a>
        </div>
      )}
    </div>
  );
};

export default ExternalTestSubmit;