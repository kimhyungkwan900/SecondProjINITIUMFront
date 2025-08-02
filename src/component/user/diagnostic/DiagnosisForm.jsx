import React, { useState } from 'react';

const DiagnosisForm = ({ onSubmit }) => {
  const [testName, setTestName] = useState('');
  const [description, setDescription] = useState('');
  const [useYn, setUseYn] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [scoreLevels, setScoreLevels] = useState([]); // 🔹 점수레벨 상태 추가

  // ✅ 문항 추가
  const addQuestion = () => {
    setQuestions([...questions, { content: '', order: questions.length + 1, answerType: 'YES_NO', answers: [] }]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addAnswer = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].answers.push({ content: '', score: 0, selectValue: 1 });
    setQuestions(updated);
  };

  const updateAnswer = (qIndex, aIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex][field] = value;
    setQuestions(updated);
  };

  // ✅ 점수레벨 추가
  const addScoreLevel = () => {
    setScoreLevels([...scoreLevels, { minScore: 0, maxScore: 0, levelName: '', description: '' }]);
  };

  const updateScoreLevel = (index, field, value) => {
    const updated = [...scoreLevels];
    updated[index][field] = value;
    setScoreLevels(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dto = {
      name: testName,
      description,
      useYn,
      questions,
      scoreLevels // 🔹 점수레벨 포함
    };
    onSubmit(dto);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-bold mb-2">검사 등록</h2>
      
      {/* 검사 기본 정보 */}
      <div className="mb-2">
        <label>검사명:</label>
        <input value={testName} onChange={(e) => setTestName(e.target.value)} className="border p-1 w-full" />
      </div>
      <div className="mb-2">
        <label>설명:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border p-1 w-full" />
      </div>
      <div className="mb-2">
        <label>사용 여부:</label>
        <select value={useYn} onChange={(e) => setUseYn(e.target.value === 'true')} className="border p-1">
          <option value="true">사용</option>
          <option value="false">미사용</option>
        </select>
      </div>

      <hr className="my-3" />

      {/* 문항 등록 */}
      <h3 className="font-semibold mb-2">문항</h3>
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="border p-2 mb-3 bg-white">
          <input
            placeholder="문항 내용"
            value={q.content}
            onChange={(e) => updateQuestion(qIndex, 'content', e.target.value)}
            className="border p-1 w-full mb-2"
          />
          <select
            value={q.answerType}
            onChange={(e) => updateQuestion(qIndex, 'answerType', e.target.value)}
            className="border p-1 mb-2"
          >
            <option value="YES_NO">YES/NO</option>
            <option value="SCALE_5">5점 척도</option>
            <option value="SCALE_7">7점 척도</option>
          </select>

          <button type="button" onClick={() => addAnswer(qIndex)} className="bg-green-500 text-white px-2 py-1 mb-2">
            답변 추가
          </button>

          {q.answers.map((a, aIndex) => (
            <div key={aIndex} className="pl-4">
              <input
                placeholder="답변 내용"
                value={a.content}
                onChange={(e) => updateAnswer(qIndex, aIndex, 'content', e.target.value)}
                className="border p-1 w-full mb-1"
              />
              <input
                type="number"
                placeholder="점수"
                value={a.score}
                onChange={(e) => updateAnswer(qIndex, aIndex, 'score', Number(e.target.value))}
                className="border p-1 mb-1"
              />
              <input
                type="number"
                placeholder="선택값"
                value={a.selectValue}
                onChange={(e) => updateAnswer(qIndex, aIndex, 'selectValue', Number(e.target.value))}
                className="border p-1 mb-2"
              />
            </div>
          ))}
        </div>
      ))}
      <button type="button" onClick={addQuestion} className="bg-blue-500 text-white px-3 py-1 mr-2">
        문항 추가
      </button>

      <hr className="my-3" />

      {/* 점수 레벨 등록 */}
      <h3 className="font-semibold mb-2">점수별 상태(Score Levels)</h3>
      {scoreLevels.map((level, index) => (
        <div key={index} className="border p-2 mb-3 bg-white">
          <input
            type="number"
            placeholder="최소 점수"
            value={level.minScore}
            onChange={(e) => updateScoreLevel(index, 'minScore', Number(e.target.value))}
            className="border p-1 mb-1 w-full"
          />
          <input
            type="number"
            placeholder="최대 점수"
            value={level.maxScore}
            onChange={(e) => updateScoreLevel(index, 'maxScore', Number(e.target.value))}
            className="border p-1 mb-1 w-full"
          />
          <input
            placeholder="레벨 이름"
            value={level.levelName}
            onChange={(e) => updateScoreLevel(index, 'levelName', e.target.value)}
            className="border p-1 mb-1 w-full"
          />
          <textarea
            placeholder="설명"
            value={level.description}
            onChange={(e) => updateScoreLevel(index, 'description', e.target.value)}
            className="border p-1 mb-1 w-full"
          />
        </div>
      ))}
      <button type="button" onClick={addScoreLevel} className="bg-purple-500 text-white px-3 py-1 mr-2">
        점수 레벨 추가
      </button>

      <hr className="my-3" />

      <button type="submit" className="bg-indigo-500 text-white px-3 py-1">
        등록
      </button>
    </form>
  );
};

export default DiagnosisForm;
