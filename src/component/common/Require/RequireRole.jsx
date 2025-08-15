import { useAuth } from "../../../hooks/useAuth.jsx";
import { Navigate, Outlet, useLocation } from "react-router-dom";


export default function RequireRole({ allow = [] }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`} replace />;
  }
  if (!allow.includes(user.userType)) {
    return <Navigate to="/403" replace />;
  }
  return <Outlet />;
}