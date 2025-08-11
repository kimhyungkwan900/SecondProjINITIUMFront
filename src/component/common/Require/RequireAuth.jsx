import { useContext } from "react";
import { UserContext } from "../../../App";
import { useLocation } from "react-router-dom";

export default function RequireAuth() {
  const { user } = useContext(UserContext);
  const loc = useLocation();
  if (!user) {
    return <Navigate to={`/login?redirectTo=${encodeURIComponent(loc.pathname)}`} replace />;
  }
  return <Outlet />;
}