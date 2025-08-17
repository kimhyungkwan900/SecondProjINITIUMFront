const RequestButton = ({ onSearch, onChangeStatus, programStatus }) => {
  // 상태별 버튼 활성화 규칙
  const approveDisabled =
    !(programStatus === "REQUESTED" || programStatus === "REJECTED");
  const rejectDisabled =
    !(programStatus === "REQUESTED" || programStatus === "REJECTED" || programStatus === "APPROVED");

  const handleStatusChange = (status) => onChangeStatus?.(status);

  return (
    <div className="flex items-center justify-end px-4 py-2">
      <button
        type="button"
        onClick={() => onSearch?.()}
        className="adm-btn adm-btn--secondary"
      >
        조회
      </button>

      <button
        type="button"
        onClick={() => handleStatusChange("REJECTED")}
        disabled={rejectDisabled}
        title={rejectDisabled ? "요청/반려/승인 상태에서만 반려할 수 있습니다." : undefined}
        className="adm-btn adm-btn--dangerOutline ml-2 disabled:opacity-50 disabled:pointer-events-none"
      >
        반려
      </button>

      <button
        type="button"
        onClick={() => handleStatusChange("APPROVED")}
        disabled={approveDisabled}
        title={approveDisabled ? "요청/반려 상태에서만 승인할 수 있습니다." : undefined}
        className="adm-btn adm-btn--primary ml-2 disabled:opacity-50 disabled:pointer-events-none"
      >
        승인
      </button>
    </div>
  );
};

export default RequestButton;
