import { useEffect, useState } from "react";
import PageHeader from "../../../component/common/PageHeader";
import Pagination from "../../../component/user/mileage/Pagination";
import { getScholarshipStatus } from "../../../api/user/mileage/mileageApi";

const ScholarshipStatusPage = () => {
  const studentNo = sessionStorage.getItem("studentNo") || "2025108001";

  const [pageInfo, setPageInfo] = useState({
    dtoList: [], pageNumList: [], pageRequestDto: { page: 1, size: 10 }, prev: false, next: false, totalCount: 0
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getScholarshipStatus(studentNo, page, 10);
        setPageInfo(data);
      } catch (e) {
        console.error("현황 조회 실패:", e);
        alert(e?.response?.data?.message || "신청 현황을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [page, studentNo]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 bg-white">
      {/* 상단 헤더 */}
      <PageHeader
        title="마일리지 장학금 신청 현황"
        breadcrumb={[
          { label: "마이페이지(학생)", link: "/mypage" },
          { label: "마일리지 현황", link: "/mypage/mileage" },
          { label: "신청 현황", active: true },
        ]}
      />

      {/* 본문 카드 */}
      <section className="content-section">
        <div className="border border-gray-300 rounded-md overflow-hidden">
          {/* 테이블 헤더 */}
          <div className="grid grid-cols-5 gap-4 bg-[#E0E7E9] text-[#354649] px-4 py-3 text-left font-semibold">
            <div className="text-center">번호</div>
            <div>신청일</div>
            <div>상태</div>
            <div>신청 마일리지</div>
            <div className="text-right">환산 금액</div>
          </div>

          {/* 테이블 본문 */}
          <div className="text-sm">
            {loading ? (
              <div className="p-6 text-[#6C7A89] text-center">불러오는 중...</div>
            ) : pageInfo.dtoList.length === 0 ? (
              <div className="p-6 text-[#6C7A89] text-center">신청 내역이 없습니다.</div>
            ) : (
              pageInfo.dtoList.map((row, idx) => (
                <div key={idx} className={`grid grid-cols-5 gap-4 items-center px-4 py-3 border-t border-gray-200 hover:bg-gray-50 ${
                  idx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                }`}>
                  <div className="text-center">
                    {(page - 1) * (pageInfo.pageRequestDto?.size || 10) + idx + 1}
                  </div>
                  <div>{String(row.applyDate).substring(0, 10)}</div>
                  <div>{row.state}</div>
                  <div>{row.accumulatedMileage}</div>
                  <div className="text-right">
                    {Number(row.calculatedAmount ?? 0).toLocaleString()}원
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-4">
          <Pagination pageInfo={pageInfo} onPageChange={(newPage) => setPage(newPage)} />
        </div>
      </section>

    </div>
  );
};

export default ScholarshipStatusPage;
