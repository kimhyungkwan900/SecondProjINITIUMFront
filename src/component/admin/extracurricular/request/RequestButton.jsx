


const RequestButton = ({ onSearch, onChangeStatus }) => {
  return (
    <div className="mt-3 flex gap-3 justify-end w-full">
      <button
        onClick={onSearch}
        className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        조회
      </button>

      <button
        onClick={() => onChangeStatus("REJECTED")}
        className="bg-red-300 text-black hover:bg-red-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        반려
      </button>

      <button
        onClick={() => onChangeStatus("APPROVED")}
        className="bg-green-300 text-black hover:bg-green-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        승인
      </button>
    </div>
  );
};

export default RequestButton;