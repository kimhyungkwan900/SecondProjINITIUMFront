import PageHeader from "../../../component/common/PageHeader";

const NavigatorPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 bg-white">
      <PageHeader
        title="마이홈"
        breadcrumb={[
          { label: "마이페이지(학생)", link: "/mypage" },
          { label: "학생성공 네비게이터", active: true },
        ]}
      />

      {/* 추천 비교과 프로그램 */}
      <section className="content-section">
        <h3 className="section-title">
          <span className="mr-2 text-[#184bad] font-bold">●</span>
          추천 비교과 프로그램
        </h3>
        <div className="space-y-3 text-gray-700">
          추천 프로그램 영역
        </div>
        <div className="flex justify-end mt-6">
        </div>
      </section>

      {/* 비교과 프로그램 참여 이력 */}
      <section className="content-section">
        <h3 className="section-title">
          비교과 프로그램 참여 이력
        </h3>
        <div className="border border-gray-300 rounded-md overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-8 text-sm font-semibold text-center text-[#354649] bg-[#E0E7E9]">
            <div className="px-4 py-2 border-b border-gray-300">구분</div>
            <div className="px-4 py-2 border-b border-gray-300">프로그램코드</div>
            <div className="px-4 py-2 border-b border-gray-300">프로그램</div>
            <div className="px-4 py-2 border-b border-gray-300">운영기간</div>
            <div className="px-4 py-2 border-b border-gray-300">주관부서</div>
            <div className="px-4 py-2 border-b border-gray-300">진행상태</div>
            <div className="px-4 py-2 border-b border-gray-300">지원상태</div>
            <div className="px-4 py-2 border-b border-gray-300">신청일</div>
          </div>
          {/* Body Row(s) */}
          <div>
            <div className="grid grid-cols-8 border-t border-gray-200 text-center text-sm">
              <div className="px-4 py-2 col-span-8 text-gray-500">해당 영역 기재</div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
        </div>
      </section>
    </div>
  );
};

export default NavigatorPage;
