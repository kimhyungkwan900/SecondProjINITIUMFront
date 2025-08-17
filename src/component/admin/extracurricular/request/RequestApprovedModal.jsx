import { useEffect, useState } from "react";

const RequestApprovedModal = ({ programName, programEndDate, onSave, onClose }) => {
  const [eduMlg, setEduMlg] = useState("");
  const [srvyTtl, setSrvyTtl] = useState("");
  const [srvyQitemCn, setSrvyQitemCn] = useState("");
  const [srvyBgngDt, setSrvyBgngDt] = useState(""); // 설문 시작일(프로그램 종료일 고정)
  const [srvyEndDt, setSrvyEndDt] = useState("");

  // 프로그램 종료일 → 설문 시작일 자동 세팅
  useEffect(() => {
    if (programEndDate) setSrvyBgngDt(programEndDate);
  }, [programEndDate]);

  const handleSave = () => {
    if (eduMlg === "") return alert("마일리지를 입력해주세요.");
    if (!srvyTtl.trim()) return alert("설문 제목을 입력해주세요.");
    if (!srvyQitemCn.trim()) return alert("설문 내용을 입력해주세요.");
    if (!srvyEndDt) return alert("설문 종료일을 선택해주세요.");
    if (srvyEndDt < srvyBgngDt) return alert("설문 종료일은 시작일 이후여야 합니다.");

    onSave({ eduMlg, srvyTtl, srvyQitemCn, srvyBgngDt, srvyEndDt });
  };

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="approve-modal-title"
    >
      <div className="adm-card w-full max-w-lg p-6 shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-2xl text-[#354649] select-none">|</span>
            <h2 id="approve-modal-title" className="ml-2 text-xl font-semibold text-[#354649]">
              승인 설정 — {programName || "-"}
            </h2>
          </div>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="adm-btn adm-btn--secondary h-8 px-3"
          >
            닫기
          </button>
        </div>

        <hr className="border-gray-200 mb-4" />

        {/* 폼 */}
        <div className="space-y-4">
          <div>
            <label className="adm-label">마일리지</label>
            <input
              type="number"
              min="0"
              step="1"
              value={eduMlg}
              onChange={(e) => setEduMlg(e.target.value)}
              className="adm-control w-full"
              placeholder="마일리지를 입력하세요"
            />
          </div>

          <div>
            <label className="adm-label">설문 제목</label>
            <input
              type="text"
              value={srvyTtl}
              onChange={(e) => setSrvyTtl(e.target.value)}
              className="adm-control w-full"
              placeholder="설문 제목을 입력하세요"
            />
          </div>

          <div>
            <label className="adm-label">설문 내용</label>
            <textarea
              rows={4}
              value={srvyQitemCn}
              onChange={(e) => setSrvyQitemCn(e.target.value)}
              className="adm-control w-full"
              placeholder="설문 내용을 입력하세요"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="adm-label">설문 시작일</label>
              <input
                type="date"
                value={srvyBgngDt}
                disabled
                className="adm-control w-full bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="adm-label">설문 종료일</label>
              <input
                type="date"
                value={srvyEndDt}
                min={srvyBgngDt || undefined}
                onChange={(e) => setSrvyEndDt(e.target.value)}
                className="adm-control w-full"
              />
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="adm-btn adm-btn--secondary">
            취소
          </button>
          <button type="button" onClick={handleSave} className="adm-btn adm-btn--primary">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestApprovedModal;
