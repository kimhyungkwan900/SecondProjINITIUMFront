import React, { useState } from 'react';
import ExternalTestList from '../../../component/user/diagnostic/ExternalTestList.jsx';
import ExternalTestQuestions from '../../../component/user/diagnostic/ExternalTestQuestions.jsx';
import ExternalTestSubmit from '../../../component/user/diagnostic/ExternalTestSubmit.jsx';

const ExternalTestListFeature = ({ studentNo }) => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitReady, setSubmitReady] = useState(false);

  const handleAnswersSubmit = (answersObj) => {
    setAnswers(answersObj);
    setSubmitReady(true);
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex justify-center items-start py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-[#222E8D] mb-6 text-center">
          {submitReady
            ? '검사 제출'
            : selectedTest
            ? selectedTest.testName
            : '외부 진단검사 목록'}
        </h1>

        {/* 외부 검사 목록 */}
        {!selectedTest && !submitReady && (
          <div className="space-y-4">
            <ExternalTestList onSelectTest={setSelectedTest} />
          </div>
        )}

        {/* 외부 검사 문항 */}
        {selectedTest && !submitReady && (
          <div className="space-y-4">
            <ExternalTestQuestions
              qestrnSeq={selectedTest.questionApiCode}
              trgetSe={selectedTest.targetCode}
              onSubmit={handleAnswersSubmit}
            />
          </div>
        )}

        {/* 외부 검사 제출 */}
        {submitReady && (
          <div className="space-y-4">
            <ExternalTestSubmit
              studentNo={studentNo}
              qestrnSeq={selectedTest.questionApiCode}
              trgetSe={selectedTest.targetCode}
              answers={answers}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExternalTestListFeature;
