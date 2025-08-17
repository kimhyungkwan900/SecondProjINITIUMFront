import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IdleLogoutContext } from "./IdleLogoutContext.js";
import { useAuth } from "../../../hooks/useAuth.jsx";
import { logout } from "../../../api/user/auth/loginApi";

const AUTO_LOGOUT_TIME = 60 * 60 * 1000; // 1시간(ms)
// const AUTO_LOGOUT_TIME = 10 * 1000; // 테스트용

export default function IdleLogoutWatcher({ children}) {
  const timerRef = useRef(null);
  const tickRef = useRef(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [expiresAt, setExpiresAt] = useState(() => Date.now() + AUTO_LOGOUT_TIME);
  const [remainingMs, setRemainingMs] = useState(() => AUTO_LOGOUT_TIME);

  const handleLogout = useCallback(async () => {
    alert(`${Math.floor(AUTO_LOGOUT_TIME / 60000)}분 동안 입력이 없어 자동 로그아웃됩니다.`);
    try {
      await logout();
    } finally {
      setUser(null);
      navigate("/login");
    }
  }, [navigate, setUser]);

  // 수동 연장: 버튼으로만 호출됨
  const resetTimer = useCallback(() => {
    const next = Date.now() + AUTO_LOGOUT_TIME;
    setExpiresAt(next);
    setRemainingMs(next - Date.now());

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleLogout, AUTO_LOGOUT_TIME);
  }, [handleLogout]);

  // 타임아웃 1회 시작
  useEffect(() => {
    // 첫 진입 시 타이머만 시작 (사용자 활동으로는 리셋하지 않음)
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleLogout, AUTO_LOGOUT_TIME);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [handleLogout]);

  // 1초마다 남은시간 갱신
  useEffect(() => {
    if (tickRef.current) clearInterval(tickRef.current);
    tickRef.current = setInterval(() => {
      setRemainingMs(Math.max(0, expiresAt - Date.now()));
    }, 1000);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [expiresAt]);

  const value = useMemo(() => ({
    remainingMs,
    resetTimer,
    timeoutMs: AUTO_LOGOUT_TIME,
    expiresAt,
  }), [remainingMs, resetTimer, expiresAt]);

  return (
    <IdleLogoutContext.Provider value={value}>
      {children}
    </IdleLogoutContext.Provider>
  );
}