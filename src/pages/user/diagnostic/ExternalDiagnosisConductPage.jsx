import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import MainHeader from '../../../features/user/mainpage/MainHeader.jsx';
import ExternalTestQuestions from '../../../component/user/diagnostic/ExternalTestQuestions.jsx';
import { fetchExternalTests } from '../../../api/user/diagnostic/externalDiagnosisApi.jsx';
import UserTopBar from '../../../component/user/mainpage/UserTopBar.jsx';
import { UserContext } from '../../../App.jsx';

/**
 *  ExternalDiagnosisConductPage
 * - 외부 진단검사(예: 커리어넷) 진행 페이지
 * - 문항 API 코드와 대상 코드를 이용해 문항을 불러오고, 응답을 제출
 */
const ExternalDiagnosisConductPage = () => {
  const { user } = useContext(UserContext); // 로그인한 사용자 정보
  const { testId } = useParams();           // URL에서 검사 ID 추출
  const location = useLocation();           // 페이지 이동 시 전달된 state
  const navigate = useNavigate();

  // location.state로 전달된 값 구조 분해
  const {
    questionApiCode: stateQuestionApiCode,
    targetCode: stateTargetCode,
    name: stateName,
    studentNo: stateStudentNo
  } = location.state || {};

  // 검사 정보 상태
  const [questionApiCode, setQuestionApiCode] = useState(stateQuestionApiCode || '');
  const [targetCode, setTargetCode] = useState(stateTargetCode || '');
  const [name, setName] = useState(stateName || '');
  const [studentNo] = useState(stateStudentNo || user?.loginId);
  const [loading, setLoading] = useState(!stateQuestionApiCode || !stateTargetCode);

  // 검사 정보 없을 경우 API로 불러오기
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
      <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
        <UserTopBar />
        <MainHeader />
      </div>

      <div className="flex justify-center items-start pt-60 pb-10">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-[#222E8D] mb-8 text-center">
            {name || '외부 진단검사 실시'}
          </h1>

          <ExternalTestQuestions
            qestrnSeq={questionApiCode}
            trgetSe={targetCode}
            studentNo={studentNo}
            testName={name}
          />
        </div>
      </div>
    </div>
  );
};

export default ExternalDiagnosisConductPage;
