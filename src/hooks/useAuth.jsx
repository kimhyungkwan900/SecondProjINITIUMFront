import { createContext, useEffect, useState, useContext, useMemo } from "react";
import { getCurrentUser } from "../api/user/auth/loginApi";

export const UserContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  // 로그인 사용자 상태 (없으면 null)
  const [user, setUser] = useState(null);
  // 최초 마운트 시 현재 사용자 조회 중인지 나타내는 로딩 플래그
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 마운트 시 1회 현재 사용자 조회
    const initialize = async () => {
      try {
        // 서버/스토리지에 존재하는 세션/토큰을 바탕으로 현재 사용자 정보 요청
        const userData = await getCurrentUser();
        setUser(userData); // 성공 시 사용자 상태 반영
      } catch (error) {
        // 인증 실패(401/토큰만료 등) 시 user를 명시적으로 null로 설정
        console.error("인증 실패:", error);
        setUser(null);
      } finally {
        // 성공/실패와 관계없이 로딩 종료
        setLoading(false);
      }
    };
    initialize();
    // []: 컴포넌트 최초 마운트 시에만 실행 (의존성 없음)
  }, []);

  //  Context로 내려줄 value 객체 메모이제이션.
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
// 하위 컴포넌트에서 인증 컨텍스트를 편리하게 쓰기 위한 커스텀 훅.
// provider 외부 호출시 Error 출력
export const useAuth = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};