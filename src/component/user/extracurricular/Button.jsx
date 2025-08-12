const Button = ({ selectedIds, onDelete }) => {
  return (
    <div className="flex justify-end mt-4 mr-6">
      <button
        className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={onDelete}
        disabled={selectedIds.size === 0}
      >
        삭제
      </button>
    </div>
  );
};

export default Button;