import React, { useEffect, useState } from 'react';
import { fetchQuestions, submitDiagnosis } from '../../../api/user/diagnostic/diagnosisApi.jsx';

const DiagnosisQuestions = ({ testId, studentNo, onSubmit }) => {
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
    const formattedAnswers = Object.entries(answers).map(
      ([questionId, selectedValue]) => ({
        questionId: Number(questionId),
        selectedValue: Number(selectedValue),
      })
    );

    // 진단검사 직접 제출
    submitDiagnosis({
      studentNo,
      testId,
      answers: formattedAnswers,
    })
      .then((res) => {
        console.log("✅ 진단검사 제출 완료:", res);
        if (onSubmit) {
          onSubmit(res.resultId); // 부모로 전달
        }
      })
      .catch((err) => {
        console.error("❌ 제출 실패:", err);
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 space-y-6">
      <h2 className="text-2xl font-bold text-[#222E8D] text-center mb-6">
        진단검사 문항
      </h2>

      {questions.map((q, idx) => (
        <div
          key={q.id}
          className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm"
        >
          <p className="font-medium text-gray-800 mb-3">
            {idx + 1}. {q.content}
          </p>

          <div className="space-y-2">
            {q.answers.map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-2 text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
              >
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt.selectValue}
                  className="accent-[#28B8B2]"
                  onChange={() => handleAnswerChange(q.id, opt.selectValue)}
                />
                {opt.content}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="bg-[#28B8B2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1a807b] transition"
        >
          제출하기
        </button>
      </div>
    </div>
  );
};

export default DiagnosisQuestions;
