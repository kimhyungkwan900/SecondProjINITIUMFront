// DiagnosisConductPage.jsx
import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DiagnosisQuestions from '../../../component/user/diagnostic/DiagnosisQuestions.jsx';
import DiagnosisResult from '../../../component/user/diagnostic/DiagnosisResult.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';
import UserTopBar from '../../../component/user/mainpage/UserTopBar.jsx';
import { UserContext } from '../../../App.jsx';

/**
 *  DiagnosisConductPage
 * - 내부 진단검사를 실제로 진행하는 페이지
 * - 검사 문항 표시 → 응답 제출 후 결과 페이지로 이동
 */
const DiagnosisConductPage = () => {
  const { user } = useContext(UserContext);
  const { testId } = useParams();
  const navigate = useNavigate();
  const studentNo = user?.loginId;
  const [resultId, setResultId] = useState(null);

  const handleSubmit = (resultId) => {
    setResultId(resultId);
    navigate(`/diagnosis/internal/result/${resultId}`);
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
        <UserTopBar />
        <MainHeader />
      </div>

      <div className="flex justify-center items-start pt-60 pb-10">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-[#222E8D] mb-8 text-center">
            내부 진단검사 실시
          </h1>

          {!resultId ? (
            <DiagnosisQuestions
              testId={testId}
              studentNo={studentNo}
              onSubmit={handleSubmit}
            />
          ) : (
            <DiagnosisResult resultId={resultId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DiagnosisConductPage;
