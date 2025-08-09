import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { logout } from "../../api/user/auth/loginApi";

const AUTO_LOGOUT_TIME = 60 * 60 * 1000; // 1시간(ms)
// const AUTO_LOGOUT_TIME = 10 * 1000 //10초
export default function IdleLogoutWatcher({ children }) {
  const timerRef = useRef();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // 자동 로그아웃 처리
  const handleLogout = async () => {
    alert(`${AUTO_LOGOUT_TIME} 동안 입력이 없어 자동 로그아웃됩니다.`);
    await logout();
    setUser(null);
    navigate("/login");
  };

  // 타이머 리셋
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleLogout, AUTO_LOGOUT_TIME);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];
    events.forEach(e => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, []);

  return children;
}