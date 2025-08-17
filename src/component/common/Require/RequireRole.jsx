import { useAuth } from "../../../hooks/useAuth.jsx";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireRole({ allow = [] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 로딩 중에는 리다이렉트 금지 (refresh/재발급 대기)
  if (loading) {
    return <div className="py-10 text-center text-sm text-gray-500">접근 권한 확인 중…</div>;
    // 또는: return null;
  }

  if (!user) {
    const redirectTo = encodeURIComponent(`${location.pathname}${location.search}${location.hash}`);
    return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
  }

  // userType 대소문자/공백 방어
  const userType = String(user.userType || "").trim().toUpperCase();
  const allowSet = new Set(allow.map((r) => String(r).trim().toUpperCase()));

  if (allowSet.size > 0 && !allowSet.has(userType)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
