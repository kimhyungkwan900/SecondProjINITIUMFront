import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DiagnosisQuestions from '../../../component/user/diagnostic/DiagnosisQuestions.jsx';
import DiagnosisResult from '../../../component/user/diagnostic/DiagnosisResult.jsx';
import { submitDiagnosis } from '../../../api/user/diagnostic/diagnosisApi.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';
import { UserContext } from '../../../App.jsx';

const DiagnosisConductPage = () => {
  const { user } = useContext(UserContext);
  const { testId } = useParams();
  const navigate = useNavigate();
  const studentNo = user?.loginId; // 🔹 로그인 연동 시 수정
  const [resultId, setResultId] = useState(null);

  const handleSubmit = (answers) => {
    const requestData = {
      studentNo,
      testId,
      answers: Object.entries(answers).map(([questionId, selectedValue]) => ({
        questionId: Number(questionId),
        selectedValue: Number(selectedValue),
      })),
    };

    submitDiagnosis(requestData)
      .then((res) => {
        setResultId(res.resultId);
        navigate(`/diagnosis/result/${res.resultId}`);
      })
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      {/* 상단 고정 헤더 */}
      <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
        <MainHeader />
      </div>

      {/* 콘텐츠 영역 (헤더 높이만큼 패딩 추가) */}
      <div className="flex justify-center items-start pt-48 pb-10">
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
