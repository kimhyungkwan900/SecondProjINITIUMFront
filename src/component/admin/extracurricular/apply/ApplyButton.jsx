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
      <button onClick={handleApprove} className="border px-2 py-1 rounded bg-green-300 text-white font-bold hover:bg-green-600">승인</button>
      <button onClick={handleReject} className="border px-2 py-1 rounded bg-red-300 text-white font-bold hover:bg-red-600">반려</button>
      <button onClick={handleRefresh} className="border px-2 py-1 rounded bg-gray-300 text-white font-bold hover:bg-gray-600">조회</button>
    </div>
  );
};
export default ApplyButton;