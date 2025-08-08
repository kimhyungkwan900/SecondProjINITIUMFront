import PageHeader from "../../../component/common/PageHeader";

const NavigatorPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="마이홈"
        breadcrumb={[
          { label: "마이페이지(학생)", link: "/mypage" },
          { label: "학생성공 네비게이터", active: true },
        ]}
      />

      {/* 추천 비교과 프로그램 */}
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-6">
        <h3 className="font-semibold mb-4 flex items-center text-lg">
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
      <section className="bg-white border border-gray-200 rounded-lg shadow-sm px-6 py-6">
        <h3 className="font-semibold mb-4 flex items-center text-lg">
          비교과 프로그램 참여 이력
        </h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="border-b px-3 py-2 text-center font-semibold">구분</th>
                <th className="border-b px-3 py-2 text-center font-semibold">프로그램코드</th>
                <th className="border-b px-3 py-2 text-center font-semibold">프로그램</th>
                <th className="border-b px-3 py-2 text-center font-semibold">운영기간</th>
                <th className="border-b px-3 py-2 text-center font-semibold">주관부서</th>
                <th className="border-b px-3 py-2 text-center font-semibold">진행상태</th>
                <th className="border-b px-3 py-2 text-center font-semibold">지원상태</th>
                <th className="border-b px-3 py-2 text-center font-semibold">신청일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="text-center text-gray-400 py-6">
                  해당 영역 기재
                </td>
              </tr>
            </tbody>
          </table>
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
