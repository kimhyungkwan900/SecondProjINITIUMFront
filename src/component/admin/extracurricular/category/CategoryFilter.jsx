

const CategoryFilter = () => {
  return (
    <div className="bg-gray-200 w-full mt-4 rounded p-5">
      <div className="flex justify-between text-xl px-5">
        <div className="flex items-center">
          <span>프로그램 분류 명</span>
          <input
            type="text"
            className="ml-3 px-4 py-1 w-60 rounded-md text-lg focus:outline-none"
          />
        </div>

        <div className="flex items-center">
          <span>핵심역량</span>
          <select className="ml-3 px-4 py-1 w-60 rounded-md text-lg focus:outline-none">
            <option>전체</option>
            <option>핵심역량1</option>
            <option>핵심역량2</option>
            <option>핵심역량3</option>
            <option>핵심역량4입니아아아</option>
          </select>
        </div>

        <div className="flex items-center">
          <span>주관부서</span>
          <select className="ml-3 px-4 py-1 w-60 rounded-md text-lg focus:outline-none">
            <option>전체</option>
            <option>주관부서1</option>
            <option>주관부서2</option>
            <option>주관부서3</option>
            <option>주관부서4입니다아아아</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;