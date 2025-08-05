// src/component/user/diagnostic/ExternalTestQuestions.jsx
import React, { useEffect, useState } from 'react';
import { fetchExternalQuestionsParsed } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

const ExternalTestQuestions = ({ qestrnSeq, trgetSe, onSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchExternalQuestionsParsed(qestrnSeq, trgetSe)
      .then((res) => setQuestions(res.questions))
      .catch(console.error);
  }, [qestrnSeq, trgetSe]);

  const handleAnswerChange = (questionNumber, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionNumber]: value, // 🔹 key = 문항번호, value = 선택값
    }));
  };

  const handleSubmit = () => {
    onSubmit(answers); // 🔹 직렬화는 부모 컴포넌트에서 처리
  };

  return (
    <div>
      <h2>문항</h2>
      {questions.map((q, idx) => (
        <div key={idx}>
          <p>{q.questionText}</p>
          {q.options.map((opt, i) => (
            <label key={i}>
              <input
                type="radio"
                name={`q-${idx}`}
                value={i + 1} // CareerNet는 선택지 번호를 숫자로 전송 (예: 1, 2, 3...)
                onChange={() => handleAnswerChange(idx + 1, i + 1)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>제출</button>
    </div>
  );
};

export default ExternalTestQuestions;
