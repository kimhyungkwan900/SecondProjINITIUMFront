import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../App";

export default function RequireAdmin() {
  const { user } = useContext(UserContext);
  if (!user || user.userType !== "A") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}