import React, { useState } from 'react';
import DiagnosisTestList from '../../../component/user/diagnostic/DiagnosisTestList.jsx';
import DiagnosisQuestions from '../../../component/user/diagnostic/DiagnosisQuestions.jsx';
import DiagnosisResult from '../../../component/user/diagnostic/DiagnosisResult.jsx';
import { submitDiagnosis } from '../../../api/user/diagnostic/diagnosisApi.jsx';

const DiagnosisListFeature = ({ studentNo }) => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [resultId, setResultId] = useState(null);

  const handleSubmit = (answers) => {
    const requestData = {
      studentNo,
      testId: selectedTest.id,
      answers: Object.entries(answers).map(([questionId, selectedValue]) => ({
        questionId: Number(questionId),
        selectedValue: Number(selectedValue),
      })),
    };

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
