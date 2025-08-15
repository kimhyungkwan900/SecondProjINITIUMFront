import { useNavigate } from "react-router-dom";
import LinkedButton from "../../common/LinkedButton";
import { logout } from "../../../api/user/auth/loginApi";
import { useAuth } from "../../../hooks/useAuth.jsx";

export default function UserTopBar() {
  const { user, setUser } = useAuth();
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

  const linkStyle = "px-3 py-1 rounded text-sm font-semibold transition no-underline bg-transparent text-[#354649] hover:text-[#6C7A89]";

  let myPageLink = null;
  let showAdminPage = false;

  if (user) {
    if (user.userType === "S") {
      myPageLink = <LinkedButton to="/mypage" className={linkStyle}>마이페이지</LinkedButton>;
    } else if (user.userType === "E" || user.userType === "A") {
      myPageLink = <LinkedButton to="/mypage/employee" className={linkStyle}>마이페이지</LinkedButton>;
      if (user.userType === "A") {
        showAdminPage = true;
      }
    }
  }

  return (
    <div className="w-full flex justify-end items-center gap-1 px-24 py-2 bg-white text-sm ">
      {user ? (
        <>
          <span className="text-[#354649] font-bold mr-2">{user.name}님</span>
          {myPageLink}
          {showAdminPage && (
            <LinkedButton to="/admin" className={linkStyle}>관리자페이지 이동</LinkedButton>
          )}
          <button onClick={handleLogout} className={linkStyle}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <LinkedButton to="/login" className={linkStyle}>로그인</LinkedButton>
        </>
      )}
    </div>
  );
}
