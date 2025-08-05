import Modal from "react-modal";
import { useState } from "react";
import FindIdTab from "../../../component/common/auth/FindIdTab";
import FindPasswordTab from "../../../component/common/auth/FindPasswordTab";

export default function FindAccountModal({ isOpen, onRequestClose }) {
    const [tab, setTab] = useState("id");

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}
            className="bg-white rounded-lg p-4 w-[420px] max-w-full shadow-xl outline-none"
            overlayClassName="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="flex border-b mb-4">
                <button className={`flex-1 py-2 font-semibold border-b-2 ${tab === "id" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"}`} onClick={() => setTab("id")}>
                    아이디 찾기
                </button>
                <button className={`flex-1 py-2 font-semibold border-b-2 ${tab === "pw" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"}`} onClick={() => setTab("pw")}>
                    비밀번호 찾기
                </button>
            </div>
            {tab === "id" ? <FindIdTab /> : <FindPasswordTab />}
            <button className="mt-4 w-full border py-2 rounded" onClick={onRequestClose}>닫기</button>
        </Modal>
    );
}