import React, { useState } from 'react';

const inputCls =
  "w-full rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400";
const btnPrimary =
  "bg-[#222E8D] text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-800 transition";
const btnGhost =
  "w-auto rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 transition";

const DiagnosisForm = ({ onSubmit }) => {
  const [testName, setTestName] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [scoreLevels, setScoreLevels] = useState([]);

  // 문항 추가 (기본 YES/NO)
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        content: '',
        order: prev.length + 1,
        answerType: 'YES_NO',
        answers: [
          { content: '그렇다', score: 2, selectValue: 1 },
          { content: '그렇지 않다', score: 0, selectValue: 2 },
        ],
      },
    ]);
  };

  // 문항 삭제
  const deleteQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    updated.forEach((q, i) => (q.order = i + 1));
    setQuestions(updated);
  };

  // 문항 업데이트
  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;

    if (field === 'answerType') {
      if (value === 'YES_NO') {
        updated[index].answers = [
          { content: '그렇다', score: 2, selectValue: 1 },
          { content: '그렇지 않다', score: 0, selectValue: 2 },
        ];
      } else if (value === 'SCALE_4') {
        updated[index].answers = [
          { content: '전혀 그렇지 않다', score: 0, selectValue: 1 },
          { content: '그렇지 않다', score: 1, selectValue: 2 },
          { content: '그렇다', score: 2, selectValue: 3 },
          { content: '매우 그렇다', score: 3, selectValue: 4 },
        ];
      } else if (value === 'SCALE_5') {
        updated[index].answers = [
          { content: '전혀 그렇지 않다', score: 0, selectValue: 1 },
          { content: '그렇지 않다', score: 1, selectValue: 2 },
          { content: '보통이다', score: 2, selectValue: 3 },
          { content: '그렇다', score: 3, selectValue: 4 },
          { content: '매우 그렇다', score: 4, selectValue: 5 },
        ];
      } else if (value === 'SCALE_6') {
        updated[index].answers = [
          { content: '항상 그렇다', score: 5, selectValue: 1 },
          { content: '매우 자주 그렇다', score: 4, selectValue: 2 },
          { content: '자주 그렇다', score: 3, selectValue: 3 },
          { content: '가끔 그렇다', score: 2, selectValue: 4 },
          { content: '거의 드물다', score: 1, selectValue: 5 },
          { content: '전혀 아니다', score: 0, selectValue: 6 },
        ];
      }
    }
    setQuestions(updated);
  };

  // 답변 추가/업데이트
  const addAnswer = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].answers.push({
      content: '',
      score: 0,
      selectValue: updated[qIndex].answers.length + 1,
    });
    setQuestions(updated);
  };
  const updateAnswer = (qIndex, aIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex][field] = value;
    setQuestions(updated);
  };

  // 점수 레벨
  const addScoreLevel = () => {
    setScoreLevels((prev) => [
      ...prev,
      { minScore: 0, maxScore: 0, levelName: '', description: '' },
    ]);
  };
  const deleteScoreLevel = (index) => {
    setScoreLevels(scoreLevels.filter((_, i) => i !== index));
  };
  const updateScoreLevel = (index, field, value) => {
    const updated = [...scoreLevels];
    updated[index][field] = value;
    setScoreLevels(updated);
  };

  // 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    const dto = { name: testName, description, questions, scoreLevels };
    onSubmit(dto);
    // 초기화
    setTestName('');
    setDescription('');
    setQuestions([]);
    setScoreLevels([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 기본 정보 */}
      <div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-[4px] h-[26px] bg-blue-600 rounded" />
          <h2 className="text-[26px] font-semibold">기본 정보</h2>
        </div>
        <hr className="my-4 border-gray-200" />

        <div className="grid grid-cols-12 gap-3">
          <label className="col-span-2 text-gray-700 font-medium self-center">검사명</label>
          <input
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className={`col-span-10 ${inputCls}`}
            placeholder="검사명을 입력하세요"
          />

          <label className="col-span-2 text-gray-700 font-medium self-start mt-2">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`col-span-10 ${inputCls} min-h-[120px]`}
            placeholder="검사 설명을 입력하세요"
          />
        </div>
      </div>

      {/* 문항 관리 */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-[4px] h-[26px] bg-blue-600 rounded" />
            <h2 className="text-[26px] font-semibold">문항 관리</h2>
          </div>
          <button type="button" onClick={addQuestion} className={btnPrimary}>
            + 문항 추가
          </button>
        </div>
        <hr className="my-4 border-gray-200" />

        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="border border-gray-200 rounded-lg p-4 mb-4 bg-white"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">문항 {q.order}</h3>
              <button
                type="button"
                onClick={() => deleteQuestion(qIndex)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600 transition"
              >
                삭제
              </button>
            </div>

            <div className="grid grid-cols-12 gap-3">
              <label className="col-span-2 text-sm text-gray-700 self-center">문항 내용</label>
              <input
                placeholder="문항 내용을 입력하세요"
                value={q.content}
                onChange={(e) => updateQuestion(qIndex, 'content', e.target.value)}
                className={`col-span-10 ${inputCls}`}
              />

              <label className="col-span-2 text-sm text-gray-700 self-center">답변 타입</label>
              <select
                value={q.answerType}
                onChange={(e) => updateQuestion(qIndex, 'answerType', e.target.value)}
                className={`col-span-10 ${inputCls}`}
              >
                <option value="YES_NO">그렇다 / 그렇지 않다</option>
                <option value="SCALE_4">4점 척도</option>
                <option value="SCALE_5">5점 척도</option>
                <option value="SCALE_6">6점 척도</option>
              </select>
            </div>

            {/* 답변 목록 */}
            <div className="mt-4 space-y-2">
              {q.answers.map((a, aIndex) => (
                <div key={aIndex} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <label className="col-span-2 text-sm text-gray-700">답변 내용</label>
                    <input
                      placeholder="답변 내용을 입력하세요"
                      value={a.content}
                      onChange={(e) => updateAnswer(qIndex, aIndex, 'content', e.target.value)}
                      className={`col-span-10 ${inputCls}`}
                    />

                    <label className="col-span-2 text-sm text-gray-700">점수</label>
                    <input
                      type="number"
                      placeholder="예: 2"
                      value={a.score}
                      onChange={(e) =>
                        updateAnswer(qIndex, aIndex, 'score', Number(e.target.value))
                      }
                      className={`col-span-4 ${inputCls}`}
                    />

                    <label className="col-span-2 text-sm text-gray-700">선택값</label>
                    <input
                      type="number"
                      placeholder="예: 1"
                      value={a.selectValue}
                      onChange={(e) =>
                        updateAnswer(qIndex, aIndex, 'selectValue', Number(e.target.value))
                      }
                      className={`col-span-4 ${inputCls}`}
                    />
                  </div>
                </div>
              ))}

              <button type="button" onClick={() => addAnswer(qIndex)} className={btnPrimary}>
                + 답변 추가
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 점수 레벨 등록 */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-[4px] h-[26px] bg-blue-600 rounded" />
            <h2 className="text-[26px] font-semibold">점수별 상태 (Score Levels)</h2>
          </div>
          <button type="button" onClick={addScoreLevel} className={btnPrimary}>
            + 점수 레벨 추가
          </button>
        </div>
        <hr className="my-4 border-gray-200" />

        {scoreLevels.map((level, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">레벨 #{index + 1}</h3>
              <button
                type="button"
                onClick={() => deleteScoreLevel(index)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-red-600 transition"
              >
                삭제
              </button>
            </div>

            <div className="grid grid-cols-12 gap-3 mb-3">
              <label className="col-span-2 text-sm text-gray-700 self-center">최소 점수</label>
              <input
                type="number"
                placeholder="예: 0"
                value={level.minScore}
                onChange={(e) => updateScoreLevel(index, 'minScore', Number(e.target.value))}
                className={`col-span-4 ${inputCls}`}
              />

              <label className="col-span-2 text-sm text-gray-700 self-center">최대 점수</label>
              <input
                type="number"
                placeholder="예: 10"
                value={level.maxScore}
                onChange={(e) => updateScoreLevel(index, 'maxScore', Number(e.target.value))}
                className={`col-span-4 ${inputCls}`}
              />

              <label className="col-span-2 text-sm text-gray-700 self-center">레벨 이름</label>
              <input
                placeholder="예: 우수 / 보통 / 부족"
                value={level.levelName}
                onChange={(e) => updateScoreLevel(index, 'levelName', e.target.value)}
                className={`col-span-10 ${inputCls}`}
              />
            </div>

            <label className="block text-sm text-gray-700 mb-1">설명</label>
            <textarea
              placeholder="해당 점수 범위에 대한 상세 설명 입력"
              value={level.description}
              onChange={(e) => updateScoreLevel(index, 'description', e.target.value)}
              className={`${inputCls} w-full min-h-[100px]`}
            />
          </div>
        ))}
      </div>

      {/* 제출 버튼 */}
      <div className="flex items-center justify-end gap-2">
        <button type="button" className={btnGhost} onClick={() => {
          setTestName(''); setDescription(''); setQuestions([]); setScoreLevels([]);
        }}>
          초기화
        </button>
        <button type="submit" className={btnPrimary}>
          등록
        </button>
      </div>
    </form>
  );
};

export default DiagnosisForm;
