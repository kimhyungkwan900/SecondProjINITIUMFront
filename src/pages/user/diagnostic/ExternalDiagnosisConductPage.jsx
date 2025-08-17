import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';
import ExternalTestQuestions from '../../../component/user/diagnostic/ExternalTestQuestions.jsx';
import { fetchExternalTests } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';
import UserTopBar from '../../../component/user/mainpage/UserTopBar.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';
import SectionTitle from '../../../component/common/SectionTitle.jsx';

/**
 * ExternalDiagnosisConductPage
 * - 외부 진단검사(예: 커리어넷) 진행 페이지
 */
const ExternalDiagnosisConductPage = () => {
  const { user } = useAuth();
  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    questionApiCode: stateQuestionApiCode,
    targetCode: stateTargetCode,
    name: stateName,
    studentNo: stateStudentNo,
  } = location.state || {};

  const [questionApiCode, setQuestionApiCode] = useState(stateQuestionApiCode || '');
  const [targetCode, setTargetCode] = useState(stateTargetCode || '');
  const [name, setName] = useState(stateName || '');
  const [studentNo] = useState(stateStudentNo || user?.loginId);
  const [loading, setLoading] = useState(!stateQuestionApiCode || !stateTargetCode);

  useEffect(() => {
    if (!stateQuestionApiCode || !stateTargetCode) {
      fetchExternalTests()
        .then((tests) => {
          const found = tests.find((t) => String(t.id) === String(testId));
          if (!found) {
            alert('검사 정보를 불러올 수 없습니다.');
            navigate('/external-diagnosis');
            return;
          }
          setQuestionApiCode(found.questionApiCode);
          setTargetCode(found.targetCode);
          setName(found.name);
        })
        .catch((err) => {
          console.error(err);
          alert('검사 정보를 불러오는 중 오류가 발생했습니다.');
          navigate('/external-diagnosis');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [testId, stateQuestionApiCode, stateTargetCode, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center">
        {/* 상단 고정 영역 */}
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
          <UserTopBar />
          <MainHeader />
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="w-[62.6%] min-w-[62.6%] m-auto pt-[220px] pb-10">
          <div className="bg-white shadow-lg rounded-2xl p-8 text-center text-gray-600">
            검사 정보를 불러오는 중...
          </div>
        </div>
      </div>
    );
  }

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
            {name || '외부 진단검사 실시'}
          </h1>

          {/* 섹션 헤더 */}
          <div className="flex items-center gap-2 mb-4">
            {/* 파란 막대: 글자 대신 블록 요소로 */}
            <SectionTitle size={22} showDivider>문항 진행</SectionTitle>
          </div>


          <ExternalTestQuestions
            qestrnSeq={questionApiCode}
            trgetSe={targetCode}
            studentNo={studentNo}
            testName={name}
          />
        </main>
      </div>
    </div>
  );
};

export default ExternalDiagnosisConductPage;
