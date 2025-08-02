import { useContext } from "react";
import LinkedButton from "../../common/LinkedButton";
import { UserContext } from "../../../App";

export default function UserTopBar() {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full flex justify-end items-center gap-1 px-24 py-2 bg-white text-sm border-b border-gray-100">
      {user ? (
        <>
          <span className="text-gray-600 font-bold">{user.name}님</span>
          <LinkedButton to="/mypage">마이페이지</LinkedButton>
          <LinkedButton to="/logout">로그아웃</LinkedButton>
        </>
      ) : (
        <>
          <LinkedButton to="/login">로그인</LinkedButton>
        </>
      )}
    </div>
  );
}