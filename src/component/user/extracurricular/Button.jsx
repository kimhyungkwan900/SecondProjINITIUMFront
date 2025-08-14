const Button = ({ selectedIds, onDelete }) => {
  return (
    <div className="flex justify-end mt-4 mr-6">
      <button
        className="px-4 py-1 bg-[#354649] text-white rounded-md hover:bg-[#6C7A89]"
        onClick={onDelete}
        disabled={selectedIds.size === 0}
      >
        삭제
      </button>
    </div>
  );
};

export default Button;