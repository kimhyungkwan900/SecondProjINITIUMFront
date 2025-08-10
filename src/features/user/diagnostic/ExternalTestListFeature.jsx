import React from 'react';
import ExternalTestList from '../../../component/user/diagnostic/ExternalTestList.jsx';
import { useNavigate } from 'react-router-dom';
import SectionTitle from '../../../component/common/SectionTitle.jsx';

/**
 * ExternalTestListFeature
 * - 외부 진단검사(커리어넷) 목록 화면 컨테이너 (콘텐츠 전용)
 * - 부모 페이지가 카드/레이아웃을 감싸고, 본 컴포넌트는 내부만 렌더
 */
const ExternalTestListFeature = ({ studentNo }) => {
  const navigate = useNavigate();

  // 검사 선택 시 상세(응시) 페이지로 이동
  const handleSelectTest = (test) => {
    navigate(`/external-diagnosis/conduct/${test.id}`, {
      state: {
        questionApiCode: test.questionApiCode, // qestrnSeq
        targetCode: test.targetCode,           // trgetSe
        name: test.name,                       // UI 표시용
        studentNo,                             // 현재 학생 번호
      },
    });
  };

  return (
    <section className="space-y-6">
      {/* 섹션 헤더 (파란 막대 + 제목) */}
      <SectionTitle size={22} showDivider>진단검사 목록</SectionTitle>
      <hr className="my-2 border-gray-200" />

      {/* 리스트 카드 */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
        <ExternalTestList onSelectTest={handleSelectTest} />
      </div>
    </section>
  );
};

export default ExternalTestListFeature;
