import React, { useState } from 'react';
import DiagnosisTestList from '../../../component/user/diagnostic/DiagnosisTestList.jsx';
import DiagnosisQuestions from '../../../component/user/diagnostic/DiagnosisQuestions.jsx';
import DiagnosisResult from '../../../component/user/diagnostic/DiagnosisResult.jsx';
import { submitDiagnosis } from '../../../api/user/diagnostic/diagnosisApi.jsx';
import SectionTitle from '../../../component/common/SectionTitle.jsx';

/**
 * DiagnosisListFeature
 * - 내부 진단검사 전체 흐름(목록 → 문항 응답 → 결과)
 * - 부모 페이지에서 카드/레이아웃을 감싸고, 본 컴포넌트는 콘텐츠만 렌더
 */
const DiagnosisListFeature = ({ studentNo }) => {
  const [selectedTest, setSelectedTest] = useState(null); // { id, name, ... }
  const [resultId, setResultId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (answers) => {
    if (!selectedTest) return;
    const requestData = {
      studentNo,
      testId: selectedTest.id,
      answers: Object.entries(answers).map(([questionId, selectedValue]) => ({
        questionId: Number(questionId),
        selectedValue: Number(selectedValue),
      })),
    };

    try {
      setSubmitting(true);
      const res = await submitDiagnosis(requestData);
      setResultId(res.resultId);
    } catch (e) {
      console.error(e);
      alert('제출 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetAll = () => {
    setSelectedTest(null);
    setResultId(null);
  };

  const title = resultId
    ? '검사 결과'
    : selectedTest
    ? selectedTest.name
    : '진단검사 목록';

  return (
    <section className="space-y-6">
      {/* 섹션 헤더 (블록 막대 + 제목) */}
      <SectionTitle size={22} showDivider>{title}</SectionTitle>

      {/* 상태별 콘텐츠 */}
      {!selectedTest && !resultId && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
          <DiagnosisTestList onSelectTest={setSelectedTest} />
        </div>
      )}

      {selectedTest && !resultId && (
        <div className="space-y-4">
          {/* 상단 액션바 */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              선택한 검사: <span className="font-medium">{selectedTest.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedTest(null)}
                className="w-auto rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 transition"
              >
                목록으로
              </button>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
            <DiagnosisQuestions
              testId={selectedTest.id}
              onSubmit={handleSubmit}
            />
          </div>

          {submitting && (
            <div className="text-center text-gray-500 text-sm">제출 중...</div>
          )}
        </div>
      )}

      {resultId && (
        <div className="space-y-4">
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={resetAll}
              className="w-auto rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 transition"
            >
              다시 선택
            </button>
            <button
              type="button"
              onClick={() => {
                setResultId(null);
                // 결과에서 바로 같은 검사 다시 진행하게 하려면 setSelectedTest 유지
              }}
              className="bg-[#222E8D] text-white px-3 py-1 rounded text-sm font-semibold hover:bg-blue-800 transition"
            >
              동일 검사 재응시
            </button>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
            <DiagnosisResult resultId={resultId} />
          </div>
        </div>
      )}
    </section>
  );
};

export default DiagnosisListFeature;
