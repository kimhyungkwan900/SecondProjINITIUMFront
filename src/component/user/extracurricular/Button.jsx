const Button = ({ selectedIds, onDelete }) => {
  return (
    <button
      className="py-2 px-4 rounded-md bg-[#354649] text-white font-semibold text-sm hover:bg-[#6C7A89] transition-colors disabled:opacity-50"
      onClick={onDelete}
      disabled={selectedIds.size === 0}
    >
      삭제
    </button>
  );
};

export default Button;