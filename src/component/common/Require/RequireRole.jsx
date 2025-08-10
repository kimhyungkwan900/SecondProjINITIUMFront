import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../../App";

export default function RequireRole({ allow = [] }) {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`} replace />;
  }
  if (!allow.includes(user.userType)) {
    return <Navigate to="/403" replace />;
  }
  return <Outlet />;
}