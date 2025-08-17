import { useAuth } from "../../../hooks/useAuth.jsx";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const { user, loading } = useAuth();
  const loc = useLocation();

  // 아직 인증 상태 동기화 중이면 리다이렉트 금지
  if (loading) {
    return <div className="py-10 text-center text-sm text-gray-500">로그인 상태 확인 중…</div>;
    // 또는: return null;  // 화면 깜빡임 최소화 원하면
  }

  if (!user) {
    const redirectTo = encodeURIComponent(`${loc.pathname}${loc.search}${loc.hash}`);
    return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
  }

  return <Outlet />;
}