import React, { useEffect, useState } from "react";
import PageHeader from "../../../component/common/PageHeader";
import {
  getUserScholarshipInfo,
  getBankCodes,
  applyScholarship,
} from "../../../api/user/mileage/mileageApi";
import { useNavigate } from "react-router-dom";

// 응답 모양이 CommonCode 이든 {code,name} 이든 통일
const normalizeBanks = (arr = []) =>
  arr
    .map((b) => ({
      code: b?.code ?? b?.id?.code ?? "",
      name: b?.name ?? b?.codeNameKo ?? b?.codeName ?? b?.id?.code ?? "",
    }))
    .filter((x) => x.code && x.name);

const ScholarshipApplyPage = () => {
  const navigate = useNavigate();
  const studentNo = sessionStorage.getItem("studentNo") || "2025108001";

  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null); // { name, studentNo, subjectName, totalScore, accountNo, bankCode?, bankName?, banks? }
  const [banks, setBanks] = useState([]); // [{code,name}]
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNo, setAccountNo] = useState("");

  useEffect(() => {
    if (!studentNo) return;
    (async () => {
      try {
        setLoading(true);

        // 1) 사용자 정보
        const info = await getUserScholarshipInfo(studentNo);
        console.debug("[DEBUG] scholarship info =", info);

        setUserInfo(info);
        setAccountNo(info?.accountNo || "");
        setSelectedBank(info?.bankCode || "");

        // 2) 은행 목록 (info 안에 있으면 우선 사용)
        const raw =
          Array.isArray(info?.banks) && info.banks.length
            ? info.banks
            : await getBankCodes();

        const list = normalizeBanks(raw);

        // 내 은행 코드가 목록에 없으면 맨 앞에 합치기(필터링/권한 이슈 대비)
        const merged =
          info?.bankCode && info?.bankName && !list.some((b) => b.code === info.bankCode)
            ? [{ code: info.bankCode, name: info.bankName }, ...list]
            : list;

        setBanks(merged);
      } catch (e) {
        console.error("초기 데이터 로드 실패", e);
        alert("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [studentNo]);

  const handleApply = async () => {
    if (!userInfo) return;

    if (userInfo.totalScore < 50) {
      alert("총 마일리지가 50점 미만이라 신청이 어렵습니다.");
      return;
    }
    if (!selectedBank) {
      alert("은행을 선택해 주세요.");
      return;
    }
    if (!accountNo.trim()) {
      alert("계좌번호를 입력해 주세요.");
      return;
    }

    try {
      // 서버 DTO: { studentNo, accountNo }만 필요하면 그대로, 은행코드도 필요하면 아래 주석 해제
      await applyScholarship({
        studentNo: userInfo.studentNo,
        accountNo: accountNo.trim(),
        // bankCode: selectedBank,
      });
      alert("장학금 신청이 완료되었습니다.");
      navigate("/mypage/mileage/status");
    } catch (e) {
      console.error("신청 실패", e);
      alert(e?.response?.data?.message || "신청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <PageHeader
        title="마일리지 장학금 신청"
        breadcrumb={[
          { label: "마이페이지(학생)", link: "/mypage" },
          { label: "마일리지 현황", link: "/mypage/mileage" },
          { label: "장학금 신청", active: true },
        ]}
      />

      <section className="bg-white rounded shadow-sm p-6">
        {loading || !userInfo ? (
          <div className="py-20 text-center text-gray-500">불러오는 중...</div>
        ) : (
          <>
            {/* 총점 안내 */}
            <div className="mb-6 text-lg">
              <span className="font-semibold">
                총 마일리지 : {userInfo.totalScore}점
              </span>
              <span className="ml-2 text-gray-500">(50점 이상 신청 가능)</span>
            </div>

            {/* 사용자 정보 */}
            <div className="grid grid-cols-2 gap-y-5 gap-x-10">
              <div>
                <div className="text-gray-500 mb-1">성명</div>
                <div className="font-semibold">{userInfo.name}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">학번</div>
                <div className="font-semibold">{userInfo.studentNo}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">학과</div>
                <div className="font-semibold">{userInfo.subjectName}</div>
              </div>

              {/* 은행명 */}
              <div>
                <div className="text-gray-500 mb-1">은행명</div>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  disabled={!banks.length}
                >
                  <option value="">은행 선택</option>
                  {banks.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 계좌번호 */}
              <div className="col-span-2">
                <div className="text-gray-500 mb-1">계좌번호</div>
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="숫자만 입력"
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  * 사용자 기본정보에 등록된 계좌가 있으면 자동으로 채워집니다. 수정 가능합니다.
                </p>
              </div>
            </div>

            {/* 신청 버튼 */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleApply}
                disabled={userInfo.totalScore < 50}
                className={`px-6 py-3 rounded text-white font-semibold ${
                  userInfo.totalScore < 50
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                신청하기
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ScholarshipApplyPage;




// import React, { useEffect, useState } from "react";
// import PageHeader from "../../../component/common/PageHeader";
// import {
//   getUserScholarshipInfo,  // ✅ 이름/학과/총점/계좌 모두 여기서 받음
//   getBankCodes,
//   applyScholarship
// } from "../../../api/user/mileage/mileageApi";
// import { useNavigate } from "react-router-dom";

// const ScholarshipApplyPage = () => {
//   const navigate = useNavigate();
//   const studentNo = sessionStorage.getItem("studentNo") || "2025108001";

//   const [loading, setLoading] = useState(true);
//   const [userInfo, setUserInfo] = useState(null);            // { name, studentNo, subjectName, totalScore, accountNo }
//   const [banks, setBanks] = useState([]);                    // CommonCode[]
//   const [selectedBank, setSelectedBank] = useState("");      // 표시용(백엔드 DTO엔 없음)
//   const [accountNo, setAccountNo] = useState("");            // 입력/수정 가능
//   const [info, setInfo] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);   
//         // 사용자 기본 정보 + 총점 + 계좌
//         const info = await getUserScholarshipInfo(studentNo);
//         console.log("[DEBUG] scholarship info =", info);
//         setUserInfo(info);
//         setAccountNo(info?.accountNo || "");
//         setSelectedBank(info?.bankCode || ""); 

//         // 은행 코드 목록
//         const bankList = await getBankCodes();
//         setBanks(Array.isArray(bankList) ? bankList : []);
//       } catch (e) {
//         console.error("초기 데이터 로드 실패", e);
//         alert("데이터를 불러오지 못했습니다.");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [studentNo]);

//   const handleApply = async () => {
//     if (!userInfo) return;
//     if (userInfo.totalScore < 50) {
//       alert("총 마일리지가 50점 미만이라 신청이 어렵습니다.");
//       return;
//     }
//     if (!accountNo.trim()) {
//       alert("계좌번호를 입력해 주세요.");
//       return;
//     }

//     try {
//       await applyScholarship({
//         studentNo: userInfo.studentNo,
//         accountNo: accountNo.trim(),   //서버 DTO: { studentNo, accountNo }
//       });
//       alert("장학금 신청이 완료되었습니다.");
//       navigate("/mypage/mileage/status");
//     } catch (e) {
//       console.error("신청 실패", e);
//       alert(e?.response?.data?.message || "신청 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-6">
//       <PageHeader
//         title="마일리지 장학금 신청"
//         breadcrumb={[
//           { label: "마이페이지(학생)", link: "/mypage" },
//           { label: "마일리지 현황", link: "/mypage/mileage" },
//           { label: "장학금 신청", active: true },
//         ]}
//       />

//       <section className="bg-white rounded shadow-sm p-6">
//         {loading || !userInfo ? (
//           <div className="py-20 text-center text-gray-500">불러오는 중...</div>
//         ) : (
//           <>
//             {/* 총점 안내 */}
//             <div className="mb-6 text-lg">
//               <span className="font-semibold">총 마일리지 : {userInfo.totalScore}점</span>
//               <span className="ml-2 text-gray-500">(50점 이상 신청 가능)</span>
//             </div>

//             {/* 사용자 정보 */}
//             <div className="grid grid-cols-2 gap-y-5 gap-x-10">
//               <div>
//                 <div className="text-gray-500 mb-1">성명</div>
//                 <div className="font-semibold">{userInfo.name}</div>
//               </div>
//               <div>
//                 <div className="text-gray-500 mb-1">학번</div>
//                 <div className="font-semibold">{userInfo.studentNo}</div>
//               </div>
//               <div>
//                 <div className="text-gray-500 mb-1">학과</div>
//                 <div className="font-semibold">{userInfo.subjectName}</div>
//               </div>

//               {/* 은행명 (표시용 드롭다운) */}
//               <div>
//                 <div className="text-gray-500 mb-1">은행명</div>
//                 <select
//                   className="w-full border rounded px-3 py-2"
//                   value={selectedBank}
//                   onChange={(e) => setSelectedBank(e.target.value)}
//                 >
//                   <option value="">은행 선택</option>
//                   {banks.map((b) => {
//                     // CommonCode 형태 유연 대응
//                     const key = `${b?.id?.codeGroup}-${b?.id?.code}`;
//                     const label = b?.codeNameKo || b?.codeName || b?.name || b?.id?.code;
//                     return (
//                       <option key={key} value={b?.id?.code}>
//                         {label}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>

//               {/* 계좌번호 입력 */}
//               <div className="col-span-2">
//                 <div className="text-gray-500 mb-1">계좌번호</div>
//                 <input
//                   className="w-full border rounded px-3 py-2"
//                   placeholder="숫자만 입력"
//                   value={accountNo}
//                   onChange={(e) => setAccountNo(e.target.value)}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   * 사용자 기본정보에 등록된 계좌가 있으면 자동으로 채워집니다. 수정 가능합니다.
//                 </p>
//               </div>
//             </div>

//             {/* 신청 버튼 */}
//             <div className="mt-8 flex justify-end">
//               <button
//                 onClick={handleApply}
//                 disabled={userInfo.totalScore < 50}
//                 className={`px-6 py-3 rounded text-white font-semibold ${
//                   userInfo.totalScore < 50
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 신청하기
//               </button>
//             </div>
//           </>
//         )}
//       </section>
//     </div>
//   );
// };

// export default ScholarshipApplyPage;



