import React, { useState } from 'react';
import TextInput from '../../common/TextInput';

const DiagnosisForm = ({ onSubmit }) => {
  const [testName, setTestName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [scoreLevels, setScoreLevels] = useState([]);

  // 문항 추가 (기본 YES/NO)
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        content: "",
        order: prev.length + 1,
        answerType: "YES_NO",
        answers: [
          { content: "그렇다", score: 2, selectValue: 1 },
          { content: "그렇지 않다", score: 0, selectValue: 2 },
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

    if (field === "answerType") {
      if (value === "YES_NO") {
        updated[index].answers = [
          { content: "그렇다", score: 2, selectValue: 1 },
          { content: "그렇지 않다", score: 0, selectValue: 2 },
        ];
      } else if (value === "SCALE_4") {
        updated[index].answers = [
          { content: "전혀 그렇지 않다", score: 0, selectValue: 1 },
          { content: "그렇지 않다", score: 1, selectValue: 2 },
          { content: "그렇다", score: 2, selectValue: 3 },
          { content: "매우 그렇다", score: 3, selectValue: 4 },
        ];
      } else if (value === "SCALE_5") {
        updated[index].answers = [
          { content: "전혀 그렇지 않다", score: 0, selectValue: 1 },
          { content: "그렇지 않다", score: 1, selectValue: 2 },
          { content: "보통이다", score: 2, selectValue: 3 },
          { content: "그렇다", score: 3, selectValue: 4 },
          { content: "매우 그렇다", score: 4, selectValue: 5 },
        ];
      } else if (value === "SCALE_6") {
        updated[index].answers = [
          { content: "항상 그렇다", score: 5, selectValue: 1 },
          { content: "매우 자주 그렇다", score: 4, selectValue: 2 },
          { content: "자주 그렇다", score: 3, selectValue: 3 },
          { content: "가끔 그렇다", score: 2, selectValue: 4 },
          { content: "거의 드물다", score: 1, selectValue: 5 },
          { content: "전혀 아니다", score: 0, selectValue: 6 },
        ];
      }
    }
    setQuestions(updated);
  };

  // 답변 추가/업데이트
  const addAnswer = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].answers.push({
      content: "",
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
      { minScore: 0, maxScore: 0, levelName: "", description: "" },
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
    setTestName("");
    setDescription("");
    setQuestions([]);
    setScoreLevels([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 기본 정보 */}
      <section aria-labelledby="base-info-heading" className="adm-card">
        <div className="p-4">
          <h2 id="base-info-heading" className="text-base font-semibold text-gray-700 mb-0">
            기본 정보
          </h2>
        </div>
        <div className="border-t border-gray-200" />
        <div className="grid grid-cols-12 gap-4 p-4">
          <label className="col-span-12 md:col-span-2 adm-label self-center">검사명</label>
          <TextInput
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="검사명을 입력하세요"
            className="col-span-12 md:col-span-10 min-w-0 w-[28ch] md:!w-full rounded-md border px-3 py-2"
          />

          <label className="col-span-12 md:col-span-2 adm-label self-start mt-2 md:mt-0">
            설명
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="col-span-12 md:col-span-10 adm-control w-full max-w-lg md:max-w-none md:!w-full min-h-[120px]"
            placeholder="검사 설명을 입력하세요"
            aria-label="검사 설명"
          />
        </div>
      </section>

      {/* 문항 관리 */}
      <section aria-labelledby="question-mgmt-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="question-mgmt-heading" className="text-base font-semibold text-gray-700">
            문항 관리
          </h2>
          <button type="button" onClick={addQuestion} className="adm-btn adm-btn--primary">
            + 문항 추가
          </button>
        </div>
        <div className="border-t border-gray-200" />

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="adm-card">
            {/* 문항 헤더 */}
            <div className="p-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">문항 {q.order}</h3>
              <button
                type="button"
                onClick={() => deleteQuestion(qIndex)}
                className="adm-btn adm-btn--dangerOutline"
              >
                삭제
              </button>
            </div>

            {/* 문항 내용/타입 */}
            <div className="grid grid-cols-12 gap-4 p-4">
              <label className="col-span-12 md:col-span-2 adm-label self-center">문항 내용</label>
              <TextInput
                type="text"
                placeholder="문항 내용을 입력하세요"
                value={q.content}
                onChange={(e) => updateQuestion(qIndex, "content", e.target.value)}
                className="col-span-12 md:col-span-10 adm-control"
              />

              <label className="col-span-12 md:col-span-2 adm-label self-center">답변 타입</label>
              <select
                value={q.answerType}
                onChange={(e) => updateQuestion(qIndex, "answerType", e.target.value)}
                className="col-span-12 md:col-span-10 adm-control"
                aria-label={`문항 ${q.order} 답변 타입`}
              >
                <option value="YES_NO">그렇다 / 그렇지 않다</option>
                <option value="SCALE_4">4점 척도</option>
                <option value="SCALE_5">5점 척도</option>
                <option value="SCALE_6">6점 척도</option>
              </select>
            </div>

            {/* 답변 목록 */}
            <div className="p-4 space-y-3">
              {q.answers.map((a, aIndex) => (
                <div key={aIndex} className="rounded-lg border border-gray-200 bg-gray-50">
                  <div className="grid grid-cols-12 gap-4 p-4 items-center">
                    <label className="col-span-12 md:col-span-2 adm-label">답변 내용</label>
                    <TextInput
                      type="text"
                      placeholder="답변 내용을 입력하세요"
                      value={a.content}
                      onChange={(e) => updateAnswer(qIndex, aIndex, "content", e.target.value)}
                      className="col-span-12 md:col-span-10 adm-control"
                    />

                    <label className="col-span-12 md:col-span-2 adm-label">점수</label>
                    <TextInput
                      type="number"
                      placeholder="예: 2"
                      value={a.score}
                      onChange={(e) =>
                        updateAnswer(qIndex, aIndex, "score", Number(e.target.value))
                      }
                      className="col-span-6 md:col-span-4 adm-control"
                    />

                    <label className="col-span-12 md:col-span-2 adm-label">선택값</label>
                    <TextInput
                      type="number"
                      placeholder="예: 1"
                      value={a.selectValue}
                      onChange={(e) =>
                        updateAnswer(qIndex, aIndex, "selectValue", Number(e.target.value))
                      }
                      className="col-span-6 md:col-span-4 adm-control"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addAnswer(qIndex)}
                className="adm-btn adm-btn--primary"
              >
                + 답변 추가
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* 점수 레벨 등록 */}
      <section aria-labelledby="score-level-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="score-level-heading" className="text-base font-semibold text-gray-700">
            점수별 상태 (Score Levels)
          </h2>
          <button type="button" onClick={addScoreLevel} className="adm-btn adm-btn--primary">
            + 점수 레벨 추가
          </button>
        </div>
        <div className="border-t border-gray-200" />

        {scoreLevels.map((level, index) => (
          <div key={index} className="adm-card">
            <div className="p-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">레벨 #{index + 1}</h3>
              <button
                type="button"
                onClick={() => deleteScoreLevel(index)}
                className="adm-btn adm-btn--dangerOutline"
              >
                삭제
              </button>
            </div>

            <div className="grid grid-cols-12 gap-4 p-4">
              <label className="col-span-12 md:col-span-2 adm-label self-center">최소 점수</label>
              <TextInput
                type="number"
                placeholder="예: 0"
                value={level.minScore}
                onChange={(e) => updateScoreLevel(index, "minScore", Number(e.target.value))}
                className="col-span-6 md:col-span-4 adm-control"
              />

              <label className="col-span-12 md:col-span-2 adm-label self-center">최대 점수</label>
              <TextInput
                type="number"
                placeholder="예: 10"
                value={level.maxScore}
                onChange={(e) => updateScoreLevel(index, "maxScore", Number(e.target.value))}
                className="col-span-6 md:col-span-4 adm-control"
              />

              <label className="col-span-12 md:col-span-2 adm-label self-center">레벨 이름</label>
              <TextInput
                type="text"
                placeholder="예: 우수 / 보통 / 부족"
                value={level.levelName}
                onChange={(e) => updateScoreLevel(index, "levelName", e.target.value)}
                className="col-span-12 md:col-span-10 adm-control"
              />
            </div>

            <div className="p-4">
              <label className="adm-label block mb-1">설명</label>
              <textarea
                placeholder="해당 점수 범위에 대한 상세 설명 입력"
                value={level.description}
                onChange={(e) => updateScoreLevel(index, "description", e.target.value)}
                className="adm-control w-full min-h-[100px]"
                aria-label={`레벨 ${index + 1} 설명`}
              />
            </div>
          </div>
        ))}
      </section>

      {/* 제출 버튼 */}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="adm-btn adm-btn--secondary"
          onClick={() => {
            setTestName("");
            setDescription("");
            setQuestions([]);
            setScoreLevels([]);
          }}
          aria-label="폼 초기화"
        >
          초기화
        </button>
        <button type="submit" className="adm-btn adm-btn--primary">
          등록
        </button>
      </div>
    </form>
  );
};

export default DiagnosisForm;