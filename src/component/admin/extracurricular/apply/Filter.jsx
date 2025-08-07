const Filter = ({ filter, onFilterChange, onSearch }) => {
  return (
    <div className="bg-gray-200 w-full mt-4 rounded p-4 flex justify-between">
      <div className="flex justify-center text-xl gap-20 px-5">
        {/* 타입 필터 */}
        <div>
          <span>타입 </span>
          <select
            className="focus:outline-none rounded w-60 py-1"
            value={filter.eduType}
            onChange={(e) => onFilterChange("eduType", e.target.value)}
          >
            <option value={""}>전체</option>
            <option value={"TEAM"}>팀</option>
            <option value={"PERSONAL"}>개인</option>
          </select>
        </div>

        {/* 프로그램명 검색 */}
        <div className="flex items-center">
          <span>프로그램 명</span>
          <input
            type="text"
            className="ml-3 px-4 py-1 w-80 rounded-md text-lg focus:outline-none"
            value={filter.keyword}
            onChange={(e) => onFilterChange("keyword", e.target.value)}
          />
        </div>
      </div>

      {/* 조회 버튼 */}
      <div>
        <button
          className="px-5 py-2 items-center bg-slate-100 rounded hover:bg-slate-600 hover:text-white font-bold"
          onClick={onSearch}
        >
          조회
        </button>
      </div>
    </div>
  );
};

export default Filter;