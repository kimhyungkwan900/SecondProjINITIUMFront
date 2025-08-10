import React from 'react';
import MainHeader from '../../../features/user/mainpage/MainHeader';
import UserTopBar from '../../../component/user/mainpage/UserTopBar';
import UserSideBar from '../../../features/user/UserSideBar';
import SectionTitle from '../../../component/common/SectionTitle';

// 진단검사 홈페이지
const HomePage = () => {
  const diagnosisMenu = [
    '진단검사 메뉴',
    { name: '진단검사 안내', link: '/diagnosis' },
    { name: '심리 진단검사', link: '/diagnosis/internal' },
    { name: '커리어넷 진단검사', link: '/external-diagnosis' },
    { name: '내 진단검사 결과', link: '/diagnosis/all-results' },
  ];

  return (
    <div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center">
      {/* 상단 고정 헤더 */}
      <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
        <UserTopBar />
        <MainHeader />
      </div>

      {/* 메인 컨텐츠 영역: 62.6% + 상단 패딩 보정 */}
      <div className="w-[62.6%] min-w-[62.6%] m-auto pt-[220px] pb-10">
        <div className="flex gap-6">
          {/* 왼쪽 사이드바 */}
          <div className="shrink-0">
            <UserSideBar navItems={diagnosisMenu} />
          </div>

          {/* 중앙~오른쪽 메인 콘텐츠 */}
          <main className="flex-1 bg-white shadow-lg rounded-2xl p-8 leading-relaxed space-y-10">
            <header>
              <h1 className="text-3xl font-bold text-[#222E8D] mb-2">
                학생 심리 및 진로 진단검사 안내
              </h1>
              <p className="text-gray-700">
                본 시스템은 학생 여러분의 학업, 생활, 진로와 관련된 다양한 심리·역량 검사를 통해
                현재 상태를 점검하고, 이를 기반으로 한 맞춤형 성장 계획 수립을 지원합니다.
                검사 결과는 비교과 프로그램, 멘토링, 진로 상담 등에 적극적으로 활용됩니다.
              </p>
            </header>

            {/* 내부 진단검사 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <SectionTitle size={22} showDivider>📌 내부 진단검사</SectionTitle>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
                <p className="text-gray-700">
                  대학이 자체적으로 마련한 검사 도구를 통해 학습 습관, 정서 상태, 자기관리 능력을 진단합니다.
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li><strong>강박증 진단검사</strong> — 강박적 사고·행동 경향 진단</li>
                  <li><strong>사회공포·회피 진단검사</strong> — 대인/발표 상황 불안·회피 평가</li>
                  <li><strong>섭식장애 자가진단</strong> — 식습관 및 체형 인식 문제 점검</li>
                  <li><strong>스트레스 자가진단 테스트</strong> — 전반적 스트레스 수준/원인 파악</li>
                  <li><strong>인터넷 중독 진단검사</strong> — 사용 패턴 분석 및 위험 진단</li>
                </ul>
                <p className="text-gray-700">
                  결과는 리커트/백분위 등으로 제공되며, 결과에 따른 관리 방안과 피드백을 안내합니다.
                </p>
              </div>
            </section>

            {/* 외부 진단검사 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
              <SectionTitle size={22} showDivider>🌐 외부 진단검사</SectionTitle>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
                <p className="text-gray-700">
                  CareerNet 등 전문기관과 연계하여 성격·진로·역량 검사를 제공합니다.
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li><strong>직업가치관검사</strong> — 직업 선택 시 중시하는 가치 진단</li>
                  <li><strong>주요능력효능감검사</strong> — 직무 수행 관련 자기 효능감 평가</li>
                  <li><strong>진로개발준비도검사</strong> — 진로 탐색/계획 준비 수준 점검</li>
                  <li><strong>이공계전공적합도검사</strong> — 전공 선택 적합성 진단</li>
                </ul>
                <p className="text-gray-700">
                  외부 검사 결과는 PDF 다운로드 가능하며, 장기적으로 관리되어 상담/프로그램 추천에 참고됩니다.
                </p>
              </div>
            </section>

            {/* 검사 결과 활용 */}
            <section>
              <div className="flex items-center gap-2 mb-3">
              <SectionTitle size={22} showDivider>📊 검사 결과 활용 및 후속 조치</SectionTitle>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
                <p className="text-gray-700">
                  모든 결과는 <strong>내 모든 진단검사 결과 페이지</strong>에서 확인할 수 있으며, 다음과 같이 활용됩니다.
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>개인별 역량 개발 계획 수립</li>
                  <li>비교과 프로그램 참여 추천</li>
                  <li>멘토링 및 진로 상담 연계</li>
                  <li>졸업 전 필수 역량 달성 여부 확인</li>
                </ul>
                <p className="text-gray-700">
                  진단검사는 역량 향상을 위한 출발점입니다. 정기적인 재검사로 변화를 확인하고
                  자기개발 계획을 지속적으로 보완하세요.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
