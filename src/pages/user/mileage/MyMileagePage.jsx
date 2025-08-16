import React, { useEffect, useState } from 'react';
import PageHeader from "../../../component/common/PageHeader";
import { getMileageSummary } from '../../../api/user/mileage/mileageApi';
import MileageSummary from '../../../component/user/mileage/MileageSummary';
import MileageHistoryTable from '../../../component/user/mileage/MileageHistoryTable';
import Pagination from '../../../component/user/mileage/Pagination';

const MyMileagePage = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [history, setHistory] = useState({
    dtoList: [], pageNumList: [], pageRequestDto: {}, prev: false, next: false
  });
  const [page, setPage] = useState(1);

  const studentNo = sessionStorage.getItem('studentNo') || '2025108001';

  useEffect(() => {
    (async () => {
      try {
        const data = await getMileageSummary(studentNo, page, 10);
        setTotalScore(data.totalScore);
        setHistory(data.history);
      } catch (err) {
        console.error('마일리지 데이터 불러오기 실패', err);
      }
    })();
  }, [page, studentNo]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PageHeader
        title="나의 마일리지"
        breadcrumb={[
          { label: "마이페이지(학생)", link: "/mypage" },
          { label: "마일리지 현황", link: "/mypage/mileage" },
          { label: "나의 마일리지", active: true },
        ]}
      />

      <section className="bg-white rounded shadow-sm p-6">
        <MileageSummary totalScore={totalScore} />
        <div className="mt-6" />
        <MileageHistoryTable
          history={history.dtoList}
          startIndex={(page - 1) * 10}
        />
        <div className="mt-4">
          <Pagination
            pageInfo={history}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </section>
    </div>
  );
};

export default MyMileagePage;



