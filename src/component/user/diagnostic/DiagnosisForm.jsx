import React, { useState } from 'react';

const DiagnosisForm = ({ onSubmit }) => {
  const [testName, setTestName] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [scoreLevels, setScoreLevels] = useState([]);

  // 문항 추가 (기본 YES/NO 자동 생성)
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        content: '',
        order: questions.length + 1,
        answerType: 'YES_NO',
        answers: [
          { content: '그렇다', score: 2, selectValue: 1 },
          { content: '그렇지 않다', score: 0, selectValue: 2 }
        ]
      }
    ]);
  };

  // 문항 삭제
  const deleteQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    updated.forEach((q, i) => (q.order = i + 1)); // 순서 재정렬
    setQuestions(updated);
  };

  // 문항 타입 변경 시 자동 답변 생성
  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;

    if (field === 'answerType') {
      if (value === 'YES_NO') {
        updated[index].answers = [
          { content: '그렇다', score: 2, selectValue: 1 },
          { content: '그렇지 않다', score: 0, selectValue: 2 }
        ];
      } else if (value === 'SCALE_4') {
        updated[index].answers = [
          { content: '전혀 그렇지 않다', score: 0, selectValue: 1 },
          { content: '그렇지 않다', score: 1, selectValue: 2 },
          { content: '그렇다', score: 2, selectValue: 3 },
          { content: '매우 그렇다', score: 3, selectValue: 4 }
        ];
      } else if (value === 'SCALE_5') {
        updated[index].answers = [
          { content: '전혀 그렇지 않다', score: 0, selectValue: 1 },
          { content: '그렇지 않다', score: 1, selectValue: 2 },
          { content: '보통이다', score: 2, selectValue: 3 },
          { content: '그렇다', score: 3, selectValue: 4 },
          { content: '매우 그렇다', score: 4, selectValue: 5 }
        ];
      } else if (value === 'SCALE_6') {
        updated[index].answers = [
          { content: '항상 그렇다', score: 5, selectValue: 1 },
          { content: '매우 자주 그렇다', score: 4, selectValue: 2 },
          { content: '자주 그렇다', score: 3, selectValue: 3 },
          { content: '가끔 그렇다', score: 2, selectValue: 4 },
          { content: '거의 드물다', score: 1, selectValue: 5 },
          { content: '전혀 아니다', score: 0, selectValue: 6 }
        ];
      }
    }
    setQuestions(updated);
  };

  // 답변 수동 추가
  const addAnswer = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].answers.push({ content: '', score: 0, selectValue: updated[qIndex].answers.length + 1 });
    setQuestions(updated);
  };

  const updateAnswer = (qIndex, aIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex][field] = value;
    setQuestions(updated);
  };

  // 점수 레벨 관리
  const addScoreLevel = () => {
    setScoreLevels([
      ...scoreLevels,
      { minScore: 0, maxScore: 0, levelName: '', description: '' }
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
    const dto = {
      name: testName,
      description,
      questions,
      scoreLevels
    };
    onSubmit(dto);

    // 등록 후 초기화
    setTestName('');
    setDescription('');
    setQuestions([]);
    setScoreLevels([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 기본 정보 */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-[#222E8D] mb-4">📌 기본 정보</h2>
        <div className="space-y-3">
          <div>
            <label className="block font-medium mb-1">검사명</label>
            <input
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">설명</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            />
          </div>
          {/* <div>
            <label className="block font-medium mb-1">사용 여부</label>
            <select
              value={useYn}
              onChange={(e) => setUseYn(e.target.value === 'true')}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            >
              <option value="true">활성화</option>
              <option value="false">비활성화</option>
            </select>
          </div> */}
        </div>
      </div>

      {/* 문항 관리 */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-[#222E8D] mb-4 flex justify-between items-center">
          📝 문항 관리
          <button
            type="button"
            onClick={addQuestion}
            className="bg-[#28B8B2] text-white px-3 py-1 rounded hover:bg-[#1a807b]"
          >
            + 문항 추가
          </button>
        </h2>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50 relative">
            <button
              type="button"
              onClick={() => deleteQuestion(qIndex)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
            >
              삭제
            </button>
            <h3 className="font-semibold mb-2">문항 {q.order}</h3>
            <input
              placeholder="문항 내용"
              value={q.content}
              onChange={(e) => updateQuestion(qIndex, 'content', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-2"
            />
            <select
              value={q.answerType}
              onChange={(e) => updateQuestion(qIndex, 'answerType', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-3"
            >
              <option value="YES_NO">그렇다 / 그렇지 않다</option>
              <option value="SCALE_4">4점 척도</option>
              <option value="SCALE_5">5점 척도</option>
              <option value="SCALE_6">6점 척도</option>
            </select>

            {/* 답변 목록 */}
            <div className="space-y-2">
              {q.answers.map((a, aIndex) => (
                <div key={aIndex} className="border border-gray-200 rounded-lg p-2 bg-white">
                  <div className="flex items-center gap-2">
                    <input
                      placeholder="답변 내용"
                      value={a.content}
                      onChange={(e) => updateAnswer(qIndex, aIndex, 'content', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-1 flex-1"
                    />
                    <input
                      type="number"
                      placeholder="점수"
                      value={a.score}
                      onChange={(e) => updateAnswer(qIndex, aIndex, 'score', Number(e.target.value))}
                      className="border border-gray-300 rounded-lg px-3 py-1 w-24"
                    />
                    <input
                      type="number"
                      placeholder="선택값"
                      value={a.selectValue}
                      onChange={(e) => updateAnswer(qIndex, aIndex, 'selectValue', Number(e.target.value))}
                      className="border border-gray-300 rounded-lg px-3 py-1 w-24"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addAnswer(qIndex)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                + 답변 추가
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 점수 레벨 등록 */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-[#222E8D] mb-4 flex justify-between items-center">
          📊 점수별 상태 (Score Levels)
          <button
            type="button"
            onClick={addScoreLevel}
            className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
          >
            + 점수 레벨 추가
          </button>
        </h2>
            
        {scoreLevels.map((level, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50 relative"
          >
            <button
              type="button"
              onClick={() => deleteScoreLevel(index)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
            >
              삭제
            </button>
        
            <div className="grid grid-cols-3 gap-3 mb-3">
              {/* 최소 점수 */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  최소 점수
                </label>
                <input
                  type="number"
                  placeholder="예: 0"
                  value={level.minScore}
                  onChange={(e) =>
                    updateScoreLevel(index, "minScore", Number(e.target.value))
                  }
                  className="border border-gray-300 rounded-lg px-3 py-1"
                />
              </div>
                
              {/* 최대 점수 */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  최대 점수
                </label>
                <input
                  type="number"
                  placeholder="예: 10"
                  value={level.maxScore}
                  onChange={(e) =>
                    updateScoreLevel(index, "maxScore", Number(e.target.value))
                  }
                  className="border border-gray-300 rounded-lg px-3 py-1"
                />
              </div>
                
              {/* 레벨 이름 */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  레벨 이름
                </label>
                <input
                  placeholder="예: 우수 / 보통 / 부족"
                  value={level.levelName}
                  onChange={(e) =>
                    updateScoreLevel(index, "levelName", e.target.value)
                  }
                  className="border border-gray-300 rounded-lg px-3 py-1"
                />
              </div>
            </div>
                
            {/* 설명 */}
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                placeholder="해당 점수 범위에 대한 상세 설명 입력"
                value={level.description}
                onChange={(e) =>
                  updateScoreLevel(index, "description", e.target.value)
                }
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
            </div>
          </div>
        ))}
      </div>
      

      {/* 제출 버튼 */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-[#222E8D] text-white px-6 py-2 rounded-lg hover:bg-[#1a1f6b] transition"
        >
          등록
        </button>
      </div>
    </form>
  );
};

export default DiagnosisForm;
