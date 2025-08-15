import { useEffect, useState } from "react";
import UserTopBar from "../component/user/mainpage/UserTopBar";
import MainHeader from "../features/user/mainpage/MainHeader";
import ProgramCategorySliderSection from "../features/user/programs/ProgramCategorySliderSection";
import { useNavigate } from "react-router-dom";
import PasswordChangeModal from "../modal/auth/PasswordChangeModal";
import { useAuth } from "../hooks/useAuth.jsx";

export default function MainPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 사용자 정보가 있고, 비밀번호 변경이 필요한 경우
    if (user && user.passwordChangeRequired) {
      // localStorage에서 '나중에 보기'를 선택했는지 확인
      const deferTimestamp = localStorage.getItem('passwordChangePopupDefer');
      const now = new Date().getTime();

      // 3. 저장된 시간이 없거나, 이미 만료되었다면 모달을 띄움
      if (!deferTimestamp || now > parseInt(deferTimestamp)) {
        setShowModal(true);
      }
    }
  }, [user]); // user 정보가 변경될 때마다 실행

  // "지금 변경" 버튼 클릭 시
  const handleConfirmChange = () => {
    if (user && user.userType) {
      const userType = user.userType;

      if (userType === 'S') {
        navigate('/mypage/update-info');
      } else if (userType === 'E' || userType === 'A') {
        navigate('/mypage/employee/update-info');
      } else {
        console.error("알 수 없는 사용자 유형입니다:", userType);
        navigate('/');
      }
    } else {
      console.error("사용자 정보를 찾을 수 없습니다.");
      navigate('/login');
    }

    setShowModal(false); // 모달은 항상 닫습니다.
  };

  // "3개월 후 다시 알림" 버튼 클릭 시
  const handleDeferChange = () => {
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    localStorage.setItem('passwordChangePopupDefer', threeMonthsLater.getTime().toString());
    setShowModal(false);
  };

  return (
    <>
      {/* 모달 컴포넌트 */}
      <PasswordChangeModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmChange}
        handleDefer={handleDeferChange}
      />

      {/* 기존 페이지 UI */}
      <div className="min-h-screen bg-[#f6f9fc] flex flex-col items-center">
        <UserTopBar />
        <MainHeader />
        <main className="w-full max-w-5xl px-4">
          <section className="my-12">
            <h2 className="text-xl font-bold mb-4 text-gray-800">추천 비교과 프로그램</h2>
            <ProgramCategorySliderSection />
          </section>
        </main>
      </div>
    </>
  );
}