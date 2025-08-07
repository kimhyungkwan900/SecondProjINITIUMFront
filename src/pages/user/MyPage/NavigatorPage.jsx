import PageHeader from "../../../component/common/PageHeader";

const NavigatorPage = () => {
  return (
    <div className="space-y-10">
      {/* 추천 비교과 프로그램 */}
      <section>            
            <PageHeader
                title="마이홈"
                breadcrumb={[
                    { label: "마이페이지(학생)", link: "/mypage" },
                    { label: "학생성공 네비게이터", active: true }
                ]}
            />
        {/* 추천 프로그램 */}
        <div>
          <h3 className="font-semibold mb-3 py-16 flex items-center">
            <span className="mr-2 text-[#184bad] font-bold">●</span>
            추천하는 비교과 프로그램은 다음과 같습니다.
          </h3>
          <div className="space-y-3">
            추천 프로그램 영역
          </div>
          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">비교과 프로그램 신청 버튼 추가필요</button>
          </div>
        </div>
      </section>
      
      {/* 비교과 프로그램 참여 이력 */}
      <section>
        <h3 className="font-semibold mb-2 flex items-center">
            비교과 프로그램 참여이력 작성
        </h3>
        <div>
          {/* 참여 이력 테이블 자리 */}
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">구분</th>
                <th className="border px-2 py-1">프로그램코드</th>
                <th className="border px-2 py-1">프로그램</th>
                <th className="border px-2 py-1">운영기간</th>
                <th className="border px-2 py-1">주관부서</th>
                <th className="border px-2 py-1">진행상태</th>
                <th className="border px-2 py-1">지원상태</th>
                <th className="border px-2 py-1">신청일</th>
              </tr>
            </thead>
            <tbody>
                해당 영역 기재
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">비교과 프로그램 신청 버튼 추가 필요</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NavigatorPage;
