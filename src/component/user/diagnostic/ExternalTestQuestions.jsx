// src/components/ExternalTestQuestions.jsx
import React, { useEffect, useState } from 'react';
import { fetchExternalQuestionsParsed } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';

const ExternalTestQuestions = ({ qestrnSeq, trgetSe, onSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchExternalQuestionsParsed(qestrnSeq, trgetSe)
      .then((res) => setQuestions(res.data.questions))
      .catch(console.error);
  }, [qestrnSeq, trgetSe]);

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }));
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
                value={opt}
                onChange={() => handleAnswerChange(idx, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={() => onSubmit(answers)}>제출</button>
    </div>
  );
};

export default ExternalTestQuestions;