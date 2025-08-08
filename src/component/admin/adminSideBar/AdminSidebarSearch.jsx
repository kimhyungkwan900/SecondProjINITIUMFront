import { useState } from "react";
import TextInput from "../../common/TextInput.jsx";

export default function AdminSidebarSearch({ onSearch }) {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch && onSearch(e.target.value);
  };

  return (
    <div className="px-3 mb-4">
      <TextInput
        type="text"
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={handleChange}
        className="w-full rounded-md border border-blue-200 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );
}