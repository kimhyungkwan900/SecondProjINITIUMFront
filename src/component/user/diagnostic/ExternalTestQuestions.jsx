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
      [questionNumber]: value, // 🔹 Map 형식 유지
    }));
  };

  const handleSubmit = () => {
    onSubmit(answers); // 🔹 Map을 그대로 부모로 전달
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
                onChange={() => handleAnswerChange(idx + 1, opt)}
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
