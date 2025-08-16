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
    <div className="max-w-5xl mx-auto">
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
          history={history.dtoList}
          startIndex={(page - 1) * 10}
        />
        <div>
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



// import React, { useEffect, useState } from 'react';
// import { getMileageSummary } from '../../../api/user/mileage/mileageApi';
// import MileageSummary from '../../../component/user/mileage/MileageSummary';
// import MileageHistoryTable from '../../../component/user/mileage/MileageHistoryTable';
// import Pagination from '../../../component/user/mileage/Pagination';

// import UserTopBar from '../../../component/user/mainpage/UserTopBar';
// import MainHeader from '../../../features/user/mainpage/MainHeader';
// import UserSideBar from '../../../features/user/UserSideBar';

// const MyMileagePage = () => {
//   const [totalScore, setTotalScore] = useState(0);
//   const [history, setHistory] = useState({
//     dtoList: [],
//     pageNumList: [],
//     pageRequestDto: {},
//     prev: false,
//     next: false
//   });
//   const [page, setPage] = useState(1);

//   const studentNo = sessionStorage.getItem('studentNo') || '2025108001';

//   const fetchData = async () => {
//     try {
//       const data = await getMileageSummary(studentNo, page, 10);
//       setTotalScore(data.totalScore);
//       setHistory(data.history);
//     } catch (err) {
//       console.error('마일리지 데이터 불러오기 실패', err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page]);

//   // 마일리지 메뉴 항목
//   const navItems = [
//     "마일리지",
//     { link: "/mypage/mileage", name: "나의 마일리지" },
//     { link: "/mypage/mileage/apply", name: "마일리지 장학금 신청" },
//     { link: "/mypage/mileage/status", name: "마일리지 장학금 신청 현황" }
//   ];

//   return (
//     <div className="bg-white min-h-screen border border-gray-300">
//       {/* 상단 */}
//       <UserTopBar />
//       <MainHeader />

//       {/* 본문 레이아웃 */}
//       <div className="w-full max-w-screen-xl mx-auto flex px-6 py-10 gap-8">
//         {/* 좌측 사이드바 */}
//         <div className="w-[260px] flex-shrink-0">
//           <UserSideBar navItems={navItems} />
//         </div>

//         {/* 우측 본문 */}
//         <div className="flex-1">
//           <MileageSummary totalScore={totalScore} />
//           <MileageHistoryTable
//             history={history.dtoList}
//             startIndex={(page - 1) * 10}
//           />
//           <div className="mt-4">
//             <Pagination
//               pageInfo={history}
//               onPageChange={(newPage) => setPage(newPage)}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyMileagePage;


