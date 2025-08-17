import { useEffect, useRef, useState } from "react";

const CategoryButtons = ({ onSearch, onInsert, onDelete, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const ActionButtons = () => (
    <>
      <button onClick={onSearch} className="adm-btn adm-btn--secondary min-w-[72px]">
        조회
      </button>
      <button onClick={onInsert} className="adm-btn adm-btn--secondary min-w-[72px]">
        신규
      </button>
      <button onClick={onUpdate} className="adm-btn adm-btn--secondary min-w-[72px]">
        저장
      </button>
      <button onClick={onDelete} className="adm-btn adm-btn--dangerOutline min-w-[72px]">
        삭제
      </button>
    </>
  );

  return (
    <div className="w-full relative z-10">
      {/* 데스크톱: 버튼 나열 */}
      <div className="hidden sm:flex justify-end items-center gap-2">
        <ActionButtons />
      </div>

      {/* 모바일: 드롭다운 트리(펼침) */}
      <div className="sm:hidden flex justify-end items-center" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="adm-btn adm-btn--primary"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          작업
        </button>
        {open && (
          <div
            role="menu"
            className="absolute right-0 top-[44px] w-44 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
          >
            <button
              role="menuitem"
              onClick={() => {
                onSearch?.();
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
            >
              ▸ 조회
            </button>
            <div className="border-t border-gray-100" />
            <button
              role="menuitem"
              onClick={() => {
                onInsert?.();
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
            >
              ▸ 신규
            </button>
            <button
              role="menuitem"
              onClick={() => {
                onUpdate?.();
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
            >
              └ 저장
            </button>
            <div className="border-t border-gray-100" />
            <button
              role="menuitem"
              onClick={() => {
                onDelete?.();
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              ✕ 삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryButtons;
