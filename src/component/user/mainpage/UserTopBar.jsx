import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LinkedButton from "../../common/LinkedButton";
import { UserContext } from "../../../App";
import { logout } from "../../../api/user/auth/loginApi";

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
  let myPageLink = null;
  let showAdminPage = false;
  if (user) {
    if (user.userType === "S") {
      myPageLink = <LinkedButton to="/mypage">마이페이지</LinkedButton>;
    } else if (user.userType === "E" || user.userType === "A") {
      myPageLink = <LinkedButton to="/employee/mypage">마이페이지</LinkedButton>;
      if (user.userType === "A") {
        showAdminPage = true;
      }
    }
  }

  return (
    <div className="w-full flex justify-end items-center gap-1 px-24 py-2 bg-white text-sm border-b border-gray-100">
      {user ? (
        <>
          <span className="text-gray-600 font-bold">{user.name}님</span>
          {myPageLink}
          {showAdminPage && (
            <LinkedButton to="/admin">관리자페이지 이동</LinkedButton>
          )}
          <button onClick={handleLogout} className="px-3 py-1 rounded text-sm font-semibold transition no-underline bg-transparent text-[#222E8D] hover:text-[#28B8B2]">
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