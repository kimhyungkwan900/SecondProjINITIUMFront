import React, { useState } from 'react';
import DiagnosisTestList from '../../../component/user/diagnostic/DiagnosisTestList.jsx';
import DiagnosisQuestions from '../../../component/user/diagnostic/DiagnosisQuestions.jsx';
import DiagnosisResult from '../../../component/user/diagnostic/DiagnosisResult.jsx';
import { submitDiagnosis } from '../../../api/user/diagnostic/diagnosisApi.jsx';

/**
 * DiagnosisListFeature
 * - 내부 진단검사 전체 흐름(목록 → 문항 응답 → 결과)을 관리하는 컨테이너 컴포넌트
 * - props:
 *    studentNo: 현재 로그인한 학생 번호
 */
const DiagnosisListFeature = ({ studentNo }) => {
  // 현재 선택된 검사 정보 (id, name 등)
  const [selectedTest, setSelectedTest] = useState(null);

  // 검사 제출 후 생성된 결과 ID (결과 화면 전환 trigger)
  const [resultId, setResultId] = useState(null);

  /**
   * 검사 응답 제출
   * - answers: {문항ID: 선택값, ...}
   * - requestData 구조: 
   *   {
   *     studentNo,
   *     testId,
   *     answers: [{ questionId, selectedValue }, ...]
   *   }
   */
  const handleSubmit = (answers) => {
    const requestData = {
      studentNo,
      testId: selectedTest.id,
      answers: Object.entries(answers).map(([questionId, selectedValue]) => ({
        questionId: Number(questionId),
        selectedValue: Number(selectedValue),
      })),
    };

    // API 호출 → 결과 ID 저장 → 결과 화면으로 전환
    submitDiagnosis(requestData)
      .then((res) => setResultId(res.resultId))
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex justify-center items-start py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-[#222E8D] mb-6 text-center">
          {resultId
            ? '검사 결과'
            : selectedTest
            ? selectedTest.name
            : '진단검사 목록'}
        </h1>

        {/* 검사 목록 */}
        {!selectedTest && !resultId && (
          <div className="space-y-4">
            <DiagnosisTestList onSelectTest={setSelectedTest} />
          </div>
        )}

        {/* 문항 표시 */}
        {selectedTest && !resultId && (
          <div className="space-y-4">
            <DiagnosisQuestions
              testId={selectedTest.id}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        {/* 결과 표시 */}
        {resultId && (
          <div className="space-y-4">
            <DiagnosisResult resultId={resultId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisListFeature;
