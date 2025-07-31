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
        selectedValue,
      })),
    };

    submitDiagnosis(requestData)
      .then((res) => {
        setResultId(res.data.resultId);
      })
      .catch(console.error);
  };

  return (
    <div>
      {!selectedTest && !resultId && <DiagnosisTestList onSelectTest={setSelectedTest} />}
      {selectedTest && !resultId && (
        <DiagnosisQuestions testId={selectedTest.id} onSubmit={handleSubmit} />
      )}
      {resultId && <DiagnosisResult resultId={resultId} />}
    </div>
  );
};

export default DiagnosisListFeature;