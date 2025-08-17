const ApplyButton = ({ selectedApplyIds, onUpdateStatus, onRefresh }) => {
  const handleApprove = async () => {
    if (selectedApplyIds.length === 0) {
      alert("선택된 신청자가 없습니다.");
      return;
    }
    try {
      await onUpdateStatus(selectedApplyIds, "ACCEPT");
      onRefresh(); // 상태 변경 후 리스트 새로고침
    } catch (error) {
      alert("승인 처리 중 오류가 발생했습니다." + error);
    }
  };

  const handleReject = async () => {
    if (selectedApplyIds.length === 0) {
      alert("선택된 신청자가 없습니다.");
      return;
    }
    try {
      await onUpdateStatus(selectedApplyIds, "REJECT");
      onRefresh(); // 상태 변경 후 리스트 새로고침
    } catch (error) {
      alert("반려 처리 중 오류가 발생했습니다." + error);
    }
  };

  const handleRefresh = () => {
    onRefresh();
  };

  return (
    <div className="mt-3 flex gap-3 justify-end w-full">
      <button onClick={handleApprove} className="adm-btn adm-btn--primary">승인</button>
      <button onClick={handleReject} className="adm-btn adm-btn--dangerOutline">반려</button>
      <button onClick={handleRefresh} className="adm-btn adm-btn--secondary">조회</button>
    </div>
  );
};
export default ApplyButton;