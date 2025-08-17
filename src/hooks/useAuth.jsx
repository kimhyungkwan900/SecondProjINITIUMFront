import { createContext, useEffect, useState, useContext, useMemo } from "react";
import { getCurrentUser } from "../api/user/auth/loginApi";

export const UserContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const userData = await getCurrentUser();
        if (!mounted) return;
        
        // 계정 상태가 T(임시)인 경우 비밀번호 변경 페이지로 리다이렉트
        if (userData && userData.accountStatusCode === 'T' && 
            !window.location.pathname.includes('/update-info')) {
          if (userData.userType === 'S') {
            window.location.href = '/mypage/update-info';
            return; // 리다이렉트 후 나머지 로직 실행 방지
          } else if (userData.userType === 'E' || userData.userType === 'A') {
            window.location.href = '/mypage/employee/update-info';
            return; // 리다이렉트 후 나머지 로직 실행 방지
          }
        }
        
        setUser(userData || null);
      } catch (error) {
        if (!mounted) return;
        console.error("인증 초기화 실패:", error);
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initialize();
    return () => {
      mounted = false;
    };
  }, []);

  // 선택: 전역에서 강제 로그아웃 트리거가 필요하면 커스텀 이벤트를 들을 수도 있음
  // window.addEventListener("auth:logout", () => setUser(null));

  const value = useMemo(() => ({ user, setUser, loading }), [user, loading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};