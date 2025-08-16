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
    <div className="max-w-5xl mx-auto">
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
        {/* 테이블: 전체 기본 정렬을 없애고, 칼럼별로 지정 */}
        <table className="w-full border border-gray-200 table-fixed">
          <thead>
            <tr className="bg-[#E0E7E9] text-[#354649]">
              <th className="px-4 py-3 text-left font-semibold align-middle">번호</th>
              <th className="px-4 py-3 text-left font-semibold align-middle">신청일</th>
              <th className="px-4 py-3 text-left font-semibold align-middle">상태</th>
              <th className="px-4 py-3 text-left font-semibold align-middle">신청 마일리지</th>
              <th className="px-4 py-3 text-left font-semibold align-middle">환산 금액</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {loading ? (
              <tr>
                <td colSpan="5" className="p-6 text-[#6C7A89] text-center">불러오는 중...</td>
              </tr>
            ) : pageInfo.dtoList.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-[#6C7A89] text-center">신청 내역이 없습니다.</td>
              </tr>
            ) : (
              pageInfo.dtoList.map((row, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="px-4 py-3 align-middle text-center">
                    {(page - 1) * (pageInfo.pageRequestDto?.size || 10) + idx + 1}
                  </td>
                  <td className="px-4 py-3 align-middle">{String(row.applyDate).substring(0, 10)}</td>
                  <td className="px-4 py-3 align-middle">{row.state}</td>
                  <td className="px-4 py-3 align-middle">{row.accumulatedMileage}</td>
                  <td className="px-4 py-3 align-middle text-right">
                    {Number(row.calculatedAmount ?? 0).toLocaleString()}원
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mt-4">
          <Pagination pageInfo={pageInfo} onPageChange={(newPage) => setPage(newPage)} />
        </div>
      </section>

    </div>
  );
};

export default ScholarshipStatusPage;


// import React, { useEffect, useMemo, useState } from "react";
// import UserTopBar from "../../../component/user/mainpage/UserTopBar";
// import MainHeader from "../../../features/user/mainpage/MainHeader";
// import UserSideBar from "../../../features/user/UserSideBar";
// import Pagination from "../../../component/user/mileage/Pagination";
// import { getScholarshipStatus } from "../../../api/user/mileage/mileageApi";

// const ScholarshipStatusPage = () => {
//   const studentNo = sessionStorage.getItem("studentNo") || "2025108001";

//   // PageResponseDto 그대로 보관해서 Pagination 컴포넌트 재사용
//   const [pageInfo, setPageInfo] = useState({
//     dtoList: [],
//     pageNumList: [],
//     pageRequestDto: { page: 1, size: 10 },
//     prev: false,
//     next: false,
//     totalCount: 0
//   });
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);

//   // 좌측 사이드바
//   const navItems = useMemo(
//     () => [
//       "마일리지",
//     { link: "/mypage/mileage", name: "나의 마일리지" },
//     { link: "/mypage/mileage/apply", name: "마일리지 장학금 신청" },
//     { link: "/mypage/mileage/status", name: "마일리지 장학금 신청 현황" }
//     ],
//     []
//   );

//   const fetchStatus = async () => {
//     try {
//       setLoading(true);
//       const data = await getScholarshipStatus(studentNo, page, 10);
//       setPageInfo(data);
//     } catch (e) {
//       console.error("현황 조회 실패:", e);
//       alert(e?.response?.data?.message || "신청 현황을 불러오지 못했습니다.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStatus();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page]);

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
//           <div className="text-2xl font-bold mb-6">마일리지 장학금 신청 현황</div>

//           <div className="bg-white rounded shadow p-6">
//             <table className="w-full border border-gray-200 text-center">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="border p-2">번호</th>
//                   <th className="border p-2">신청일</th>
//                   <th className="border p-2">상태</th>
//                   <th className="border p-2">신청 마일리지</th>
//                   <th className="border p-2">환산 금액</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan="5" className="p-6 text-gray-500">불러오는 중...</td>
//                   </tr>
//                 ) : pageInfo.dtoList.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="p-6 text-gray-500">신청 내역이 없습니다.</td>
//                   </tr>
//                 ) : (
//                   pageInfo.dtoList.map((row, idx) => (
//                     <tr key={idx}>
//                       <td className="border p-2">
//                         {(page - 1) * (pageInfo.pageRequestDto?.size || 10) + idx + 1}
//                       </td>
//                       <td className="border p-2">
//                         {String(row.applyDate).substring(0, 10)}
//                       </td>
//                       <td className="border p-2">{row.state}</td>
//                       <td className="border p-2">{row.accumulatedMileage}</td>
//                       <td className="border p-2">
//                         {row.calculatedAmount?.toLocaleString()}원
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>

//             {/* 기존 Pagination 컴포넌트 재사용 */}
//             <div className="mt-4">
//               <Pagination
//                 pageInfo={pageInfo}
//                 onPageChange={(newPage) => setPage(newPage)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScholarshipStatusPage;
