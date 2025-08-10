import React, { useEffect, useMemo, useState } from "react";
import UserTopBar from "../../../component/user/mainpage/UserTopBar";
import MainHeader from "../../../features/user/mainpage/MainHeader";
import UserSideBar from "../../../features/user/UserSideBar";

import {
  getUserScholarshipInfo,
  getBankCodes,
  applyScholarship,
} from "../../../api/user/mileage/mileageApi";
import { useNavigate } from "react-router-dom";

const UserScholarshipApplyPage = () => {
  const navigate = useNavigate();
  const studentNo = sessionStorage.getItem("studentNo") || "2025108001";

  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null); // {name, studentNo, subjectName, totalScore, accountNo}
  const [banks, setBanks] = useState([]); // 공통코드 리스트
  const [selectedBank, setSelectedBank] = useState(""); // 화면 표시용
  const [accountNo, setAccountNo] = useState(""); // 입력/수정 가능

  // 좌측 사이드바 메뉴
  const navItems = useMemo(
    () => [
      "마일리지",
      { link: "/mileage", name: "나의 마일리지" },
      { link: "/mileage/apply", name: "마일리지 장학금 신청" },
      { link: "/mileage/status", name: "마일리지 장학금 신청 현황" },
    ],
    []
  );

  useEffect(() => {
    const bootstrap = async () => {
      try {
        setLoading(true);
        // 사용자 기본 정보
        const info = await getUserScholarshipInfo(studentNo);
        setUserInfo(info);
        setAccountNo(info.accountNo || "");

        // 은행 코드 로드
        const bankList = await getBankCodes();
        setBanks(bankList || []);
      } catch (e) {
        console.error("초기 데이터 로드 실패", e);
        alert("신청 화면 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, [studentNo]);

  const handleApply = async () => {
    if (!userInfo) return;

    // 1) 점수 체크
    if (userInfo.totalScore < 50) {
      alert("총 마일리지가 50점 미만이라 장학금 신청이 어렵습니다.");
      return;
    }

    // 2) 계좌 체크
    if (!accountNo.trim()) {
      alert("계좌번호를 입력해 주세요.");
      return;
    }

    try {
      await applyScholarship({
        studentNo: userInfo.studentNo,
        accountNo: accountNo.trim(),
      });
      alert("장학금 신청이 완료되었습니다.");
      navigate("/myPage/mileage/status"); // 현황 페이지로 이동
    } catch (e) {
      console.error("신청 실패", e);
      const msg =
        e?.response?.data?.message ||
        "신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      alert(msg);
    }
  };

  return (
    <div className="bg-white min-h-screen border border-gray-300">
      {/* 상단 */}
      <UserTopBar />
      <MainHeader />

      {/* 본문 레이아웃 */}
      <div className="w-full max-w-screen-xl mx-auto flex px-6 py-10 gap-8">
        {/* 좌측 사이드바 */}
        <div className="w-[260px] flex-shrink-0">
          <UserSideBar navItems={navItems} />
        </div>

        {/* 우측 본문 */}
        <div className="flex-1">
          <div className="text-2xl font-bold mb-6">
            마일리지 장학금 신청
          </div>

          {loading ? (
            <div className="py-20 text-gray-500">불러오는 중...</div>
          ) : !userInfo ? (
            <div className="py-20 text-red-500">데이터를 불러오지 못했습니다.</div>
          ) : (
            <div className="bg-white rounded shadow p-6">
              {/* 총 마일리지 박스 */}
              <div className="mb-6 text-lg">
                <span className="mr-2">🔵</span>
                <span className="font-semibold">
                  총 마일리지 : {userInfo.totalScore}점
                </span>
                <span className="ml-2 text-gray-500">(50점 이상 신청 가능)</span>
              </div>

              {/* 정보 폼 */}
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

                {/* 은행명 드롭다운 (표시용) */}
                <div>
                  <div className="text-gray-500 mb-1">은행명</div>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                  >
                    <option value="">은행 선택</option>
                    {banks.map((b) => {
                      const key = `${b?.id?.codeGroup}-${b?.id?.code}`;
                      const label = b?.codeNameKo || b?.codeName || b?.name || b?.id?.code;
                      return (
                        <option key={key} value={b?.id?.code}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* 계좌번호 입력 */}
                <div className="col-span-2">
                  <div className="text-gray-500 mb-1">계좌번호</div>
                  <input
                    className="w-full border rounded px-3 py-2"
                    placeholder="숫자만 입력"
                    value={accountNo}
                    onChange={(e) => setAccountNo(e.target.value)}
                  />
                  <div className="text-sm text-gray-400 mt-1">
                    * 계좌번호는 사용자 정보에 등록된 기본 계좌가 자동 입력됩니다.
                  </div>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserScholarshipApplyPage;
