import React from "react";


const Filter = ({ filter, onFilterChange, onSearch }) => {
  return (
    <div className="bg-gray-200 w-full mt-4 rounded p-4 flex items-center gap-6">
      <div>
        <label className="mr-2 font-semibold">수료 상태</label>
        <select
          className="rounded border border-gray-400 px-3 py-1"
          value={filter.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <option value="">전체</option>
          <option value="Y">수료</option>
          <option value="N">미수료</option>
        </select>
      </div>

      <div>
        <label className="mr-2 font-semibold">프로그램 이름</label>
        <input
          type="text"
          className="rounded border border-gray-400 px-3 py-1"
          value={filter.keyword}
          onChange={(e) => onFilterChange("keyword", e.target.value)}
          placeholder="프로그램 이름 입력"
        />
      </div>

      <button
        className="ml-auto bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        onClick={onSearch}
      >
        조회
      </button>
    </div>
  );
};

export default Filter;