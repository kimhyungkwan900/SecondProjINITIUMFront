import { createContext, useEffect, useState, useContext, useMemo } from "react";
import { getCurrentUser } from "../api/user/auth/loginApi";

export const UserContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("인증 실패:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []);

  // 1. 성능 최적화를 위해 useMemo 사용
  // user나 loading 상태가 변경될 때만 value 객체를 새로 생성합니다.
  const value = useMemo(
    () => ({ user, setUser, loading }),
    [user, loading]
  );

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);

  // 2. 안정성 강화를 위해 context 존재 여부 확인
  // Provider 외부에서 훅을 사용하면 명확한 에러를 발생시킵니다.
  if (context === null) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};