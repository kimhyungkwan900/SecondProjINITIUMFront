import React from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '../../../features/user/mainpage/MainHeader';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#f6f9fc]">
      {/* 상단 고정 헤더 */}
      <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
        <MainHeader />
      </div>

      {/* 콘텐츠 레이아웃 */}
      <div className="flex pt-48 pb-10 max-w-7xl mx-auto">
        {/* 왼쪽 사이드바 */}
        <aside className="w-64 bg-white shadow-lg rounded-2xl p-6 h-fit mr-6">
          <h2 className="text-xl font-bold text-[#222E8D] mb-4">
            진단검사 메뉴
          </h2>
          <ul className="space-y-3">
            <li>
              <Link
                to="/diagnosis/internal"
                className="block bg-[#28B8B2] text-white text-center py-2 rounded-lg font-medium hover:bg-[#1a807b] transition"
              >
                심리 진단검사
              </Link>
            </li>
            <li>
              <Link
                to="/external-diagnosis"
                className="block bg-[#28B8B2] text-white text-center py-2 rounded-lg font-medium hover:bg-[#1a807b] transition"
              >
                커리어넷 진단검사
              </Link>
            </li>
            <li>
              <Link
                to="/all-results"
                className="block bg-[#28B8B2] text-white text-center py-2 rounded-lg font-medium hover:bg-[#1a807b] transition"
              >
                내 진단검사 결과
              </Link>
            </li>
          </ul>
        </aside>

        {/* 중앙~오른쪽 메인 콘텐츠 */}
        <main className="flex-1 bg-white shadow-lg rounded-2xl p-8 leading-relaxed">
          <h1 className="text-3xl font-bold text-[#222E8D] mb-6">
            학생 심리 및 진로 진단검사 안내
          </h1>
          <p className="text-gray-700 mb-6">
            본 시스템은 학생 여러분의 학업, 생활, 진로와 관련된 다양한 심리·역량 검사를 통해 
            현재 상태를 점검하고, 이를 기반으로 한 맞춤형 성장 계획을 수립할 수 있도록 
            지원하기 위해 마련되었습니다.  
            검사 결과는 비교과 프로그램, 멘토링, 진로 상담 등에 적극적으로 활용됩니다.
          </p>

          {/* 내부 진단검사 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#28B8B2] mb-3">
              📌 내부 진단검사
            </h2>
            <p className="text-gray-700">
              내부 진단검사는 대학이 자체적으로 마련한 검사 도구를 통해 
              학생의 학습 습관, 정서 상태, 자기관리 능력을 진단하는 프로그램입니다.  
              주요 제공 검사는 다음과 같습니다.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-1">
              <li>
                <strong>강박증 진단검사</strong> - 일상 생활과 학업 수행에서 나타나는 강박적 사고와 행동 경향을 진단합니다.
              </li>
              <li>
                <strong>사회공포·회피 진단검사</strong> - 대인관계, 발표, 협력 상황에서의 불안 및 회피 성향을 평가합니다.
              </li>
              <li>
                <strong>섭식장애 자가진단</strong> - 식습관 및 체형 인식과 관련된 문제를 자가 점검합니다.
              </li>
              <li>
                <strong>스트레스 자가진단 테스트</strong> - 학업, 대인관계, 생활 전반의 스트레스 수준과 원인을 파악합니다.
              </li>
              <li>
                <strong>인터넷 중독 진단검사</strong> - 인터넷 및 스마트폰 사용 패턴을 분석하여 중독 위험을 진단합니다.
              </li>
            </ul>
            <p className="text-gray-700 mt-3">
              각 검사 결과는 리커트 척도 또는 백분위 점수 형태로 제공되며,  
              진단 결과에 따른 구체적인 관리 방안과 피드백이 함께 제시됩니다.
            </p>
          </section>

          {/* 외부 진단검사 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-[#28B8B2] mb-3">
              🌐 외부 진단검사
            </h2>
            <p className="text-gray-700">
              외부 진단검사는 CareerNet 등 전문기관과 연계하여 다양한 성격·진로·역량 검사를 
              전문적으로 제공합니다. 이를 통해 학생은 더 폭넓고 객관적인 데이터를 기반으로 
              자신의 강점과 약점을 파악할 수 있습니다.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-1">
              <li>
                <strong>직업가치관검사</strong> - 직업 선택 시 중요하게 생각하는 가치 요소를 진단합니다.
              </li>
              <li>
                <strong>주요능력효능감검사</strong> - 직무 수행과 관련된 자기 효능감 수준을 평가합니다.
              </li>
              <li>
                <strong>진로개발준비도검사</strong> - 진로 탐색 및 계획 수립에 필요한 준비 수준을 점검합니다.
              </li>
              <li>
                <strong>이공계전공적합도검사</strong> - 이공계 분야 전공 선택의 적합성을 진단합니다.
              </li>
            </ul>
            <p className="text-gray-700 mt-3">
              외부 검사 결과는 PDF 파일로 다운로드 가능하며,  
              시스템 내에서 장기적으로 관리되어 추후 진로 상담이나 비교과 프로그램 추천 시 참고됩니다.
            </p>
          </section>

          {/* 검사 결과 활용 */}
          <section>
            <h2 className="text-2xl font-semibold text-[#28B8B2] mb-3">
              📊 검사 결과 활용 및 후속 조치
            </h2>
            <p className="text-gray-700">
              모든 진단검사 결과는 <strong>내 모든 진단검사 결과 페이지</strong>를 통해 확인할 수 있으며,  
              검사 결과는 다음과 같은 방식으로 활용됩니다.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-3 space-y-1">
              <li>개인별 역량 개발 계획 수립</li>
              <li>비교과 프로그램 참여 추천</li>
              <li>멘토링 및 진로 상담 연계</li>
              <li>졸업 전 필수 역량 달성 여부 확인</li>
            </ul>
            <p className="text-gray-700 mt-3">
              진단검사는 단순 평가가 아니라, 역량 향상을 위한 출발점입니다.  
              정기적인 재검사를 통해 성장 변화를 확인하고,  
              지속적으로 자기개발 계획을 보완하시기 바랍니다.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
