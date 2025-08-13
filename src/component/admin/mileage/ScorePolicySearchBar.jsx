// src/components/admin/mileage/ScorePolicySearchBar.jsx
import React, { useState } from "react";

const ScorePolicySearchBar = ({ value, onChange, onSearch }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <input
        type="text"
        placeholder="비교과명 검색"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border px-4 py-2 rounded w-64"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        검색
      </button>
    </form>
  );
};

export default ScorePolicySearchBar;
