const AplicationButton = ({ onDelete, onInsert }) => {
  return (
    <div className="mt-3 flex gap-3 justify-center w-full">
      <button
        onClick={onInsert}
        className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        저장
      </button>

      <button
        onClick={onDelete}
        className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        취소
      </button>
    </div>
  );
};
export default AplicationButton;