import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/user/auth/logoutApi";
import { UserContext } from "../../App";

const AUTO_LOGOUT_TIME = 60 * 60 * 1000; // 1시간(ms)

export default function IdleLogoutWatcher({ children }) {
  const timerRef = useRef();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // 자동 로그아웃 처리
  const handleLogout = async () => {
    alert("1시간 동안 입력이 없어 자동 로그아웃됩니다.");
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
    resetTimer(); // 첫 시작 타이머

    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, []);

  return children;
}