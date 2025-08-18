const Filter = ({ filter, onFilterChange, onSearch }) => {
  return (
    // 부모에서 카드(adm-card)를 감싸고 있으므로 여기선 콘텐츠만 출력
    <div className="w-full">
      <div className="grid grid-cols-12 gap-3">
        
        {/* 타입 */}
        <label className="col-span-12 md:col-span-1 adm-label md:text-right pr-2 mb-2 md:mb-0 mt-2">
          타입
        </label>
        <div className="col-span-12 md:col-span-3 mb-3 md:mb-0">
          <select
            className="adm-control w-full"
            value={filter.eduType}
            onChange={(e) => onFilterChange("eduType", e.target.value)}
          >
            <option value="">전체</option>
            <option value="TEAM">팀</option>
            <option value="PERSONAL">개인</option>
          </select>
        </div>

        {/* 프로그램 명 */}
        <label className="col-span-12 md:col-span-2 adm-label md:text-right pr-2 mb-2 md:mb-0 mt-2">
          프로그램 명
        </label>
        <div className="col-span-12 md:col-span-4 mb-3 md:mb-0">
          <input
            type="text"
            className="adm-control w-full"
            value={filter.keyword}
            onChange={(e) => onFilterChange("keyword", e.target.value)}
            placeholder="검색어를 입력하세요"
          />
        </div>

        {/* 조회 버튼 */}
        <div className="col-span-12 md:col-span-2 flex md:justify-end">
          <button className="adm-btn adm-btn--primary w-full md:w-auto" onClick={onSearch}>
            조회
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
