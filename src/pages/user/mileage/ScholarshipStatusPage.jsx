import { useEffect, useState } from "react";
import PageHeader from "../../../component/common/PageHeader";
import PageButton from '../../../component/admin/extracurricular/PageButton';
import { getScholarshipStatus } from "../../../api/user/mileage/mileageApi";

const ScholarshipStatusPage = () => {
  const studentNo = sessionStorage.getItem("studentNo") || "2025108001";

  const [pageInfo, setPageInfo] = useState({
    dtoList: [],
    pageNumList: [],
    pageRequestDto: { page: 1, size: 10 },
    prev: false,
    next: false,
    totalCount: 0,
    totalPages: undefined, // 서버가 줄 수도 있음
  });
  const [page, setPage] = useState(1);
  const size = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getScholarshipStatus(studentNo, page, size);
        if (!mounted) return;
        setPageInfo(data);
      } catch (e) {
        console.error("현황 조회 실패:", e);
        alert(e?.response?.data?.message || "신청 현황을 불러오지 못했습니다.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [page, studentNo]);

  // 총 페이지 계산 (여러 응답 포맷 대응)
  const totalPages = (() => {
    if (pageInfo?.totalPages) return Math.max(1, Number(pageInfo.totalPages));
    const s = Number(pageInfo?.pageRequestDto?.size ?? size);
    if (pageInfo?.totalCount != null) {
      return Math.max(1, Math.ceil(Number(pageInfo.totalCount) / (s || 10)));
    }
    if (pageInfo?.total != null) {
      return Math.max(1, Math.ceil(Number(pageInfo.total) / (s || 10)));
    }
    const list = pageInfo?.pageNumList || [];
    const last = list.length ? list[list.length - 1] : 1;
    return Math.max(1, last + (pageInfo?.next ? 1 : 0));
  })();

  const fmtDate = (v) => (v ? String(v).substring(0, 10) : "");
  const fmtNumber = (n) => Number(n ?? 0).toLocaleString();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 bg-white">
      <PageHeader
        title="마일리지 장학금 신청 현황"
        breadcrumb={[
          { label: "마이페이지(학생)", link: "/mypage" },
          { label: "마일리지 현황", link: "/mypage/mileage" },
          { label: "장학금 신청 현황", active: true },
        ]}
      />

      <section className="content-section">
        <div className="border border-gray-300 rounded-md overflow-hidden">
          {/* 헤더 */}
          <div className="grid grid-cols-5 gap-4 bg-[#E0E7E9] text-[#354649] px-4 py-3 text-left font-semibold">
            <div className="text-center">번호</div>
            <div>신청일</div>
            <div>상태</div>
            <div>신청 마일리지</div>
            <div className="text-right">환산 금액</div>
          </div>

          {/* 본문 */}
          <div className="text-sm">
            {loading ? (
              <div className="p-6 text-[#6C7A89] text-center">불러오는 중...</div>
            ) : pageInfo.dtoList.length === 0 ? (
              <div className="p-6 text-[#6C7A89] text-center">신청 내역이 없습니다.</div>
            ) : (
              pageInfo.dtoList.map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-5 gap-4 items-center px-4 py-3 border-t border-gray-200 hover:bg-gray-50 ${
                    idx % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                  }`}
                >
                  <div className="text-center">
                    {(page - 1) * (pageInfo.pageRequestDto?.size || size) + idx + 1}
                  </div>
                  <div>{fmtDate(row.applyDate)}</div>
                  <div>{row.state}</div>
                  <div>{fmtNumber(row.accumulatedMileage)}</div>
                  <div className="text-right">{fmtNumber(row.calculatedAmount)}원</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* PageButton로 통일 */}
        <div className="mt-4 flex justify-center">
          <PageButton
            totalPages={totalPages}
            currentPage={page}          // 1-base
            onPageChange={setPage}
            maxVisible={10}
          />
        </div>
      </section>
    </div>
  );
};

export default ScholarshipStatusPage;
