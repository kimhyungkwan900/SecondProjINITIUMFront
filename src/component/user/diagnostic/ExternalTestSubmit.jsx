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
      gender: 'M', // 예시값
      school: 'Sample University', // 선택적
      grade: '3', // 예시값
    })
      .then((res) => setResult(res))
      .catch(console.error);
  };

  return (
    <div>
      <button onClick={handleSubmit}>외부 검사 제출</button>
      {result && (
        <div>
          <p>검사 번호: {result.inspectSeq}</p>
          <p>검사명: {result.testName}</p>
          <a href={result.resultUrl} target="_blank" rel="noreferrer">
            결과 보기
          </a>
        </div>
      )}
    </div>
  );
};

export default ExternalTestSubmit;
