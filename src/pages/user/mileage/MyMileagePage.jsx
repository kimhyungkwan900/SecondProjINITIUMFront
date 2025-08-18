import React, { useEffect, useState } from 'react';
import PageHeader from "../../../component/common/PageHeader";
import { getMileageSummary } from '../../../api/user/mileage/mileageApi';
import MileageSummary from '../../../component/user/mileage/MileageSummary';
import MileageHistoryTable from '../../../component/user/mileage/MileageHistoryTable';
import PageButton from '../../../component/admin/extracurricular/PageButton';

const MyMileagePage = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [history, setHistory] = useState({
    dtoList: [],
    pageNumList: [],
    pageRequestDto: { page: 1, size: 10 },
    prev: false,
    next: false,
    totalCount: 0,     // 서버가 내려주면 사용, 없으면 0
    totalPages: undefined, // 서버가 직접 내려줄 수도 있음
  });
  const [page, setPage] = useState(1);

  const size = 10; //요청과 계산에 사용할 페이지 크기
  const studentNo = sessionStorage.getItem('studentNo') || '2025108001';

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getMileageSummary(studentNo, page, size);
        if (!mounted) return;
        setTotalScore(data.totalScore);
        setHistory(data.history);
      } catch (err) {
        console.error('마일리지 데이터 불러오기 실패', err);
      }
    })();
    return () => { mounted = false; };
  }, [page, studentNo]);

  // 총 페이지 계산 (여러 응답 포맷 대응)
  const totalPages = (() => {
    if (history?.totalPages) return Math.max(1, Number(history.totalPages));
    const s = Number(history?.pageRequestDto?.size ?? size);
    if (history?.totalCount != null) {
      return Math.max(1, Math.ceil(Number(history.totalCount) / (s || 10)));
    }
    // totalCount가 없다면 pageNumList/next로 보수적으로 추정
    const list = history?.pageNumList || [];
    const last = list.length ? list[list.length - 1] : 1;
    return Math.max(1, last + (history?.next ? 1 : 0));
  })();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 bg-white">
      <PageHeader
        title="나의 마일리지"
        breadcrumb={[
          { label: "마이페이지(학생)", link: "/mypage" },
          { label: "마일리지 현황", link: "/mypage/mileage" },
          { label: "나의 마일리지", active: true },
        ]}
      />

      <section className="content-section">
        <MileageSummary totalScore={totalScore} />
        <MileageHistoryTable
          history={history.dtoList || []}
          startIndex={(page - 1) * size}
        />

        <div className="flex justify-center mt-4">
          <PageButton
            totalPages={totalPages}
            currentPage={page}                 // 1-base
            onPageChange={(next) => setPage(next)}
            maxVisible={10}
          />
        </div>
      </section>
    </div>
  );
};

export default MyMileagePage;
