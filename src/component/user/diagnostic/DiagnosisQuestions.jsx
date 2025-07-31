// src/components/DiagnosisQuestions.jsx
import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../../../api/user/diagnostic/diagnosisApi.jsx';

const DiagnosisQuestions = ({ testId, onSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuestions(testId)
      .then((res) => setQuestions(res.data))
      .catch(console.error);
  }, [testId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  return (
    <div>
      <h2>문항</h2>
      {questions.map((q) => (
        <div key={q.id}>
          <p>{q.content}</p>
          {q.answers.map((opt) => (
            <label key={opt.id}>
              <input
                type="radio"
                name={`q-${q.id}`}
                value={opt.selectValue}
                onChange={() => handleAnswerChange(q.id, opt.selectValue)}
              />
              {opt.content}
            </label>
          ))}
        </div>
      ))}
      <button onClick={() => onSubmit(answers)}>제출</button>
    </div>
  );
};

export default DiagnosisQuestions;