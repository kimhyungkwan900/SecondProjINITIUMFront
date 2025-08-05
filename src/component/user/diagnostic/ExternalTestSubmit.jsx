// src/component/user/diagnostic/ExternalTestSubmit.jsx
import React, { useState } from 'react';
import { submitExternalDiagnosis } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

const ExternalTestSubmit = ({ studentNo, qestrnSeq, trgetSe, answers }) => {
  const [result, setResult] = useState(null);

  const handleSubmit = () => {
    // 🔹 CareerNet 형식: "문항번호=선택값" 공백 구분
    const serializedAnswers = Object.entries(answers)
      .map(([qNum, value]) => `${qNum}=${value}`)
      .join(' ');

    submitExternalDiagnosis({
      studentNo,
      qestrnSeq,
      trgetSe,
      answers: serializedAnswers, // 🔹 CareerNet 포맷으로 전송
      gender: '10', // 예시값 (남자 = 10 → CareerNet에서 100323으로 매핑)
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
