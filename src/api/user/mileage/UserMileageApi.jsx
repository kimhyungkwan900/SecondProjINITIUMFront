// import axios from 'axios';

// export const fetchUserMileageSummary = async ({ studentNo, page = 1, size = 10 }) => {
//   try {
//     const params = new URLSearchParams();
//     params.append("studentNo", studentNo);
//     // 백엔드에서 페이지가 0부터 시작하면 -1 해줘야 함
//     params.append("page", page - 1);
//     params.append("size", size);

//     const res = await axios.get("/api/user/mileage/summary", {
//       params,
//       withCredentials: true, // 세션 쿠키 전달
//     });

//     console.log("API 응답 데이터:", res.data); // 구조 확인용
//     return res.data;
//   } catch (error) {
//     console.error("마일리지 요약 API 호출 실패", error);
//     throw error;
//   }
// };
