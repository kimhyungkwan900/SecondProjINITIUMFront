import { useState } from "react";
import TextInput from "../../common/TextInput.jsx";


export default function AdminSidebarSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    onSearch && onSearch(v);
  };

  const clear = () => {
    setQuery("");
    onSearch && onSearch("");
  };

  return (
    <div className="px-3 mb-3">
      <div className="relative">
        <TextInput
          type="text"
          placeholder="검색어를 입력하세요"
          value={query}
          onChange={handleChange}
          aria-label="사이드바 메뉴 검색"
          className="w-full rounded-md border border-blue-200 px-3 py-2 pr-9 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm md:text-base"
        />
        {query && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded hover:bg-gray-100 flex items-center justify-center"
            aria-label="검색어 지우기"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}