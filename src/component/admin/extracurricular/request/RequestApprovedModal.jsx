import { useState } from "react";

const RequestApprovedModal = ({ programName, onSave, onClose }) => {
  const [eduMlg, setEduMlg] = useState("");

  const handleSave = () => {
    if (eduMlg === "") {
      alert("마일리지를 입력해주세요.");
      return;
    }
    onSave(eduMlg); // 부모 컴포넌트에서 저장 처리
  };

  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          {programName} 승인
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            마일리지
          </label>
          <input
            type="number"
            value={eduMlg}
            onChange={(e) => setEduMlg(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="마일리지를 입력하세요"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestApprovedModal;
