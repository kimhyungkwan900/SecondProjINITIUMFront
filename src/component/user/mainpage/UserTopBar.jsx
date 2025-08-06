import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LinkedButton from "../../common/LinkedButton";
import { UserContext } from "../../../App";
import { logout } from "../../../api/user/auth/logoutApi";

export default function UserTopBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="w-full flex justify-end items-center gap-1 px-24 py-2 bg-white text-sm border-b border-gray-100">
      {user ? (
        <>
          <span className="text-gray-600 font-bold">{user.name}님</span>
          <LinkedButton to="/mypage">마이페이지</LinkedButton>
          <button onClick={handleLogout} className="text-gray-600">
            로그아웃
          </button>
        </>
      ) : (
        <>
          <LinkedButton to="/login">로그인</LinkedButton>
        </>
      )}
    </div>
  );
}