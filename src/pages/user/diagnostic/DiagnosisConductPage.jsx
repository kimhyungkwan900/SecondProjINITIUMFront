// DiagnosisConductPage.jsx
import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DiagnosisQuestions from '../../../component/user/diagnostic/DiagnosisQuestions.jsx';
import DiagnosisResult from '../../../component/user/diagnostic/DiagnosisResult.jsx';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';
import UserTopBar from '../../../component/user/mainpage/UserTopBar.jsx';
import { UserContext } from '../../../App.jsx';

/**
 * DiagnosisConductPage
 * - 내부 진단검사 진행 페이지
 */
const DiagnosisConductPage = () => {
  const { user } = useContext(UserContext);
  const { testId } = useParams();
  const navigate = useNavigate();
  const studentNo = user?.loginId;
  const [resultId, setResultId] = useState(null);

  const handleSubmit = (rid) => {
    setResultId(rid);
    navigate(`/diagnosis/internal/result/${rid}`);
  };

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center">
      {/* 상단 고정 영역 */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <UserTopBar />
        <MainHeader />
      </div>

      {/* 메인 컨텐츠 영역: 62.6% 폭 + 상단 패딩(겹침 방지) */}
      <div className="w-[62.6%] min-w-[62.6%] m-auto pt-[220px] pb-10">
        <main className="bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-[#222E8D] text-center mb-8">
            내부 진단검사 실시
          </h1>

          {/* 섹션 헤더(파란 막대 + 제목) */}
          <div className="flex items-center gap-2 mb-4">
            <SectionTitle size={22} showDivider>{resultId ? '결과 요약' : '문항 진행'}</SectionTitle>
          </div>

          {!resultId ? (
            <DiagnosisQuestions
              testId={testId}
              studentNo={studentNo}
              onSubmit={handleSubmit}
            />
          ) : (
            <DiagnosisResult resultId={resultId} />
          )}
        </main>
      </div>
    </div>
  );
};

export default DiagnosisConductPage;
