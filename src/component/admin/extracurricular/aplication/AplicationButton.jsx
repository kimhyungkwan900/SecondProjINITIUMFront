const AplicationButton = ({ onDelete, onInsert }) => {
  return (
    <div className="mt-3 flex gap-3 justify-center w-full">
      <button
        onClick={onInsert}
        className="adm-btn adm-btn--primary"
      >
        저장
      </button>

      <button
        onClick={onDelete}
        className="adm-btn adm-btn--secondary"
      >
        취소
      </button>
    </div>
  );
};
export default AplicationButton;