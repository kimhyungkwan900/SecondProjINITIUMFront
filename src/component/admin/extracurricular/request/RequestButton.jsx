const RequestButton = ({ onSearch, onChangeStatus, programStatus }) => {
  const canApprove = programStatus === "REQUESTED" || programStatus === "REJECTED";
  const canReject = programStatus === "REQUESTED" || programStatus === "REJECTED" || programStatus === "APPROVED";

  const handleStatusChange = (status) => {
    if (status === "APPROVED" && !canApprove) {
      alert("요청 또는 반려 상태일 때만 승인할 수 있습니다.");
      return;
    }
    if (status === "REJECTED" && !canReject) {
      alert("요청, 반려, 승인 상태일 때만 반려할 수 있습니다.");
      return;
    }

    onChangeStatus?.(status);
  };

  return (
    <div className="mt-3 flex gap-3 justify-end w-full">
      <button
        onClick={() => {
          console.log("조회 클릭됨");
          onSearch?.();
        }}
        className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        조회
      </button>

      <button
        onClick={() => {
          console.log("반려 클릭됨");
          handleStatusChange("REJECTED");
        }}
        className="bg-red-300 text-black hover:bg-red-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        반려
      </button>

      <button
        onClick={() => {
          console.log("승인 클릭됨");
          handleStatusChange("APPROVED");
        }}
        className="bg-green-300 text-black hover:bg-green-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        승인
      </button>
    </div>
  );
};

export default RequestButton;