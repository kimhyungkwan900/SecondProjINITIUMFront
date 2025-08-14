import { useAuth } from "../../../hooks/useAuth.jsx";
import { Navigate, Outlet, useLocation } from "react-router-dom";


export default function RequireAuth() {
  const { user } = useAuth();
  const loc = useLocation();
  if (!user) {
    return <Navigate to={`/login?redirectTo=${encodeURIComponent(loc.pathname)}`} replace />;
  }
  return <Outlet />;
}