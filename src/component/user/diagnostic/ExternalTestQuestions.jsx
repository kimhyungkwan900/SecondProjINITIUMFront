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
      [questionNumber]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-[#222E8D] text-center mb-6">
        진단검사 문항
      </h2>

      {questions.map((q, idx) => (
        <div
          key={idx}
          className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm"
        >
          {/* 질문 */}
          <p className="font-medium text-gray-800 mb-3">
            {idx + 1}. {q.questionText}
          </p>

          {/* 선택지 */}
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <label
                key={i}
                className="flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
              >
                <input
                  type="radio"
                  name={`q-${idx}`}
                  value={i + 1}
                  className="accent-[#28B8B2]"
                  onChange={() => handleAnswerChange(idx + 1, i + 1)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* 제출 버튼 */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="bg-[#28B8B2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1a807b] transition"
        >
          제출
        </button>
      </div>
    </div>
  );
};

export default ExternalTestQuestions;
