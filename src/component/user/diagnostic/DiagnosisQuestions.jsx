import React, { useEffect, useState } from 'react';
import { fetchQuestions, submitDiagnosis } from '../../../api/user/diagnostic/diagnosisApi.jsx';

const DiagnosisQuestions = ({ testId, studentNo, onResult }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuestions(testId)
      .then((res) => setQuestions(res))
      .catch(console.error);
  }, [testId]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    const formattedAnswers = Object.entries(answers).map(([questionId, selectedValue]) => ({
      questionId: Number(questionId),
      selectedValue: Number(selectedValue),
    }));

    submitDiagnosis({
      studentNo,
      testId,
      answers: formattedAnswers,
    })
      .then((res) => onResult(res.resultId))
      .catch(console.error);
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
      <button onClick={handleSubmit}>제출</button>
    </div>
  );
};

export default DiagnosisQuestions;
