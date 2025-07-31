//ExternalTestListFeature.jsx
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
    <div>
      {!selectedTest && !submitReady && <ExternalTestList onSelectTest={setSelectedTest} />}
      {selectedTest && !submitReady && (
        <ExternalTestQuestions
          qestrnSeq={selectedTest.questionApiCode}
          trgetSe={selectedTest.targetCode}
          onSubmit={handleAnswersSubmit}
        />
      )}
      {submitReady && (
        <ExternalTestSubmit
          studentNo={studentNo}
          qestrnSeq={selectedTest.questionApiCode}
          trgetSe={selectedTest.targetCode}
          answers={answers}
        />
      )}
    </div>
  );
};

export default ExternalTestListFeature;