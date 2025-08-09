// import React, { useEffect, useState, useCallback } from "react";
// import { fetchUserMileageSummary } from "../../api/userMileage";
// import Pagination from "../../component/Pagination";

// export default function myMileagePage() {
//   // 로그인한 사용자의 학번 (실제로는 로그인 세션에서 가져옴)
//   const studentNo = "2025108001"; // 예시 값

//   // 상태 관리
//   const [page, setPage] = useState(1); // 현재 페이지
//   const [totalScore, setTotalScore] = useState(0); // 총 마일리지
//   const [rows, setRows] = useState([]); // 내역 데이터
//   const [totalElements, setTotalElements] = useState(0); // 전체 데이터 수
//   const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
//   const [err, setErr] = useState(null); // 에러 메시지

//   // 데이터 로드 함수 (useCallback으로 의존성 고정)
//   const loadData = useCallback(async () => {
//     try {
//       setErr(null); // 에러 초기화

//       // API 호출
//       const data = await fetchUserMileageSummary({
//         studentNo,
//         page,
//         size: 10, // 페이지당 개수
//       });

//       // 총 마일리지
//       setTotalScore(data.totalScore || 0);

//       // dtoList가 배열인지 확인 후 rows에 저장
//       const list = Array.isArray(data.history?.dtoList) ? data.history.dtoList : [];
//       setRows(list);

//       // 전체 데이터 개수 & 페이지 수 계산
//       const totalCount = data.history?.totalCount || 0;
//       setTotalElements(totalCount);
//       setTotalPages(Math.ceil(totalCount / 10));
//     } catch (e) {
//       console.error(e);
//       setErr("데이터를 불러오지 못했습니다.");
//     }
//   }, [studentNo, page]);

//   // 페이지 변경될 때마다 데이터 새로 불러옴
//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">나의 마일리지</h1>

//       {/* 총 마일리지 표시 */}
//       <div className="mb-2">
//         <span className="font-semibold">총 마일리지: </span>
//         <span>{totalScore} 점</span>
//       </div>

//       {/* 전체 데이터 개수 표시 */}
//       <div className="mb-4 text-sm text-gray-500">
//         전체 데이터: {totalElements}개
//       </div>

//       {/* 에러 메시지 */}
//       {err && <div className="text-red-500 mb-4">{err}</div>}

//       {/* 마일리지 내역 테이블 */}
//       <table className="w-full border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">유형</th>
//             <th className="border p-2">내역</th>
//             <th className="border p-2">변동</th>
//             <th className="border p-2">누적</th>
//             <th className="border p-2">날짜</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.length > 0 ? (
//             rows.map((item, idx) => (
//               <tr key={idx}>
//                 <td className="border p-2">{item.type}</td>
//                 <td className="border p-2">{item.description}</td>
//                 <td className="border p-2">{item.change}</td>
//                 <td className="border p-2">{item.totalScore}</td>
//                 <td className="border p-2">{item.createdAt}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td className="border p-2 text-center" colSpan={5}>
//                 데이터가 없습니다.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* 페이지네이션 */}
//       <Pagination page={page} totalPages={totalPages} onChange={setPage} />
//     </div>
//   );
// }