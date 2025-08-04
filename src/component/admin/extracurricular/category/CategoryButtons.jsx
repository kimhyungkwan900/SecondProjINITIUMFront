const CategoryButtons = ({ onSearch, onInsert, onDelete, onUpdate}) => {

  return (
    <div className="mt-2 flex gap-3 justify-end w-full">
      <button
        onClick={onSearch}
        className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        조회
      </button>

      <button
        onClick={onInsert} // 저장 로직 연결
        className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        신규
      </button>

      <button
        onClick={onUpdate}
        className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        저장
      </button>

      <button
        onClick={onDelete}
        className="bg-gray-300 text-black hover:bg-gray-700 hover:text-white pt-1 pb-1 pl-2 pr-2 rounded"
      >
        삭제
      </button>
    </div>
  );
};
export default CategoryButtons;