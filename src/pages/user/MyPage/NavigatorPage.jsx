import PageHeader from "../../../component/common/PageHeader";

const NavigatorPage = () => {
  return (
    <div>
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
          추천하는 비교과 프로그램은 다음과 같습니다.
        </h3>
        <div className="space-y-3 text-gray-700">
          추천 프로그램 영역
        </div>
        <div className="flex justify-end mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            비교과 프로그램 신청
          </button>
        </div>
      </section>

      {/* 비교과 프로그램 참여 이력 */}
      <section className="content-section">
        <h3 className="section-title">
          비교과 프로그램 참여 이력
        </h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          {/* Header Row */}
          <div className="grid grid-cols-8 w-full text-sm bg-gray-50">
            <div className="border-b px-3 py-2 text-center font-semibold truncate">구분</div>
            <div className="border-b px-3 py-2 text-center font-semibold truncate">프로그램코드</div>
            <div className="border-b px-3 py-2 text-center font-semibold truncate">프로그램</div>
            <div className="border-b px-3 py-2 text-center font-semibold truncate">운영기간</div>
            <div className="border-b px-3 py-2 text-center font-semibold truncate">주관부서</div>
            <div className="border-b px-3 py-2 text-center font-semibold truncate">진행상태</div>
            <div className="border-b px-3 py-2 text-center font-semibold truncate">지원상태</div>
            <div className="border-b px-3 py-2 text-center font-semibold truncate">신청일</div>
          </div>
          {/* Body Row(s) */}
          <div className="grid grid-cols-8 w-full text-sm">
            <div className="col-span-8 text-center text-gray-400 py-6 truncate">
              해당 영역 기재
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            비교과 프로그램 신청
          </button>
        </div>
      </section>
    </div>
  );
};

export default NavigatorPage;
