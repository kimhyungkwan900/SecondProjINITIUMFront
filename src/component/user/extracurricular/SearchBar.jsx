import { useState } from "react";


const SearchBar = ({onSearch}) => {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        onSearch(input);
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            handleSearch();
        }
    }
  return (
    <div className="mt-10 mb-20 flex items-center gap-4 justify-center w-full">
      <label className="text-lg font-semibold">프로그램 명 :</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-[20%] px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="프로그램명을 입력하세요"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        검색
      </button>
    </div>
  );
};
export default SearchBar;