import { useState, useEffect } from "react";

const RequestApprovedModal = ({ programName, programEndDate, onSave, onClose }) => {
  const [eduMlg, setEduMlg] = useState("");
  const [srvyTtl, setSrvyTtl] = useState("");
  const [srvyQitemCn, setSrvyQitemCn] = useState("");
  const [srvyBgngDt, setSrvyBgngDt] = useState(""); // 설문 시작일 (프로그램 종료일로 고정)
  const [srvyEndDt, setSrvyEndDt] = useState("");

  // 프로그램 종료일이 props로 들어오면 설문 시작일로 자동 설정
  useEffect(() => {
    if (programEndDate) {
      setSrvyBgngDt(programEndDate);
    }
  }, [programEndDate]);

  const handleSave = () => {
    if (eduMlg === "") {
      alert("마일리지를 입력해주세요.");
      return;
    }
    if (!srvyTtl.trim()) {
      alert("설문 제목을 입력해주세요.");
      return;
    }
    if (!srvyQitemCn.trim()) {
      alert("설문 내용을 입력해주세요.");
      return;
    }
    if (!srvyEndDt) {
      alert("설문 종료일을 선택해주세요.");
      return;
    }
    if (srvyEndDt < srvyBgngDt) {
      alert("설문 종료일은 시작일 이후여야 합니다.");
      return;
    }

    const surveyData = {
      eduMlg,
      srvyTtl,
      srvyQitemCn,
      srvyBgngDt,
      srvyEndDt,
    };

    onSave(surveyData);
  };

  return (
    <div className="fixed inset-0 bg-gray-400 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4 text-center">{programName} 승인</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">마일리지</label>
          <input
            type="number"
            value={eduMlg}
            onChange={(e) => setEduMlg(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="마일리지를 입력하세요"
            min="0"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">설문 제목</label>
          <input
            type="text"
            value={srvyTtl}
            onChange={(e) => setSrvyTtl(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="설문 제목을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">설문 내용</label>
          <textarea
            value={srvyQitemCn}
            onChange={(e) => setSrvyQitemCn(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="설문 내용을 입력하세요"
            rows={4}
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">설문 시작일</label>
            <input
              type="date"
              value={srvyBgngDt}
              disabled
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">설문 종료일</label>
            <input
              type="date"
              value={srvyEndDt}
              onChange={(e) => setSrvyEndDt(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={srvyBgngDt}
            />
          </div>
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