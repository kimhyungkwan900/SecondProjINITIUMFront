import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExternalTestList from '../../../component/user/diagnostic/ExternalTestList.jsx';
import SectionTitle from '../../../component/common/SectionTitle.jsx';
import { useAuth } from '../../../hooks/useAuth.jsx';

/**
 * ExternalTestListFeature
 * - 외부 진단검사(커리어넷) 목록 화면 컨테이너 (콘텐츠 전용)
 * - 로그인 필요 / studentNo는 프론트에서 넘기지 않음(백엔드/서버 세션으로 식별)
 */
const ExternalTestListFeature = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  // 검사 선택 시 응시 페이지로 이동 (studentNo 전달 X)
  const handleSelectTest = (test) => {
    navigate(`/external-diagnosis/conduct/${test.id}`, {
      state: {
        questionApiCode: test.questionApiCode, // qestrnSeq
        targetCode: test.targetCode,           // trgetSe
        name: test.name,                       // UI 표시용
      },
    });
  };

  return (
    <section className="space-y-6">
      <SectionTitle size={22} showDivider>진단검사 목록</SectionTitle>
      <hr className="my-2 border-gray-200" />
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
        <ExternalTestList onSelectTest={handleSelectTest} />
      </div>
    </section>
  );
};

export default ExternalTestListFeature;
