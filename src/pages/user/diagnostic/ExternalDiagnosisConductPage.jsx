import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';
import ExternalTestQuestions from '../../../component/user/diagnostic/ExternalTestQuestions.jsx';
import ExternalTestSubmit from '../../../component/user/diagnostic/ExternalTestSubmit.jsx';

// 🔹 외부 진단검사 목록 API (단일 조회용으로도 사용)
import { fetchExternalTests } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';
import UserTopBar from '../../../component/user/mainpage/UserTopBar.jsx';

const ExternalDiagnosisConductPage = () => {
  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // location.state에서 넘어온 값 (없을 수도 있음)
  const {
    questionApiCode: stateQuestionApiCode,
    targetCode: stateTargetCode,
    name: stateName,
    studentNo: stateStudentNo
  } = location.state || {};

  const [questionApiCode, setQuestionApiCode] = useState(stateQuestionApiCode || '');
  const [targetCode, setTargetCode] = useState(stateTargetCode || '');
  const [name, setName] = useState(stateName || '');
  const [studentNo] = useState(stateStudentNo || '1'); // 로그인 연동 예정
  const [loading, setLoading] = useState(!stateQuestionApiCode || !stateTargetCode);

  const [answers, setAnswers] = useState({});
  const [submitReady, setSubmitReady] = useState(false);

  // 🔹 location.state 없을 때 testId 기반으로 데이터 조회
  useEffect(() => {
    if (!stateQuestionApiCode || !stateTargetCode) {
      fetchExternalTests()
        .then((tests) => {
          const foundTest = tests.find((t) => String(t.id) === String(testId));
          if (!foundTest) {
            alert('검사 정보를 불러올 수 없습니다.');
            navigate('/external-diagnosis');
            return;
          }
          setQuestionApiCode(foundTest.questionApiCode);
          setTargetCode(foundTest.targetCode);
          setName(foundTest.name);
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

  const handleAnswersSubmit = (answersObj) => {
    setAnswers(answersObj);
    setSubmitReady(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f9fc] flex justify-center items-center">
        <p className="text-gray-600 text-lg font-medium">
          검사 정보를 불러오는 중...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      {/* 상단 고정 헤더 */}
      <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
        <UserTopBar />
        <MainHeader />
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex justify-center items-start pt-60 pb-10">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-[#222E8D] mb-8 text-center">
            {name || '외부 진단검사 실시'}
          </h1>

          {!submitReady ? (
            <ExternalTestQuestions
              qestrnSeq={questionApiCode}
              trgetSe={targetCode}
              onSubmit={handleAnswersSubmit}
            />
          ) : (
            <ExternalTestSubmit
              studentNo={studentNo}
              qestrnSeq={questionApiCode}
              trgetSe={targetCode}
              answers={answers}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExternalDiagnosisConductPage;
