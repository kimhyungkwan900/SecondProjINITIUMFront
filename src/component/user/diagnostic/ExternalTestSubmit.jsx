import React, { useState } from 'react';
import { submitExternalDiagnosis } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

const ExternalTestSubmit = ({ studentNo, qestrnSeq, trgetSe, answers }) => {
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    const formattedAnswers = Object.entries(answers)
      .map(([qNum, value]) => `${qNum}=${value}`) // 🔹 CareerNet 형식 변환
      .join(' ');

    submitExternalDiagnosis({
      studentNo,
      qestrnSeq,
      trgetSe,
      answers: formattedAnswers,
      gender: 'M',
      school: 'Sample University',
      grade: '3',
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
          <p>검사명: {result.testName}</p> {/* 🔹 testName 출력 */}
          <a href={result.resultUrl} target="_blank" rel="noreferrer">결과 보기</a>
        </div>
      )}
    </div>
  );
};

export default ExternalTestSubmit;
