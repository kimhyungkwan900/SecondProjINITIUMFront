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
    if (user && (user.passwordChangeRequired || user.RequiredPasswordChange === 'Y' || user.RequiredPasswordChange === true)) {
      
      // 개발용: 세션마다 확인 (브라우저 닫으면 초기화)
      const deferTimestamp = sessionStorage.getItem('passwordChangePopupDefer');

      // 운영용: 3개월간 보지 않기
      // const deferTimestamp = localStorage.getItem('passwordChangePopupDefer');

      const now = new Date().getTime();

      if (!deferTimestamp || now > parseInt(deferTimestamp)) {
        setShowModal(true);
      }
    }
  }, [user]);

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

    setShowModal(false);
  };

  const handleDeferChange = () => {
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    const expiry = threeMonthsLater.getTime().toString();

    // 개발용: 세션마다 확인
    sessionStorage.setItem('passwordChangePopupDefer', expiry);

    // 운영용: 3개월간 보지 않기
    // localStorage.setItem('passwordChangePopupDefer', expiry);

    setShowModal(false);
  };

  return (
    <>
      <PasswordChangeModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmChange}
        handleDefer={handleDeferChange}
      />

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