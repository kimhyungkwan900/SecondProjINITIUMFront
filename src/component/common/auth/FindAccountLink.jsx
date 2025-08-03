import { useState } from "react";
import FindAccountModal from "../../../features/user/auth/FindAccountModal";

export default function FindAccountLink() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="underline text-blue-600 hover:text-blue-800"
        onClick={() => setShowModal(true)}
        type="button"
      >
        아이디/비밀번호 찾기
      </button>
      <FindAccountModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      />
    </>
  );
}